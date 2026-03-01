'use client'
import { useState } from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import LeadForm from '../components/LeadForm'
import Footer from '../components/Footer'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  return (
    <>
      <Nav onCTA={() => setShowForm(true)} />
      <Hero onCTA={() => setShowForm(true)} />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing onCTA={() => setShowForm(true)} />
      <FAQ />

      {/* CTA BANNER */}
      <section className="bg-blue-600 py-16 px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Ready to Organize Your Case?</h2>
        <p className="text-blue-200 mb-8 max-w-xl mx-auto">Start for free. No attorney required to begin. Use your results to have a better, faster consultation.</p>
        <button onClick={() => setShowForm(true)} className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-4 rounded-xl text-lg transition-all shadow-lg">
          Start My Case Review →
        </button>
        <p className="text-blue-300 text-xs mt-4">Not legal advice · Private by design · Free to start</p>
      </section>

      <Footer onCTA={() => setShowForm(true)} />
      {showForm && <LeadForm onClose={() => setShowForm(false)} />}
    </>
  )
}
