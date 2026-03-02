export default function ProgressBar({ steps, current }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const idx = i + 1
        const done = idx < current
        const active = idx === current
        return (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold shrink-0
                  ${done ? 'bg-green-600 text-white' : active ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {done ? '✓' : idx}
              </div>
              <span className={`text-sm truncate ${active ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${done ? 'bg-green-600' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
