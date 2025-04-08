import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, TrendingUp, BarChart, Settings } from "lucide-react"
import MetricCard from "@/components/dashboard/metric-card"
import ServerMetricsCard from "@/components/dashboard/server-metrics-card"
import ServerResults from "@/components/server/server-results"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Servidores</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configurar Servidores
          </Button>
          <p className="text-sm text-muted-foreground">Última actualización: {new Date().toLocaleString("es-AR")}</p>
        </div>
      </div>

      <Tabs defaultValue="server4" className="space-y-4">
        <TabsList>
          <TabsTrigger value="server4">Server 4</TabsTrigger>
          <TabsTrigger value="server5">Server 5</TabsTrigger>
          <TabsTrigger value="server6">Server 6</TabsTrigger>
          <TabsTrigger value="todos">Todos los Servers</TabsTrigger>
        </TabsList>

        <TabsContent value="server4" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Leads Totales" value="1,333" description="+12% desde ayer" icon={Users} trend="up" />
            <MetricCard title="Cargas Totales" value="675" description="+8% desde ayer" icon={TrendingUp} trend="up" />
            <MetricCard title="Conversión" value="50.64%" description="-2% desde ayer" icon={BarChart} trend="down" />
            <MetricCard
              title="Gasto Total"
              value="$3,982.42"
              description="+15% desde ayer"
              icon={DollarSign}
              trend="up"
            />
          </div>

          <ServerResults serverId="4" />
          <ServerMetricsCard serverId="4" />
        </TabsContent>

        <TabsContent value="server5" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Leads Totales" value="0" description="0% desde ayer" icon={Users} trend="neutral" />
            <MetricCard
              title="Cargas Totales"
              value="0"
              description="0% desde ayer"
              icon={TrendingUp}
              trend="neutral"
            />
            <MetricCard title="Conversión" value="0.00%" description="0% desde ayer" icon={BarChart} trend="neutral" />
            <MetricCard
              title="Gasto Total"
              value="$0.00"
              description="0% desde ayer"
              icon={DollarSign}
              trend="neutral"
            />
          </div>

          <ServerResults serverId="5" defaultExpanded={false} />
          <ServerMetricsCard serverId="5" />
        </TabsContent>

        <TabsContent value="server6" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Leads Totales" value="0" description="0% desde ayer" icon={Users} trend="neutral" />
            <MetricCard
              title="Cargas Totales"
              value="0"
              description="0% desde ayer"
              icon={TrendingUp}
              trend="neutral"
            />
            <MetricCard title="Conversión" value="0.00%" description="0% desde ayer" icon={BarChart} trend="neutral" />
            <MetricCard
              title="Gasto Total"
              value="$0.00"
              description="0% desde ayer"
              icon={DollarSign}
              trend="neutral"
            />
          </div>

          <ServerResults serverId="6" defaultExpanded={false} />
          <ServerMetricsCard serverId="6" />
        </TabsContent>

        <TabsContent value="todos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Leads Totales" value="1,333" description="+12% desde ayer" icon={Users} trend="up" />
            <MetricCard title="Cargas Totales" value="675" description="+8% desde ayer" icon={TrendingUp} trend="up" />
            <MetricCard title="Conversión" value="50.64%" description="-2% desde ayer" icon={BarChart} trend="down" />
            <MetricCard
              title="Gasto Total"
              value="$3,982.42"
              description="+15% desde ayer"
              icon={DollarSign}
              trend="up"
            />
          </div>

          <ServerResults serverId="todos" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
