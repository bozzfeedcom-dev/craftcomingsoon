"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import emailjs from "@emailjs/browser"

type ArcGalleryHeroProps = {
  images: string[]
  // angle range in degrees (e.g., -110 to 110 for a nice top arc)
  startAngle?: number
  endAngle?: number
  // radius as a tailwind-friendly pixel value
  radiusLg?: number
  radiusMd?: number
  radiusSm?: number
  // size of each card
  cardSizeLg?: number
  cardSizeMd?: number
  cardSizeSm?: number
  // optional extra class on outer section
  className?: string
}

const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = -110,
  endAngle = 110,
  radiusLg = 340,
  radiusMd = 280,
  radiusSm = 200,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 80,
  className = "",
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  })

  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm })
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd })
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm])

  // Ensure at least 2 points to distribute angles
  const count = Math.max(images.length, 2)
  const step = (endAngle - startAngle) / (count - 1)

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      // Check if EmailJS is properly configured
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error("EmailJS not properly configured. Please check your environment variables.")
      }

      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
      
      // Send email using EmailJS
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_email: email,
          message: `New waitlist signup from: ${email}`,
          to_name: "Craft Video Team",
          from_name: "Waitlist User"
        }
      )
      
      console.log("Email sent successfully:", result)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to send email:", error)
      console.error("Error details:", JSON.stringify(error, null, 2))
      
      // Fallback: Store in localStorage for now
      try {
        const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]')
        waitlist.push({ email, timestamp: new Date().toISOString() })
        localStorage.setItem('waitlist', JSON.stringify(waitlist))
        console.log("Stored in localStorage as fallback:", waitlist)
        setIsSubmitted(true)
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError)
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
        alert(`Failed to join waitlist: ${errorMessage}. Please check console for details.`)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen flex flex-col ${className}`}
    >
      {/* Background ring container that controls geometry */}
      <div
        className="relative mx-auto"
        style={{
          width: "100%",
          height: dimensions.radius * 1.2,
        }}
      >
        {/* Center pivot for transforms - positioned at bottom center */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {/* Each image is positioned on the circle and rotated to face outward */}
          {images.map((src, i) => {
            const angle = startAngle + step * i // degrees
            const angleRad = (angle * Math.PI) / 180

            // Calculate x and y positions
            const x = Math.cos(angleRad) * dimensions.radius
            const y = Math.sin(angleRad) * dimensions.radius

            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: "forwards",
                  zIndex: count - i,
                }}
              >
                <div
                  className="rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur-sm transition-transform hover:scale-105 w-full h-full"
                  style={{ transform: `rotate(${angle / 4}deg)` }}
                >
                  <img
                    src={src || "/placeholder.svg"}
                    alt=""
                    className="block w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Content positioned below the arc */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
        <div
          className="text-center max-w-2xl px-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              Coming Soon
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance">
            craft.video
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 text-balance">
            The future of video creation is here. Craft stunning videos with AI-powered tools that make professional
            content creation effortless.
          </p>

          <div className="mt-8">
            {!isSubmitted ? (
              <form
                onSubmit={handleWaitlistSubmit}
                className="flex flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 px-4 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 focus:border-white/40"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-auto h-12 px-6 text-base font-medium bg-white text-slate-900 hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-300 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-full border border-green-500/30">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">You're on the list!</h3>
                <p className="text-gray-300">
                  We'll notify you as soon as craft.video launches. Get ready to transform your video creation workflow.
                </p>
              </div>
            )}
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Join thousands of creators waiting for the next generation of video tools
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6">
                  <div className="text-center">
            <p className="text-sm text-gray-400">
              © 2025 Craft. All rights reserved.
            </p>
          </div>
      </footer>
    </section>
  )
}

export default ArcGalleryHero
