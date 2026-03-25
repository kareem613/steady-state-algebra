import { LEVELS } from './levels'

/**
 * Level selector screen — shown on first launch and after solving.
 */
export default function LevelSelectScreen({ onSelect, solvedEquation }) {
  return (
    <div className="bg-background text-on-background font-body h-[100dvh] flex flex-col items-center justify-center overflow-hidden dark px-6">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(219,230,254,0.06)]">
        <div className="flex items-center px-6 h-16">
          <h1 className="text-xl font-bold text-sky-400 tracking-widest uppercase font-headline tracking-tight">
            STEADY STATE
          </h1>
        </div>
      </header>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        {/* Solved celebration */}
        {solvedEquation && (
          <div className="text-center mb-2">
            <div className="text-secondary font-headline text-5xl font-bold mb-2">✓</div>
            <p className="text-on-surface-variant text-base">
              <span className="font-mono text-primary">{solvedEquation.lhsStr} = {solvedEquation.rhsStr}</span>
            </p>
            <p className="text-on-background font-headline font-bold text-2xl mt-1">Solved!</p>
          </div>
        )}

        <div className="text-center">
          <p className="text-on-surface-variant font-body text-sm tracking-widest uppercase">
            {solvedEquation ? 'Play again — choose a level' : 'Choose a level'}
          </p>
        </div>

        {/* Level cards */}
        <div className="flex flex-col gap-4 w-full">
          {LEVELS.map((level) => (
            <button
              key={level.number}
              onClick={() => onSelect(level)}
              className="w-full p-5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all active:scale-95 flex items-center justify-between group"
            >
              <div className="text-left">
                <div className="font-headline font-bold text-xl text-on-background group-hover:text-primary transition-colors">
                  {level.label}
                </div>
                <div className="text-on-surface-variant text-sm mt-0.5">{level.description}</div>
              </div>
              <span className="material-symbols-outlined text-primary opacity-60 group-hover:opacity-100 transition-opacity">
                arrow_forward
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
        }
      `}</style>
    </div>
  )
}
