import { useEffect, useId, useRef } from 'react';
import { doorArtwork } from './doorArtwork';
import { useContent } from '../../../hooks/useContent';

export function ResumeBookmark({ story, bookmark, onClose, onResume, onStartAgain, onBegin }) {
  const { getText } = useContent();
  const dialogRef = useRef(null);
  const titleId = useId();
  const chapterId = useId();
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
  return <dialog ref={dialogRef} className="reading-settings resume-bookmark doorway-entry" aria-labelledby={titleId} aria-describedby={chapterId}
    onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className="reading-settings__header">
      <h2 id={titleId}>{story.title}</h2>
      <button type="button" className="text-button resume-bookmark__close" aria-label={getText('home.bookmark_close')} onClick={onClose}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
    </header>
    <div className="doorway-entry__content">
      <img className="doorway-entry__art" src={doorArtwork(story.id)} width="1024" height="1536" alt="" />
      <div className="resume-bookmark__body">
      {bookmark ? <>
        <p className="muted">{getText('home.bookmark_location')}</p>
        <p id={chapterId} className="resume-bookmark__chapter">{bookmark.sceneTitle}</p>
        <div className="resume-bookmark__actions">
          <button type="button" className="primary-button" onClick={onResume}>{getText('home.bookmark_continue')}</button>
          <button type="button" className="text-button" onClick={onStartAgain}>{getText('home.bookmark_restart')}</button>
        </div>
      </> : <>
        <p id={chapterId}>{story.description}</p>
        <div className="resume-bookmark__actions">
          <button type="button" className="primary-button" onClick={onBegin}>{getText('home.door_begin')}</button>
        </div>
      </>}
      </div>
    </div>
  </dialog>;
}
