export function ChoiceButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="choice-button w-full rounded-lg px-4 py-3 text-left shadow-sm
                 transition active:scale-[0.99]"
    >
      {label}
    </button>
  );
}
