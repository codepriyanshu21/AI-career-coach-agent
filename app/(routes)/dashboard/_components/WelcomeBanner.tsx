import { Button } from '@/components/ui/button'
import React from 'react'

const WelcomeBanner = () => {
  return (
    <div className="relative overflow-hidden p-8 md:p-12 rounded-3xl shadow-xl bg-gradient-to-br from-[#DBEAFE] via-[#E0E7FF] to-[#D1FAF9] border border-blue-200">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-40px] left-[-40px] w-48 h-48 bg-[#3B82F6] opacity-20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-[#06B6D4] opacity-20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-24 h-24 bg-[#818CF8] opacity-30 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 space-y-6 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-snug tracking-tight">
          Launch Your Career with <span className="text-[#2563EB]">AI Power</span>
        </h2>
        <p className="text-base md:text-lg text-blue-800">
          Smarter career decisions start here — get personalized guidance, live market trends, and a tailored success plan powered by AI.
        </p>

        <Button
          variant="outline"
          className="bg-gradient-to-r from-[#2563EB] via-[#6366F1] to-[#06B6D4] text-white font-semibold rounded-xl px-6 py-2 hover:shadow-xl transition-shadow border-none"
        >
          Let’s Get Started
        </Button>
      </div>
    </div>
  )
}

export default WelcomeBanner
