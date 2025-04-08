"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Download, Filter } from "lucide-react"

export default function PublicidadPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Publicidad</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="portfolios" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
          <TabsTrigger value="business-managers">Business Managers</TabsTrigger>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="adsets">Conjuntos de Anuncios</TabsTrigger>
          <TabsTrigger value="ads">Anuncios</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
        </TabsList>

        {/* Pestaña de Portfolios */}
        <TabsContent value="portfolios" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Portfolios Publicitarios</CardTitle>
                <CardDescription>Gestión de portfolios con tarjetas vinculadas para gastos</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar portfolios..." className="pl-8 w-[200px] md:w-[300px]" />
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Portfolio
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Información de Tarjeta</TableHead>
                      <TableHead>Business Managers</TableHead>
                      <TableHead>Gasto Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      "Portfolio Principal",
                      "Portfolio Secundario",
                      "Portfolio Test",
                      "Portfolio VIP",
                      "Portfolio Nuevo",
                    ].map((name, i) => {
                      const id = `${Math.floor(Math.random() * 10000000000)}`
                      const cardInfo = ["**** 1234", "**** 5678", "**** 9012", "**** 3456", "**** 7890"][i]
                      const managers = Math.floor(Math.random() * 5) + 1
                      const totalSpent = Math.floor(Math.random() * 10000) + 1000
                      const status = ["Activo", "En Revisión", "Limitado"][Math.floor(Math.random() * 3)]

                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell>{id}</TableCell>
                          <TableCell>{cardInfo}</TableCell>
                          <TableCell>{managers}</TableCell>
                          <TableCell>${totalSpent.toFixed(2)}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                status === "Activo"
                                  ? "bg-green-100 text-green-800"
                                  : status === "En Revisión"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Ver Detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Business Managers */}
        <TabsContent value="business-managers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Business Managers</CardTitle>
                <CardDescription>Gestión de Business Managers (BM) asignados a portfolios</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar BM..." className="pl-8 w-[200px] md:w-[300px]" />
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo BM
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Portfolio</TableHead>
                      <TableHead>Campañas Activas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["RF 2", "ReyFortuna 4", "Fenix 3", "GANA24 1", "Atenea 2", "FLASHBET"].map((name, i) => {
                      const id = `${Math.floor(Math.random() * 10000000000)}`
                      const portfolio = [
                        "Portfolio Principal",
                        "Portfolio Secundario",
                        "Portfolio Test",
                        "Portfolio VIP",
                        "Portfolio Nuevo",
                      ][Math.floor(Math.random() * 5)]
                      const activeCampaigns = Math.floor(Math.random() * 10) + 1
                      const status = ["Activo", "En Revisión", "Limitado", "Restringido"][Math.floor(Math.random() * 4)]

                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell>{id}</TableCell>
                          <TableCell>{portfolio}</TableCell>
                          <TableCell>{activeCampaigns}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                status === "Activo"
                                  ? "bg-green-100 text-green-800"
                                  : status === "En Revisión"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : status === "Limitado"
                                      ? "bg-orange-100 text-orange-800"
                                      : "bg-red-100 text-red-800"
                              }`}
                            >
                              {status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Ver Detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Anuncios */}
        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Anuncios</CardTitle>
                <CardDescription>Gestión de anuncios individuales para activar en servidores</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Buscar anuncios..." className="pl-8 w-[200px] md:w-[300px]" />
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nuevo Anuncio
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Conjunto</TableHead>
                      <TableHead>Campaña</TableHead>
                      <TableHead>BM</TableHead>
                      <TableHead>Rendimiento Histórico</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const id = `1202${Math.floor(Math.random() * 10000000000)}`
                      const name = `Anuncio ${i + 1}`
                      const adSet = `Conjunto ${Math.floor(Math.random() * 10) + 1}`
                      const campaign = `Campaña ${Math.floor(Math.random() * 5) + 1}`
                      const bm = ["RF 2", "ReyFortuna 4", "Fenix 3", "GANA24 1", "Atenea 2", "FLASHBET"][
                        Math.floor(Math.random() * 6)
                      ]
                      const leads = Math.floor(Math.random() * 1000) + 10
                      const loads = Math.floor(leads * (Math.random() * 0.6 + 0.1))
                      const conversion = Math.floor((loads / leads) * 100)
                      const costPerLead = (Math.random() * 5 + 1).toFixed(2)
                      const status = ["Activo", "Inactivo", "Pausado"][Math.floor(Math.random() * 3)]

                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{id}</TableCell>
                          <TableCell>{name}</TableCell>
                          <TableCell>{adSet}</TableCell>
                          <TableCell>{campaign}</TableCell>
                          <TableCell>{bm}</TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <div>Leads: {leads}</div>
                              <div>Cargas: {loads}</div>
                              <div>Conversión: {conversion}%</div>
                              <div>Costo por Lead: ${costPerLead}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                status === "Activo"
                                  ? "bg-green-100 text-green-800"
                                  : status === "Inactivo"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Activar en Servidor
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de APIs */}
        <TabsContent value="apis" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>APIs de WhatsApp</CardTitle>
                <CardDescription>Gestión de APIs para respuesta de mensajes</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nueva API
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Token</TableHead>
                      <TableHead>Teléfono</TableHead>
                      <TableHead>Mensajes/Día</TableHead>
                      <TableHead>Costo Mensual</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["Vivien", "Ezra", "MARANDA", "EMILY", "SASHA", "Marci"].map((name, i) => {
                      const token = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
                      const phone = `+54 9 11 ${Math.floor(Math.random() * 10000000) + 1000000}`
                      const messagesPerDay = Math.floor(Math.random() * 1000) + 200
                      const monthlyCost = Math.floor(Math.random() * 200) + 50
                      const status = ["Activa", "En Uso", "Limitada", "Suspendida"][Math.floor(Math.random() * 4)]

                      return (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{name}</TableCell>
                          <TableCell>{token.substring(0, 10)}...</TableCell>
                          <TableCell>{phone}</TableCell>
                          <TableCell>{messagesPerDay}</TableCell>
                          <TableCell>${monthlyCost.toFixed(2)}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                status === "Activa" || status === "En Uso"
                                  ? "bg-green-100 text-green-800"
                                  : status === "Limitada"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Ver Detalles
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
