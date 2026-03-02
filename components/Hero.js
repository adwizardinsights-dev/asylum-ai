export default function Hero({ onCTA }) {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          Informational Tool Only — Not Legal Advice
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Organize Your Asylum Story<br className="hidden sm:block" />
          <span className="text-blue-600"> and Evidence in Minutes.</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Answer a guided questionnaire. Upload your documents. Our AI helps summarize your timeline, flag missing details, and generate a clear case packet you can review with your attorney.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="/start" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5">
            Start My Case Review →
          </a>
          <a href="#how-it-works" className="border-2 border-slate-300 hover:border-blue-400 text-slate-700 font-semibold px-8 py-4 rounded-xl text-lg transition-all">
            See How It Works
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
          {['🔒 Not legal advice', '🛡️ Private by design', '✅ Built for clarity & organization'].map(t => (
            <span key={t} className="flex items-center gap-1.5 font-medium">{t}</span>
          ))}
        </div>

        <div className="mt-14 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">What you'll receive</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-700 text-left">
            {[
              '📄 Case timeline summary (PDF-ready)',
              '🔍 Potential gaps checklist',
              '💬 Questions to ask your attorney',
              '🎤 Interview prep prompts',
            ].map(item => (
              <div key={item} className="flex items-start gap-2 bg-slate-50 rounded-lg p-3">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
