const testimonials = [
  { quote: 'Having everything organized in one place made my attorney consultation so much more productive. I came prepared.', name: 'A.M.', origin: 'Venezuela', label: 'Example testimonial (for mockup)' },
  { quote: 'The timeline builder helped me see my own story clearly for the first time. I didn\'t realize how many gaps I still needed to fill.', name: 'F.K.', origin: 'Ethiopia', label: 'Example testimonial (for mockup)' },
  { quote: 'I felt less overwhelmed. The checklist told me exactly what documents I was missing before my interview.', name: 'L.R.', origin: 'Honduras', label: 'Example testimonial (for mockup)' },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-blue-600">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">People Who Used It Say</h2>
          <p className="text-blue-200 mt-2 text-sm">Illustrative examples — individual results vary. This tool does not guarantee any legal outcome.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
              <div className="text-yellow-300 text-lg mb-3">★★★★★</div>
              <p className="text-white leading-relaxed mb-5 text-sm">"{t.quote}"</p>
              <div className="border-t border-white/20 pt-4">
                <p className="font-bold text-white text-sm">{t.name} — {t.origin}</p>
                <p className="text-blue-300 text-xs mt-1 italic">{t.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
