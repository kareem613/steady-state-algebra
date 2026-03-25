/**
 * Ghost Preview Screen
 * Shows the proposed operation applied to both sides before the user confirms.
 */
export default function GhostPreviewScreen({ equation, operation, onAccept, onBack }) {
  const { lhsStr, rhsStr } = equation
  const { opSymbol, value, operationLabel } = operation

  const ghostToken = (
    <span className="ghost-term rounded-lg text-primary flex items-center gap-3 px-4 py-3 inline-flex">
      <span className="font-light text-xl">{opSymbol}</span>
      <span>{value}</span>
    </span>
  )

  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col dark">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(219,230,254,0.06)] flex items-center justify-center px-6 h-16">
        <h1 className="text-xl font-headline font-bold tracking-tight text-sky-400">STEADY STATE</h1>
      </header>

      <main className="flex-grow pt-24 px-6 max-w-5xl mx-auto w-full flex flex-col items-center justify-center pb-64">
        {/* Status Indicator */}
        <div className="mb-8 flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-headline text-sm font-semibold text-primary tracking-widest uppercase">Ghost Preview State</span>
        </div>

        {/* Sandbox Canvas */}
        <section className="w-full bg-surface-container-low rounded-xl p-12 relative overflow-hidden flex flex-col items-center justify-center">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-[12rem]">science</span>
          </div>

          {/* Equation Display with Ghost Terms */}
          <div className="flex flex-wrap items-center justify-center gap-4 font-headline font-bold tracking-tight mb-16 text-3xl md:text-5xl">
            {/* LHS terms */}
            {lhsStr.split(/(?=[+-])/).map((part, i) => (
              <div key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-primary font-light">{part.trim().charAt(0)}</span>}
                <div className="bg-surface-container-high rounded-lg text-on-background px-4 py-3">
                  {i === 0 ? part.trim() : part.trim().slice(1).trim()}
                </div>
              </div>
            ))}

            {/* Ghost term on LHS */}
            {ghostToken}

            {/* Equals sign */}
            <div className="text-on-background/40 font-light mx-2">=</div>

            {/* RHS */}
            <div className="bg-surface-container-high rounded-lg text-on-background px-4 py-3">
              {rhsStr}
            </div>

            {/* Ghost term on RHS */}
            {ghostToken}
          </div>

          {/* Feedback Label */}
          <div className="text-on-surface-variant font-body text-center max-w-md">
            <p className="text-lg">
              Apply <span className="text-primary font-bold">{operationLabel}</span> to both sides of the equation to isolate the variable term.
            </p>
          </div>
        </section>
      </main>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/90 to-transparent pt-12 z-50">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <button
            onClick={onAccept}
            className="w-full h-16 bg-primary text-on-primary-fixed font-headline font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
          >
            <span className="material-symbols-outlined">auto_fix_high</span>
            DO IT
          </button>
          <button
            onClick={onBack}
            className="w-full h-14 bg-surface-container-highest border border-outline-variant/30 text-on-surface font-headline font-semibold rounded-xl hover:bg-surface-bright active:scale-95 transition-all flex items-center justify-center gap-2 text-base uppercase tracking-wider"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            BACK
          </button>
        </div>
      </div>

      {/* Keypad (Disabled) */}
      <div className="fixed bottom-20 left-0 w-full bg-surface-container-highest/50 backdrop-blur-md p-4 pb-8 z-40 border-t border-white/5">
        <div className="max-w-md mx-auto grid grid-cols-4 gap-2 opacity-40 pointer-events-none">
          {['7','8','9','/','4','5','6','×','1','2','3','-','0','x','.', '+'].map((k, i) => (
            <div
              key={i}
              className={`h-12 rounded-lg flex items-center justify-center font-headline ${
                [3,7,11,15].includes(i) ? 'bg-surface-container-high text-primary' : 'bg-surface-container-low text-on-surface'
              }`}
            >
              {k}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ghost-term {
          border: 2px dashed #3bbffa;
          background: rgba(59, 191, 250, 0.05);
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
        }
      `}</style>
    </div>
  )
}
