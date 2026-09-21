import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { createPageTurn, pageTapAction, shouldCompleteSwipe, swipeProgress } from './pageTurn';

function release(gesture) {
  if (gesture?.element.hasPointerCapture(gesture.id)) gesture.element.releasePointerCapture(gesture.id);
}

export function usePageTurn({ viewportRef, columnsRef, page, layout, onPageChange, onToggleControls, onForwardBoundary }) {
  const turnRef = useRef(null);
  const gestureRef = useRef(null);
  const suppressClickRef = useRef(0);
  const settlingRef = useRef(null);
  const currentRef = useRef(null);
  currentRef.current = { page, layout, onPageChange, onForwardBoundary };

  const cancelTurn = useCallback(() => {
    const gesture = gestureRef.current;
    gestureRef.current = null;
    release(gesture);
    settlingRef.current = null;
    turnRef.current?.cancel();
    turnRef.current = null;
    viewportRef.current?.removeAttribute('data-dragging');
    gesture?.element.removeAttribute('data-dragging');
  }, [viewportRef]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function cancelForOtherPointer(event) {
      const gesture = gestureRef.current;
      if (gesture && event.pointerId !== gesture.id) cancelTurn();
    }
    preference.addEventListener('change', cancelTurn);
    window.addEventListener('blur', cancelTurn);
    // A pinch may start with one finger on the page and the other on the
    // toolbar/margin. Observe capture phase without preventing native zoom.
    document.addEventListener('pointerdown', cancelForOtherPointer, true);
    return () => {
      cancelTurn();
      preference.removeEventListener('change', cancelTurn);
      window.removeEventListener('blur', cancelTurn);
      document.removeEventListener('pointerdown', cancelForOtherPointer, true);
    };
  }, [cancelTurn]);

  function finish(target, complete) {
    const turn = turnRef.current;
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true;
      settlingRef.current = null;
      if (complete) {
        const current = currentRef.current;
        flushSync(() => target === current.layout.count
          ? current.onForwardBoundary?.() : current.onPageChange(target));
      }
      turnRef.current = null;
    };
    if (turn) {
      // A fresh touch can finish the settling leaf immediately, then act on
      // the newly committed page instead of being silently discarded.
      settlingRef.current = () => { done(); turn.cancel(); };
      turn.settle(complete, done);
    } else done();
  }
  function turnPage(target) {
    const delta = target - currentRef.current.page;
    settlingRef.current?.();
    const current = currentRef.current;
    target = current.page + delta;
    if (turnRef.current || gestureRef.current || target < 0 || target > current.layout.count) return;
    if (target === current.layout.count) { current.onForwardBoundary?.(); return; }
    turnRef.current = createPageTurn(viewportRef.current, columnsRef.current,
      { from: current.page, to: target, step: current.layout.step });
    finish(target, true);
  }
  function onPointerDown(event) {
    if (!event.isPrimary) { cancelTurn(); return; }
    if ( (window.visualViewport?.scale ?? 1) > 1.05 || event.button !== 0 || event.target.closest('button, a, input, dialog')) return;
    settlingRef.current?.();
    if (turnRef.current) return;
    const element = viewportRef.current ?? event.currentTarget;
    const bounds = element.getBoundingClientRect();
    gestureRef.current = {
      id: event.pointerId, element, bounds, tapBounds: event.currentTarget.getBoundingClientRect(),
      startX: event.clientX, startY: event.clientY, lastX: event.clientX,
      startTime: event.timeStamp, lastTime: event.timeStamp, velocity: 0, started: false,
    };
  }
  function onPointerMove(event) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.startX;
    const dy = event.clientY - gesture.startY;
    if (!gesture.started) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 10) return;
      // Let native vertical scrolling and pinch zoom win over a page turn.
      if (Math.abs(dy) > Math.abs(dx) * 1.3) { cancelTurn(); return; }
      // Early diagonal jitter does not yet tell us scroll versus page turn.
      if (Math.abs(dx) < Math.abs(dy) * 1.3) return;
      const forward = dx < 0;
      const current = currentRef.current;
      const target = current.page + (forward ? 1 : -1);
      const spread = columnsRef.current && getComputedStyle(columnsRef.current).columnCount === '2';
      const x = gesture.startX - gesture.bounds.left;
      const width = gesture.bounds.width;
      if (target < 0 || (target >= current.layout.count && !current.onForwardBoundary) || (spread && (forward ? x < width / 2 : x > width / 2))) {
        cancelTurn(); return;
      }
      gesture.started = true;
      gesture.target = target;
      gesture.direction = forward ? -1 : 1;
      gesture.leafWidth = spread ? width / 2 : width;
      const hinge = spread ? width / 2 : forward ? 0 : width;
      gesture.grabDistance = Math.max(gesture.leafWidth * .25, Math.abs(x - hinge));
      gesture.element.setPointerCapture(gesture.id);
      gesture.element.setAttribute('data-dragging', 'true');
      suppressClickRef.current = performance.now() + 600;
      turnRef.current = target === current.layout.count ? null : createPageTurn(viewportRef.current, columnsRef.current,
        { from: current.page, to: target, step: current.layout.step, grabY: (event.clientY - gesture.bounds.top) / gesture.bounds.height });
    }
    const elapsed = event.timeStamp - gesture.lastTime;
    if (elapsed > 0) gesture.velocity = (event.clientX - gesture.lastX) * gesture.direction / elapsed;
    gesture.lastX = event.clientX;
    gesture.lastTime = event.timeStamp;
    gesture.distance = Math.max(0, dx * gesture.direction);
    turnRef.current?.update(swipeProgress(gesture.distance, gesture.grabDistance),
      (event.clientY - gesture.bounds.top) / gesture.bounds.height);
  }
  function onPointerUp(event) {
    const gesture = gestureRef.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    gestureRef.current = null;
    release(gesture);
    gesture.element.removeAttribute('data-dragging');
    if (!gesture.started) {
      // Long presses, selection, scrolling and pinches are reading actions,
      // not taps. Native image/button taps never enter this gesture path.
      if (event.timeStamp - gesture.startTime > 300 ||
          Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY) >= 10 ||
          window.getSelection()?.isCollapsed === false) return;
      const action = pageTapAction(event.clientX - gesture.tapBounds.left, gesture.tapBounds.width);
      if (action === 'previous') turnPage(currentRef.current.page - 1);
      if (action === 'next') turnPage(currentRef.current.page + 1);
      if (action === 'controls') onToggleControls?.();
      suppressClickRef.current = action ? performance.now() + 600 : 0;
      return;
    }
    const distance = Math.max(0, (event.clientX - gesture.startX) * gesture.direction);
    const velocity = event.timeStamp - gesture.lastTime < 100 ? gesture.velocity : 0;
    turnRef.current?.update(swipeProgress(distance, gesture.grabDistance),
      (event.clientY - gesture.bounds.top) / gesture.bounds.height);
    suppressClickRef.current = performance.now() + 600;
    finish(gesture.target, shouldCompleteSwipe(distance, gesture.leafWidth, velocity));
  }
  return {
    cancelTurn, turnPage,
    clickGuard: {
      onPointerDownCapture: () => { suppressClickRef.current = 0; },
      onClickCapture: (event) => {
        // Keep this on the stable reader root: a touch that reveals choices
        // must not click through into a newly mounted option. A new pointer
        // down clears the guard, and keyboard/assistive clicks remain usable.
        if (event.detail && performance.now() < suppressClickRef.current) {
          event.preventDefault(); event.stopPropagation(); suppressClickRef.current = 0;
        }
      },
    },
    gestureHandlers: {
      onPointerDown, onPointerMove, onPointerUp,
      onPointerCancel: cancelTurn,
      onPointerLeave: () => { if (gestureRef.current && !gestureRef.current.started) cancelTurn(); },
      onLostPointerCapture: (event) => {
        const gesture = gestureRef.current;
        // Touch starts with implicit capture on the paragraph/heading. Taking
        // capture on the viewport makes that child's loss bubble here; it is
        // a handoff, not a cancelled swipe. Only our own capture loss ends it.
        if (gesture && event.pointerId === gesture.id && event.target === gesture.element) cancelTurn();
      },
    },
  };
}
