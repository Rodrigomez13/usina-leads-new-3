'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/sidebar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showSidebar = pathname !== '/'

  return (
    <div className={showSidebar ? "flex h-screen" : "h-screen"}>
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? "flex-1" : "h-full"}>{children}</main>
    </div>
  )
}
