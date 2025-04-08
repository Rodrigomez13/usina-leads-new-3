"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Importar Chart.js dinámicamente solo en el cliente
const DynamicChart = dynamic(
  () => import("./chart-component").then((mod) => mod.ChartComponent),
  { ssr: false }, // Esto es clave: no renderizar en el servidor
)

export default function DailyProgressChart() {
  // Usar un estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mostrar un placeholder hasta que estemos en el cliente
  if (!isClient) {
    return (
      <div className="h-[400px] flex items-center justify-center bg-slate-100 rounded-md">
        <div className="text-slate-500">Cargando gráfico...</div>
      </div>
    )
  }

  return <DynamicChart />
}
