import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { TransactionProvider } from "@/contexts/transaction-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Financial Dashboard",
  description: "Track your income and expenses with ease",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TransactionProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 pl-16 md:pl-64">{children}</main>
            </div>
          </TransactionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'