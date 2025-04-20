'use client'

import { useEffect, useState } from 'react'
import { BarChart, DollarSign, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MetricCard from '@/components/dashboard/metric-card'
import ServerResults from '@/components/server/server-results'
import { createClient } from '@/utils/supabase/client'

export default function Dashboard() {
  const [time, setTime] = useState(new Date())
  const [leads, setLeads] = useState(0)
  const [loads, setLoads] = useState(0)
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchRealMetrics = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('view_active_server_ads') // ✅ ahora toma datos reales
        .select('leads, loads, spent')

      if (error) {
        console.error('Error al obtener métricas del dashboard', error)
        return
      }

      const totalLeads = data.reduce((sum, row) => sum + (row.leads || 0), 0)
      const totalLoads = data.reduce((sum, row) => sum + (row.loads || 0), 0)
      const totalSpent = data.reduce((sum, row) => sum + (row.spent || 0), 0)

      setLeads(totalLeads)
      setLoads(totalLoads)
      setSpent(totalSpent)
    }

    fetchRealMetrics()
  }, [])

  const formattedTime = time.toLocaleTimeString('es-AR', { hour12: false })
  const formattedDate = time.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const conversion = leads ? ((loads / leads) * 100).toFixed(1) + '%' : '-'
  const costPerLead = leads ? `$${(spent / leads).toFixed(2)}` : '-'
  const costPerLoad = loads ? `$${(spent / loads).toFixed(2)}` : '-'

  return (
    <div className="flex flex-col min-h-screen p-6">
      {/* Encabezado con hora */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="text-right">
          <p className="text-2xl text-cyan-500 font-mono">{formattedTime}</p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
      </div>

      {/* Tarjetas métricas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <MetricCard
          title="Leads Totales"
          icon={Users}
          value={leads.toString()}
          description="Leads desde anuncios activos"
          trend="up"
        />
        <MetricCard
          title="Cargas Totales"
          icon={TrendingUp}
          value={loads.toString()}
          description="Cargas desde todos los servidores"
          trend="up"
        />
        <MetricCard
          title="Conversión"
          icon={BarChart}
          value={conversion}
          description={`$Lead: ${costPerLead} | $Load: ${costPerLoad}`}
          trend="neutral"
        />
        <MetricCard
          title="Gasto Total"
          icon={DollarSign}
          value={`$${spent.toFixed(2)}`}
          description="Sumatoria global de anuncios"
          trend="up"
        />
      </div>

      <ServerResults serverId="todos" />
    </div>
  )
}
