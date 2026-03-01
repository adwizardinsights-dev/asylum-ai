const features = [
  { icon: '🗓️', title: 'Timeline Builder', desc: 'Auto-creates a chronological view of your events so nothing gets lost or out of order.' },
  { icon: '✅', title: 'Evidence Checklist', desc: 'Suggests commonly required documents and flags what you may still need to gather.' },
  { icon: '🔍', title: 'Consistency Scan', desc: 'Flags potential date, location, or detail conflicts before your attorney or officer sees them.' },
  { icon: '📦', title: 'Draft Packet', desc: 'Generates a clean, organized summary you can export and share with your legal team.' },
  { icon: '🎤', title: 'Interview Prep', desc: 'Practice questions based on your case type to help you feel ready and confident.' },
  { icon: '📝', title: 'Attorney-Ready Notes', desc: 'Structured talking points formatted for your consultation — save time and cost.' },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">What's Included</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Everything You Need to Prepare</h2>
          <p className="text-slate-500 mt-3 text-lg max-w-xl mx-auto">Organizational tools designed to help you and your attorney work smarter.</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
