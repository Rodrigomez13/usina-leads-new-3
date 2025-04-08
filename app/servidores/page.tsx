import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Settings, Power } from "lucide-react"
import ServerSettings from "@/components/server/server-settings"

// Datos de ejemplo
const servers = [
  {
    id: "server4",
    name: "Server 4",
    description: "Servidor principal para publicidad diaria",
    taxCoefficient: 0.12,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "server5",
    name: "Server 5",
    description: "Servidor secundario para campañas especiales",
    taxCoefficient: 0.03,
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "server6",
    name: "Server 6",
    description: "Servidor de respaldo para pruebas",
    taxCoefficient: 0.19,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function ServidoresPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Servidores</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Servidor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Servidores Disponibles</CardTitle>
            <CardDescription>Configuración de servidores como entornos de trabajo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Coeficiente de Impuesto</TableHead>
                    <TableHead>Anuncios Activos</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">{server.name}</TableCell>
                      <TableCell>{server.description}</TableCell>
                      <TableCell>{(server.taxCoefficient * 100).toFixed(0)}%</TableCell>
                      <TableCell>{Math.floor(Math.random() * 10)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            server.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {server.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-1" />
                            Configurar
                          </Button>
                          <Button variant={server.isActive ? "destructive" : "default"} size="sm">
                            <Power className="h-4 w-4 mr-1" />
                            {server.isActive ? "Desactivar" : "Activar"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="server4" className="space-y-4">
          <TabsList>
            {servers.map((server) => (
              <TabsTrigger key={server.id} value={server.id}>
                {server.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {servers.map((server) => (
            <TabsContent key={server.id} value={server.id} className="space-y-4">
              <ServerSettings server={server} onSave={() => {}} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
