import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata = {
  title: "Workers Rights Watch",
  description: "Championing workers' rights in Kenya and beyond",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        <ThemeProvider defaultTheme="dark">
          <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
            <MainNav />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'