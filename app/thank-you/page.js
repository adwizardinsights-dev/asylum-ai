import Link from 'next/link'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">You're on the list!</h1>
        <p className="text-slate-600 text-lg mb-2 leading-relaxed">
          Thank you for submitting your information. We'll be in touch shortly with next steps.
        </p>
        <p className="text-slate-400 text-sm mb-10">
          Check your inbox — a confirmation email is on the way.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 mb-8">
          <strong>Reminder:</strong> This is an informational tool only. For legal advice, please consult a licensed immigration attorney.
        </div>
        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
