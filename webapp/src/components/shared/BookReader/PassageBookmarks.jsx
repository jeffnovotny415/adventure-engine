import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useContent } from '../../../hooks/useContent';
import { loadPassages, savePassage, removePassage, samePassage, passageExcerpt, PASSAGES_KEY } from '../../../state/passageBookmarks';
import { StoryTextPanel } from '../StoryTextPanel/StoryTextPanel';
import { readingAnchorTop } from './readingPosition';

export function PassageBookmarks({ currentPassage, onClose, portalTarget, storage }) {
  const { getText } = useContent();
  const [collection, setCollection] = useState(() => loadPassages(storage));
  const [selected, setSelected] = useState(null);
  const [removed, setRemoved] = useState(null);
  const [notice, setNotice] = useState('');
  const pendingRef = useRef(null);
  const dialogRef = useRef(null);
  const bodyRef = useRef(null);
  const headingRef = useRef(null);
  const passageRef = useRef(null);
  const titleId = useId();
  const failed = collection.status !== 'valid';
  const alreadySaved = currentPassage && collection.items.some(item => samePassage(item, currentPassage));

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    headingRef.current?.focus();
    function refresh(event) {
      if (event.key === PASSAGES_KEY || event.key === null) setCollection(loadPassages(storage));
    }
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      dialog.close();
      document.body.style.overflow = overflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [storage]);

  useLayoutEffect(() => {
    bodyRef.current.scrollTop = 0;
    if (!selected) { headingRef.current?.focus({ preventScroll: true }); return; }
    let active = true;
    function restore() {
      if (!active) return;
      const top = readingAnchorTop(selected.position, passageRef.current);
      if (top !== null) bodyRef.current.scrollTop += top - bodyRef.current.getBoundingClientRect().top - 12;
    }
    restore();
    document.fonts.ready.then(restore);
    const paragraph = passageRef.current.querySelectorAll('.story-paragraph')[selected.position.paragraph];
    if (paragraph) { paragraph.tabIndex = -1; paragraph.focus({ preventScroll: true }); }
    return () => { active = false; };
  }, [selected]);

  function perform(operation, success) {
    const result = operation();
    setCollection(result);
    if (result.status === 'valid') { pendingRef.current = null; success?.(); }
    else { pendingRef.current = () => perform(operation, success); setNotice(''); }
  }
  return createPortal(<dialog ref={dialogRef} className="reading-settings passage-bookmarks" aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose(); }}>
    <header className="reading-settings__header">
      <h2 className={selected ? 'passage-bookmarks__hidden-heading' : undefined} ref={headingRef} id={titleId} tabIndex={-1}>{getText(selected ? 'passages.saved_passage' : 'passages.title')}</h2>
      {selected && <button type="button" className="text-button passage-bookmarks__back" aria-label={getText('passages.back')} onClick={() => setSelected(null)}><span aria-hidden="true">← </span>{getText('passages.title')}</button>}
      <button type="button" className="text-button passage-bookmarks__done" onClick={onClose}>{getText('reader.settings_done')}</button>
    </header>
    <div ref={bodyRef} className="reading-settings__body">
      {selected ? <>
        <p className="small muted">{getText('passages.read_only')}</p>
        <section ref={passageRef} className="saved-passage"><StoryTextPanel {...selected} /></section>
      </> : <>
        <p className="muted">{getText('passages.help')}</p>
        {currentPassage && <button type="button" className="path-button" disabled={failed || alreadySaved}
          onClick={() => perform(() => savePassage(currentPassage, storage), () => setNotice('passages.added'))}>
          {getText(alreadySaved ? 'passages.saved' : 'passages.add')}
        </button>}
        {failed && <div role="alert" className="passage-bookmarks__error">
          <p>{getText(`passages.errors.${collection.status}`)}</p>
          <button type="button" className="text-button" onClick={() => pendingRef.current ? pendingRef.current() : setCollection(loadPassages(storage))}>{getText('persistence.retry')}</button>
        </div>}
        <p role="status">{notice ? getText(notice) : ''}</p>
        {removed && <button type="button" className="text-button" disabled={failed}
          onClick={() => perform(() => savePassage(removed, storage), () => { setRemoved(null); setNotice('passages.restored'); })}>{getText('passages.undo')}</button>}
        {!failed && collection.items.length === 0 && <p>{getText('passages.empty')}</p>}
        <ul className="passage-bookmarks__list">
          {collection.items.map(item => <li key={item.id}>
            <button type="button" className="passage-bookmarks__open" onClick={() => setSelected(item)}>
              <span className="small muted">{item.storyTitle}</span>
              <span className="passage-bookmarks__title">{item.title}</span>
              <span className="passage-bookmarks__excerpt">{passageExcerpt(item)}</span>
            </button>
            <button type="button" className="text-button" disabled={failed} aria-label={`${getText('passages.remove')}: ${item.title}`}
              onClick={() => perform(() => removePassage(item.id, storage), () => { setRemoved(item); setNotice('passages.removed'); })}>{getText('passages.remove')}</button>
          </li>)}
        </ul>
      </>}
    </div>
  </dialog>, portalTarget ?? document.body);
}
