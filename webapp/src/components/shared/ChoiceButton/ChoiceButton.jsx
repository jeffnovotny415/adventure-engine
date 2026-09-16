export function ChoiceButton({ label, number, onClick }) {
  return (
    <button type="button" onClick={onClick} className="choice-button">
      <span className="choice-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
      <span>{label}</span>
      <span className="choice-arrow" aria-hidden="true">→</span>
    </button>
  );
}
