import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useContent } from '../../../hooks/useContent';
import { TEXT_SCALES, READING_OPTIONS } from '../../../state/readingPreferences';

function Options({ name, value, onChange, getText }) {
  const groupId = useId();
  return <fieldset className={`reading-settings__group reading-settings__group--${name}`}>
    <legend>{getText(`reader.${name}_label`)}</legend>
    <div className="reading-settings__options">
      {READING_OPTIONS[name].map(option => <label key={option} className="reading-settings__option">
        <input type="radio" name={groupId} value={option} aria-label={getText(`reader.${name}_${option}`)} checked={value === option}
          onChange={() => onChange({ [name]: option })} />
        <span data-option={option}>{getText(`reader.${name}_${option}`)}</span>
      </label>)}
    </div>
  </fieldset>;
}

export function ReadingSettings({ textScale, onChange, onClose, nativeReading,
  pageHaptics, onPageHapticsChange, readingStyle, onReadingStyleChange, portalTarget }) {
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
      <div className="reading-settings__body">
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
      <button type="button" className="text-button" onClick={() => onChange(1)}>{getText('reader.size_reset')}</button>
      <Options name="readingFont" value={readingStyle.readingFont} onChange={onReadingStyleChange} getText={getText} />
      <label className="reading-settings__toggle">
        <span>{getText('reader.bold_text')}</span>
        <input type="checkbox" role="switch" checked={readingStyle.boldText}
          onChange={event => onReadingStyleChange({ boldText: event.target.checked })} />
      </label>
      <Options name="lineSpacing" value={readingStyle.lineSpacing} onChange={onReadingStyleChange} getText={getText} />
      <Options name="pageAppearance" value={readingStyle.pageAppearance} onChange={onReadingStyleChange} getText={getText} />
      <p className="reading-settings__preview" style={{ fontSize: `${textScale}rem` }}>{getText('reader.size_preview')}</p>
      <label className="reading-settings__toggle">
        <span>{getText('reader.always_show_controls')}</span>
        <input type="checkbox" role="switch" checked={readingStyle.alwaysShowControls}
          onChange={event => onReadingStyleChange({ alwaysShowControls: event.target.checked })} />
      </label>
      {nativeReading?.available && <p>{getText('reader.system_size_help')}</p>}
      {nativeReading?.hapticsAvailable && <label className="reading-settings__haptics">
        <input type="checkbox" checked={pageHaptics} onChange={(event) => onPageHapticsChange?.(event.target.checked)} />
        <span>{getText('reader.page_haptics')}</span>
      </label>}
      <p className="reading-settings__help">{getText(nativeReading?.voiceOver ? 'reader.voiceover_help' : 'reader.gesture_help')}</p>
      </div>
    </dialog>, portalTarget ?? document.body
  );
}
