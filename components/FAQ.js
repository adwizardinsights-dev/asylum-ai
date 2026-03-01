'use client'
import { useState } from 'react'

const faqs = [
  { q: 'Is this legal advice?', a: 'No. This tool is for informational and organizational purposes only. It does not constitute legal advice and does not create an attorney-client relationship. Always consult a qualified immigration attorney for legal guidance.' },
  { q: 'Will it guarantee my asylum approval?', a: 'Absolutely not. No tool, software, or service can guarantee immigration outcomes. This tool helps you organize your information — the result of your case depends on many legal factors.' },
  { q: 'Is my data private?', a: 'We take privacy seriously. Your data is encrypted in transit, stored securely, and never sold or shared with third parties. You can delete your information at any time. Only upload documents you are comfortable sharing.' },
  { q: 'Can I use this alongside my attorney?', a: 'Yes — that is exactly what it is designed for. The organized summary, timeline, and attorney-ready notes are meant to make your consultations more productive and reduce billable time.' },
  { q: 'What documents should I upload?', a: 'Only upload documents you are comfortable sharing. Common items include affidavits, country condition reports, and identity documents. Never feel pressured to upload anything — all uploads are optional.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="py-20 px-4 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Common Questions</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {f.q}
                <span className={`ml-4 text-blue-500 transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
                  <p className="pt-3">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
