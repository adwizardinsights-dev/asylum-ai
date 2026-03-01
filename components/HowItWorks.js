const steps = [
  { n: '01', icon: '✍️', title: 'Add your story', desc: 'Answer a guided questionnaire about your timeline and key events. No legal jargon — just plain questions.' },
  { n: '02', icon: '📁', title: 'Upload evidence (optional)', desc: 'Documents, photos, police reports, affidavits — anything you choose to share. You stay in control.' },
  { n: '03', icon: '📋', title: 'Get an organized summary', desc: 'A timeline, key themes, missing gaps checklist, and questions to bring to your lawyer — ready in minutes.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Simple Process</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">How It Works</h2>
          <p className="text-slate-500 mt-3 text-lg">Three steps to go from confusion to clarity.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.n} className="relative bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="text-5xl mb-4">{s.icon}</div>
              <div className="absolute top-6 right-6 text-slate-200 font-black text-4xl">{s.n}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
