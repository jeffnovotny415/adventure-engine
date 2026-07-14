export function ChoiceButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-slate-900/10 bg-white/90 px-4 py-3
                 text-left text-slate-900 shadow-sm transition
                 hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10
                 active:scale-[0.99]"
    >
      {label}
    </button>
  );
}
