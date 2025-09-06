import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "craft.video - Revolutionary AI Video Creation Platform | Coming Soon",
  description: "Transform your creative vision with craft.video's cutting-edge AI video creation tools. Professional-grade video production, automated editing, and intelligent content generation. Join our exclusive waitlist for early access.",
  keywords: ["AI video creation", "video editing", "automated video production", "content creation", "video maker", "AI tools", "video generation", "creative tools"],
  authors: [{ name: "craft.video" }],
  creator: "craft.video",
  publisher: "craft.video",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://craft.video'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "craft.video - Revolutionary AI Video Creation Platform",
    description: "Transform your creative vision with craft.video's cutting-edge AI video creation tools. Professional-grade video production made simple.",
    url: 'https://craft.video',
    siteName: 'craft.video',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'craft.video - AI Video Creation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'craft.video - Revolutionary AI Video Creation',
    description: 'Transform your creative vision with cutting-edge AI video creation tools. Join our waitlist.',
    images: ['/twitter-image.jpg'],
    creator: '@craftvideo_ai',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme and mobile optimization */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Additional SEO meta tags */}
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "craft.video",
              "url": "https://craft.video",
              "logo": "https://craft.video/logo.png",
              "description": "Revolutionary AI video creation platform for professional content creators",
              "foundingDate": "2024",
              "industry": "Technology",
              "sameAs": [
                "https://x.com/craftvideo_ai",
                "https://linkedin.com/company/craftvideo",
                "https://github.com/craftvideo",
                "https://discord.gg/craftvideo"
              ]
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "craft.video",
              "url": "https://craft.video",
              "description": "Transform your creative vision with cutting-edge AI video creation tools",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://craft.video/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0XTQCJ79X1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0XTQCJ79X1', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
