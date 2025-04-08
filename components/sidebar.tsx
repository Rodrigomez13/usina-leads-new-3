"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Users,
  DollarSign,
  Megaphone,
  UserCog,
  Building,
  Settings,
  Menu,
  X,
  Server,
  Briefcase,
  Layers,
  LayoutGrid,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  {
    title: "Servidores",
    href: "/",
    icon: Server,
  },
  {
    title: "Publicidad",
    href: "/publicidad",
    icon: Megaphone,
    children: [
      {
        title: "Portfolios",
        href: "/publicidad?tab=portfolios",
        icon: Briefcase,
      },
      {
        title: "Business Managers",
        href: "/publicidad?tab=business-managers",
        icon: LayoutGrid,
      },
      {
        title: "Anuncios",
        href: "/publicidad?tab=ads",
        icon: Layers,
      },
    ],
  },
  {
    title: "Configuración de Servidores",
    href: "/servidores",
    icon: Settings,
  },
  {
    title: "Leads",
    href: "/leads",
    icon: Users,
  },
  {
    title: "Franquicias",
    href: "/franquicias",
    icon: Building,
  },
  {
    title: "Personal",
    href: "/personal",
    icon: UserCog,
  },
  {
    title: "Finanzas",
    href: "/finanzas",
    icon: DollarSign,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleExpandItem = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}

      <div
        className={cn(
          "bg-slate-900 text-white h-full w-64 flex flex-col transition-all duration-300 ease-in-out",
          isMobile && (isOpen ? "fixed left-0 z-40" : "fixed -left-64 z-40"),
        )}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold">Usina Leads</h1>
          <p className="text-slate-400 text-sm">Sistema de Gestión</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.href} className="space-y-1">
              {item.children ? (
                <>
                  <div
                    className={cn(
                      "flex items-center justify-between py-3 px-4 rounded-md transition-colors cursor-pointer",
                      pathname.startsWith(item.href.split("?")[0])
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800",
                    )}
                    onClick={() => toggleExpandItem(item.title)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform ${expandedItems[item.title] ? "transform rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {expandedItems[item.title] && (
                    <div className="pl-4 ml-4 border-l border-slate-700 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={() => isMobile && setIsOpen(false)}>
                          <div
                            className={cn(
                              "flex items-center py-2 px-3 rounded-md transition-colors text-sm",
                              pathname === child.href
                                ? "bg-slate-800 text-white"
                                : "text-slate-400 hover:text-white hover:bg-slate-800",
                            )}
                          >
                            <child.icon className="mr-2 h-4 w-4" />
                            {child.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link href={item.href} onClick={() => isMobile && setIsOpen(false)}>
                  <div
                    className={cn(
                      "flex items-center py-3 px-4 rounded-md transition-colors",
                      pathname === item.href
                        ? "bg-slate-800 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800",
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-slate-800 p-4 rounded-md">
            <p className="text-sm font-medium">Administrador</p>
            <p className="text-xs text-slate-400">admin@usinaleads.com</p>
          </div>
        </div>
      </div>
    </>
  )
}
