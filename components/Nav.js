'use client'
import { useState } from 'react'

export default function Nav({ onCTA }) {
  const [open, setOpen] = useState(false)
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">AI</div>
          <span className="font-bold text-slate-900 text-sm sm:text-base">Asylum Case AI Analyzer</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onCTA} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Start My Case Review
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <div className="w-5 h-0.5 bg-slate-600 mb-1" />
            <div className="w-5 h-0.5 bg-slate-600 mb-1" />
            <div className="w-5 h-0.5 bg-slate-600" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-100 px-4 py-3 flex flex-col gap-3 text-sm font-medium text-slate-600">
          <a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
        </div>
      )}
    </nav>
  )
}
