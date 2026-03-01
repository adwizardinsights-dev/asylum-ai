import './globals.css'

export const metadata = {
  title: 'Asylum Case AI Analyzer – Organize Your Case With Clarity',
  description: 'An informational tool to help you organize your asylum timeline, evidence, and prepare for attorney consultations. Not legal advice.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800 antialiased">{children}</body>
    </html>
  )
}
