const plans = [
  {
    name: 'Free',
    price: '$0',
    label: 'Quick Case Outline',
    features: ['Guided questionnaire', 'Basic timeline summary', 'Gap checklist preview', 'No upload required'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$XX/mo',
    label: 'Full Packet',
    features: ['Everything in Free', 'Document uploads', 'Consistency scan', 'PDF export', 'Interview prep', 'Attorney-ready notes'],
    cta: 'Start Pro Review',
    highlight: true,
  },
  {
    name: 'Firms',
    price: 'Contact Us',
    label: 'For Attorneys & Teams',
    features: ['Multi-client dashboard', 'Bulk case management', 'Custom branding', 'Priority support', 'API access'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function Pricing({ onCTA }) {
  return (
    <section id="pricing" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Simple, Transparent Plans</h2>
          <p className="text-slate-400 text-sm mt-2">Prices are placeholders — easy to edit.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.name} className={`rounded-2xl p-8 border-2 flex flex-col ${p.highlight ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-100' : 'border-slate-100 bg-slate-50'}`}>
              <div className="mb-6">
                {p.highlight && <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full inline-block mb-3">Most Popular</div>}
                <p className={`text-sm font-semibold mb-1 ${p.highlight ? 'text-blue-200' : 'text-blue-600'}`}>{p.name}</p>
                <div className={`text-3xl font-extrabold mb-1 ${p.highlight ? 'text-white' : 'text-slate-900'}`}>{p.price}</div>
                <p className={`text-sm ${p.highlight ? 'text-blue-200' : 'text-slate-500'}`}>{p.label}</p>
              </div>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {p.features.map(f => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${p.highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                    <span className={p.highlight ? 'text-yellow-300' : 'text-blue-500'}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onCTA}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${p.highlight ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
