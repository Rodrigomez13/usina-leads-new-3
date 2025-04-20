import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
