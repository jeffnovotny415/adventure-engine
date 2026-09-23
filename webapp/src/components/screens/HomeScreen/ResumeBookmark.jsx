import { useEffect, useId, useRef, useState } from 'react';
import { useContent } from '../../../hooks/useContent';

export function ResumeBookmark({ bookmark, onClose, onResume, onStartAgain }) {
  const { getText } = useContent();
  const [restarting, setRestarting] = useState(false);
  const dialogRef = useRef(null);
  const titleId = useId();
  const chapterId = useId();
  const cancelRestartRef = useRef(null);
  const restartRef = useRef(null);
  const previousRestarting = useRef(false);
  useEffect(() => {
    if (restarting) cancelRestartRef.current?.focus();
    else if (previousRestarting.current) restartRef.current?.focus();
    previousRestarting.current = restarting;
  }, [restarting]);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialogRef} className="reading-settings resume-bookmark" aria-labelledby={titleId} aria-describedby={chapterId}
    onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className="reading-settings__header">
      <h2 id={titleId}>{bookmark.storyTitle}</h2>
      <button type="button" className="text-button" onClick={onClose}>{getText('home.bookmark_close')}</button>
    </header>
    <div className="resume-bookmark__body">
      {restarting ? <>
        <p className="resume-bookmark__chapter">{getText('home.bookmark_restart_heading')}</p>
        <p id={chapterId}>{getText('home.bookmark_restart_help')}</p>
        <div className="resume-bookmark__actions">
          <button ref={cancelRestartRef} type="button" className="primary-button" onClick={() => setRestarting(false)}>{getText('home.bookmark_restart_cancel')}</button>
          <button type="button" className="text-button" onClick={onStartAgain}>{getText('home.bookmark_restart')}</button>
        </div>
      </> : <>
        <p className="muted">{getText('home.bookmark_location')}</p>
        <p id={chapterId} className="resume-bookmark__chapter">{bookmark.sceneTitle}</p>
        <div className="resume-bookmark__actions">
          <button type="button" className="primary-button" onClick={onResume}>{getText('home.bookmark_continue')}</button>
          <button ref={restartRef} type="button" className="text-button" onClick={() => setRestarting(true)}>{getText('home.bookmark_restart')}</button>
        </div>
      </>}
    </div>
  </dialog>;
}
