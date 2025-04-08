import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import Sidebar from "@/components/sidebar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
