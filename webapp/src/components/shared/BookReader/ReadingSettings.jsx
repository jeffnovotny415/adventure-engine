import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useContent } from '../../../hooks/useContent';
import { TEXT_SCALES } from '../../../state/readingPreferences';

export function ReadingSettings({ textScale, onChange, onClose, nativeReading,
  pageHaptics, onPageHapticsChange }) {
  const { getText } = useContent();
  const dialogRef = useRef(null);
  const sliderRef = useRef(null);
  const titleId = useId();
  const sizeId = useId();
  const index = Math.max(0, TEXT_SCALES.indexOf(textScale));
  const percent = `${Math.round(textScale * 100)}%`;
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    sliderRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return createPortal(
    <dialog ref={dialogRef} className="reading-settings" aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="reading-settings__header">
        <h2 id={titleId}>{getText('reader.text_size')}</h2>
        <button type="button" className="text-button" onClick={onClose}>{getText('reader.settings_done')}</button>
      </header>
      <label id={sizeId} htmlFor={`${sizeId}-slider`}>{getText('reader.size_label')} <output>{percent}</output></label>
      <div className="reading-settings__sizes">
        <button type="button" aria-label={getText('reader.size_smaller')} disabled={index === 0}
          onClick={() => onChange(TEXT_SCALES[index - 1])}>{getText('reader.size_smaller_symbol')}</button>
        <input ref={sliderRef} id={`${sizeId}-slider`} type="range" min="0" max={TEXT_SCALES.length - 1} step="1"
          value={index} aria-labelledby={sizeId} aria-valuetext={percent}
          onChange={(event) => onChange(TEXT_SCALES[Number(event.target.value)])} />
        <button type="button" aria-label={getText('reader.size_larger')} disabled={index === TEXT_SCALES.length - 1}
          onClick={() => onChange(TEXT_SCALES[index + 1])}>{getText('reader.size_larger_symbol')}</button>
      </div>
      <p className="reading-settings__preview" style={{ fontSize: `${textScale}rem` }}>{getText('reader.size_preview')}</p>
      <button type="button" className="text-button" onClick={() => onChange(1)}>{getText('reader.size_reset')}</button>
      {nativeReading?.available && <p>{getText('reader.system_size_help')}</p>}
      {nativeReading?.hapticsAvailable && <label className="reading-settings__haptics">
        <input type="checkbox" checked={pageHaptics} onChange={(event) => onPageHapticsChange?.(event.target.checked)} />
        <span>{getText('reader.page_haptics')}</span>
      </label>}
      <p className="reading-settings__help">{getText(nativeReading?.voiceOver ? 'reader.voiceover_help' : 'reader.gesture_help')}</p>
    </dialog>, document.body
  );
}
