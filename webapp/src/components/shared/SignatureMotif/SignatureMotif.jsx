import fireballUrl from '../../../assets/motifs/fireball.svg';
import energyOrbUrl from '../../../assets/motifs/energy-orb.svg';

// One shared slot, three signatures — internally switches which
// visual renders per theme instead of scattering unrelated
// components across the codebase. `shell` renders nothing; the
// BookSpine row on HomeScreen fills that role instead.
export function SignatureMotif({ themeKey, children }) {
  if (themeKey === 'space-walker') {
    return (
      <div className="viewscreen-frame flex min-h-0 flex-1 flex-col">
        <span className="viewscreen-frame__corner viewscreen-frame__corner--tl" />
        <span className="viewscreen-frame__corner viewscreen-frame__corner--tr" />
        <span className="viewscreen-frame__corner viewscreen-frame__corner--bl" />
        <span className="viewscreen-frame__corner viewscreen-frame__corner--br" />
        <span className="viewscreen-frame__glint" />
        <span className="viewscreen-frame__star" style={{ top: '4px', left: '38%' }} />
        <span className="viewscreen-frame__star" style={{ top: '10px', right: '18%' }} />
        <span className="viewscreen-frame__star" style={{ bottom: '6px', left: '20%' }} />
        <span className="viewscreen-frame__star" style={{ bottom: '12px', right: '30%' }} />
        <span className="viewscreen-frame__star" style={{ top: '45%', left: '4px' }} />
        <span className="viewscreen-frame__star" style={{ top: '55%', right: '4px' }} />
        {children}
      </div>
    );
  }

  if (themeKey === 'summoned-mage') {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col">
        {children}
        <img src={fireballUrl} alt="" aria-hidden="true" className="signature-float" />
      </div>
    );
  }

  if (themeKey === 'tech-hero') {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col">
        {children}
        <img src={energyOrbUrl} alt="" aria-hidden="true" className="signature-float" />
      </div>
    );
  }

  return children;
}
