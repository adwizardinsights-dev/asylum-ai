export default function Footer({ onCTA }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">AI</div>
              <span className="font-bold text-white text-sm">Asylum Case AI Analyzer</span>
            </div>
            <p className="text-sm leading-relaxed">An organizational tool to help asylum seekers understand and prepare their cases. Not a law firm. Not legal advice.</p>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-4">Quick Links</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </div>
          <div>
            <p className="font-semibold text-white text-sm mb-4">Legal</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="mailto:alejodebusiness2020@gmail.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="bg-slate-800 rounded-xl p-4 mb-6 text-xs leading-relaxed">
            <strong className="text-slate-300">⚠️ Legal Disclaimer:</strong> Asylum Case AI Analyzer is an informational and organizational tool only. It does not constitute legal advice, does not create an attorney-client relationship, and does not guarantee any immigration outcome. Always consult a licensed immigration attorney for legal guidance specific to your situation. Individual results vary.
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} Asylum Case AI Analyzer. All rights reserved.</p>
            <button onClick={onCTA} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
              Start My Case Review
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
