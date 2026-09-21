import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useContent } from '../../../hooks/useContent';
import { TEXT_SCALES, READING_OPTIONS, READING_PRESETS, matchingReadingPreset } from '../../../state/readingPreferences';

const SECTIONS = ['text', 'page', 'controls'];

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
  const bodyRef = useRef(null);
  const tabsRef = useRef([]);
  const [section, setSection] = useState('text');
  const sectionId = useId();
  const titleId = useId();
  const sizeId = useId();
  const index = Math.max(0, TEXT_SCALES.indexOf(textScale));
  const percent = `${Math.round(textScale * 100)}%`;
  const preset = matchingReadingPreset(textScale, readingStyle);
  function selectSection(name) {
    setSection(name);
    bodyRef.current.scrollTop = 0;
  }
  function navigateTabs(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % SECTIONS.length;
    else if (event.key === 'ArrowLeft') next = (index + SECTIONS.length - 1) % SECTIONS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = SECTIONS.length - 1;
    else return;
    event.preventDefault();
    selectSection(SECTIONS[next]);
    tabsRef.current[next].focus({ preventScroll: true });
  }
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
    <dialog ref={dialogRef} className="reading-settings reading-settings--reader" aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="reading-settings__header">
        <h2 id={titleId}>{getText('reader.text_size')}</h2>
        <button type="button" className="text-button" onClick={onClose}>{getText('reader.settings_done')}</button>
      </header>
      <div className="reading-settings__tabs" role="tablist" aria-label={getText('reader.settings_sections')}>
        {SECTIONS.map((name, index) => <button type="button" role="tab" key={name}
          ref={element => { tabsRef.current[index] = element; }} data-section={name}
          id={`${sectionId}-${name}-tab`} aria-controls={`${sectionId}-${name}-panel`}
          aria-selected={section === name} tabIndex={section === name ? 0 : -1}
          onKeyDown={event => navigateTabs(event, index)} onClick={() => selectSection(name)}>
          {getText(`reader.settings_${name}`)}
        </button>)}
      </div>
      <div className="reading-settings__body" ref={bodyRef}>
      <div role="tabpanel" id={`${sectionId}-text-panel`} aria-labelledby={`${sectionId}-text-tab`} hidden={section !== 'text'}>
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
      <fieldset className="reading-settings__group reading-settings__presets">
        <legend>{getText('reader.presets_label')}</legend>
        <div className="reading-settings__preset-options">
          {Object.keys(READING_PRESETS).map(name => <button type="button" key={name} data-preset={name}
            aria-pressed={preset === name} onClick={() => onReadingStyleChange(READING_PRESETS[name])}>
            <span className="reading-settings__preset-name">{getText(`reader.preset_${name}`)}<span aria-hidden="true">{preset === name ? ' ✓' : ''}</span></span>
            <span className="reading-settings__preset-description">{getText(`reader.preset_${name}_description`)}</span>
          </button>)}
        </div>
        <p className="small reading-settings__preset-status" role="status">{getText('reader.preset_current').replace('{preset}', getText(`reader.preset_${preset}`))}</p>
      </fieldset>
      <Options name="readingFont" value={readingStyle.readingFont} onChange={onReadingStyleChange} getText={getText} />
      <label className="reading-settings__toggle">
        <span>{getText('reader.bold_text')}</span>
        <input type="checkbox" role="switch" checked={readingStyle.boldText}
          onChange={event => onReadingStyleChange({ boldText: event.target.checked })} />
      </label>
      <Options name="lineSpacing" value={readingStyle.lineSpacing} onChange={onReadingStyleChange} getText={getText} />
      <p className="reading-settings__preview" style={{ fontSize: `${textScale}rem` }}>{getText('reader.size_preview')}</p>
      {nativeReading?.available && <p>{getText('reader.system_size_help')}</p>}
      </div>
      <div role="tabpanel" id={`${sectionId}-page-panel`} aria-labelledby={`${sectionId}-page-tab`} hidden={section !== 'page'}>
      <Options name="pageAppearance" value={readingStyle.pageAppearance} onChange={onReadingStyleChange} getText={getText} />
      <p className="reading-settings__preview" style={{ fontSize: `${textScale}rem` }}>{getText('reader.size_preview')}</p>
      </div>
      <div role="tabpanel" id={`${sectionId}-controls-panel`} aria-labelledby={`${sectionId}-controls-tab`} hidden={section !== 'controls'}>
      <Options name="pageMovement" value={readingStyle.pageMovement} onChange={onReadingStyleChange} getText={getText} />
      <p className="small">{getText('reader.pageMovement_help')}</p>
      <label className="reading-settings__toggle">
        <span>{getText('reader.always_show_controls')}</span>
        <input type="checkbox" role="switch" checked={readingStyle.alwaysShowControls}
          onChange={event => onReadingStyleChange({ alwaysShowControls: event.target.checked })} />
      </label>
      {nativeReading?.hapticsAvailable && <label className="reading-settings__haptics">
        <input type="checkbox" checked={pageHaptics} onChange={(event) => onPageHapticsChange?.(event.target.checked)} />
        <span>{getText('reader.page_haptics')}</span>
      </label>}
      <p className="reading-settings__help">{getText(nativeReading?.voiceOver ? 'reader.voiceover_help' : 'reader.gesture_help')}</p>
      </div>
      </div>
    </dialog>, portalTarget ?? document.body
  );
}
