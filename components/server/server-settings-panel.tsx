'use client'

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { supabase } from "@/utils/supabase/client"
import { Switch } from "@/components/ui/switch"

interface Server {
  id: string
  name: string
  description: string
  coefficient: number
  is_active: boolean
  anuncios_activos: number
}

export default function ServerSettingsPanel() {
  const [servers, setServers] = useState<Server[]>([])

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchServers()
  }, [])

  const fetchServers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("servers")
        .select("*")
        .order('name', { ascending: true })
      if (error) {
        console.error('Error al cargar servidores:', error)
        toast.error(`Error al cargar servidores: ${error.message}`)
        return
      }
      setServers(data || [])
    } catch (error) {
      console.error('Error inesperado:', error)
      toast.error('Error inesperado al cargar servidores')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateServer = async (e: any, serverId: string) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const name = formData.get("name") as string
      const whatsappLine = formData.get("whatsapp_line") as string
      const coefficientStr = formData.get("coefficient") as string
      const coefficient = parseFloat(coefficientStr.replace(",", "."))
      
      if (isNaN(coefficient) || coefficient < 0 || coefficient > 100) {
        toast.error("El coeficiente debe ser un número entre 0 y 100")
        return
      }

      console.log('Intentando actualizar servidor:', { serverId, name, whatsapp_line: whatsappLine, coefficient })

      const { error } = await supabase
        .from("servers")
        .update({
          name,
          whatsapp_line: whatsappLine,
          coefficient
        })
        .eq("id", serverId)

      if (error) {
        console.error('Error al actualizar:', error)
        toast.error(`Error al actualizar: ${error.message}`)
      } else {
        toast.success("Servidor actualizado exitosamente")
        fetchServers()
      }
    } catch (error) {
      console.error('Error inesperado:', error)
      toast.error('Error inesperado al actualizar el servidor')
    }
  }

  const handleToggleActive = async (serverId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("servers")
        .update({ is_active: isActive })
        .eq("id", serverId)

      if (error) {
        console.error('Error al cambiar estado:', error)
        toast.error(`Error al cambiar estado: ${error.message}`)
        return
      }

      toast.success(`Servidor ${isActive ? 'activado' : 'desactivado'} exitosamente`)
      fetchServers()
    } catch (error) {
      console.error('Error inesperado:', error)
      toast.error('Error inesperado al cambiar estado del servidor')
    }
  }

  const handleCreateServer = async (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const name = formData.get("name") as string
      const description = formData.get("description") as string
      const coefficientStr = formData.get("coefficient") as string
      const coefficient = parseInt(coefficientStr)
      
      if (isNaN(coefficient) || coefficient < 0 || coefficient > 100) {
        toast.error("El coeficiente debe ser un número entre 0 y 100")
        return
      }

      console.log('Intentando crear servidor con:', { name, description, coefficient })

      const { data, error } = await supabase
        .from("servers")
        .insert([{
          name,
          description,
          coefficient,
          is_active: true,
          anuncios_activos: 0
        }])
        .select()

      if (error) {
        console.error('Error al crear servidor:', error)
        toast.error(`Error al crear el servidor: ${error.message}`)
      } else {
        toast.success("Servidor creado exitosamente")
        e.target.reset() // Limpiar el formulario
        fetchServers() // Recargar la lista
      }
    } catch (error) {
      console.error('Error inesperado:', error)
      toast.error('Error inesperado al crear el servidor')
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Servidores Disponibles</h2>
        {loading && <p className="text-sm text-muted-foreground">Cargando...</p>}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white hover:bg-gray-800">+ Nuevo Servidor</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Servidor</DialogTitle>
              <p className="text-muted-foreground text-sm">Completá los detalles para crear un nuevo servidor como entorno de trabajo.</p>
            </DialogHeader>
            <form onSubmit={handleCreateServer} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input name="name" placeholder="ej: Servidor Principal" required />
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Input name="description" placeholder="ej: Servidor para campañas principales" required />
              </div>
              <div>
                <label className="text-sm font-medium">Coeficiente (%)</label>
                <Input 
                  name="coefficient" 
                  type="number" 
                  step="1" 
                  min={0} 
                  max={100} 
                  placeholder="ej: 15"
                  required 
                />
              </div>
              <DialogFooter>
                <Button type="submit">Crear Servidor</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Nombre</th>
              <th className="text-left p-2">Descripción</th>
              <th className="text-left p-2">Coeficiente</th>
              <th className="text-left p-2">Anuncios Activos</th>
              <th className="text-left p-2">Estado</th>
              <th className="text-left p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Cargando servidores...
                </td>
              </tr>
            ) : servers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  No hay servidores configurados
                </td>
              </tr>
            ) : (
              servers.map((server) => (
                <tr key={server.id} className="border-b">
                  <td className="p-2 font-medium">{server.name}</td>
                  <td className="p-2">{server.description}</td>
                  <td className="p-2">{server.coefficient}%</td>
                  <td className="p-2">{server.anuncios_activos}</td>
                  <td className="p-2">
                    <Switch
                      checked={server.is_active}
                      onCheckedChange={(checked: boolean) => handleToggleActive(server.id, checked)}
                    />
                  </td>
                  <td className="p-2 space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="px-3 py-1">
                          ⚙️ Configurar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Servidor</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={(e) => handleUpdateServer(e, server.id)} className="space-y-3">
                          <Input name="name" defaultValue={server.name} required />
                          <Input name="description" defaultValue={server.description} required />
                          <Input name="coefficient" type="number" step="0.01" min={0} max={100} defaultValue={server.coefficient} required />
                          <DialogFooter>
                            <Button type="submit">Guardar</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant={server.is_active ? "destructive" : "default"} 
                      size="sm" 
                      className="px-3 py-1"
                      onClick={() => handleToggleActive(server.id, !server.is_active)}
                    >
                      {server.is_active ? '🛑 Desactivar' : '✅ Activar'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
