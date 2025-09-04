import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Piano Alimentare",
  description: "App per gestire il tuo piano alimentare",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider defaultTheme="light">
          <div className="min-h-screen bg-background">{children}</div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
