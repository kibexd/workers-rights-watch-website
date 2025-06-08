import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import ScrollToTopButton from "@/components/scroll-to-top-button"
import { FloatingSocial } from "@/components/floating-social"

const inter = Inter({ subsets: ["latin"] })

// Floating Socials Component
// const FloatingSocial = dynamic(() => import('@/components/floating-social'), { ssr: false });
// Scroll-to-Top Component
// const ScrollToTop = dynamic(() => import('@/components/scroll-to-top'), { ssr: false });

export const metadata: Metadata = {
  title: "Workers Rights Watch",
  description: "Advocating for workers' rights and fair labor practices worldwide.",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="dark"
        >
          <MainNav />
          <main className="pt-44 pb-20">
            {children}
          </main>
          <ScrollToTopButton />
          <Footer />
          <FloatingSocial />
          {/* <ScrollToTop /> This component does not exist */}
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'