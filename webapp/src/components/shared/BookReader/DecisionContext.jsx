import { useLayoutEffect, useRef } from 'react';
import { StoryTextPanel } from '../StoryTextPanel/StoryTextPanel';

// A visual reference to the final printed page beside the iPad's choices.
// The accessible passage remains available through Back to the passage.
export function DecisionContext(props) {
  const viewportRef = useRef(null);
  const columnsRef = useRef(null);
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const columns = columnsRef.current;
    let active = true;
    function measure() {
      if (!active || !viewport.clientWidth) return;
      const width = viewport.clientWidth;
      const gap = parseFloat(getComputedStyle(columns).columnGap) || 0;
      columns.style.columnWidth = `${width}px`;
      const step = width + gap;
      const count = Math.max(1, Math.ceil((columns.scrollWidth + gap - 1) / step));
      columns.style.transform = `translateX(${-(count - 1) * step}px)`;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    document.fonts.ready.then(measure);
    const images = [...columns.querySelectorAll('img')];
    images.forEach(image => image.addEventListener('load', measure));
    measure();
    return () => {
      active = false;
      observer.disconnect();
      images.forEach(image => image.removeEventListener('load', measure));
    };
  }, [props.textScale, props.systemScale, props.title, props.intro, props.body, props.image]);
  return <aside className="decision-context" aria-hidden="true" inert>
    <div className="decision-context__viewport" ref={viewportRef}>
      <div className="reader-columns decision-context__columns" ref={columnsRef}>
        <StoryTextPanel {...props} />
      </div>
    </div>
  </aside>;
}
