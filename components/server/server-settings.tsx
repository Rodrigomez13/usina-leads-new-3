'use client'

import type React from 'react'
import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import type { Server } from '@/lib/types'

interface ServerSettingsProps {
  server: Server
  onSave: (server: Server) => void
}

export default function ServerSettings({ server, onSave }: ServerSettingsProps) {
  const [editedServer, setEditedServer] = useState<Server>(server)
  const [loading, setLoading] = useState(false)

  const handleChange = (field: keyof Server, value: any) => {
    setEditedServer((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSave(editedServer)
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración del Servidor</CardTitle>
        <CardDescription>Modifica los parámetros del servidor de trabajo</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Servidor</Label>
              <Input
                id="name"
                value={editedServer.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coefficient">Coeficiente de Impuesto</Label>
              <Input
                id="coefficient"
                type="number"
                step="0.01"
                value={editedServer.coefficient}
                onChange={(e) =>
                  handleChange('coefficient', parseFloat(e.target.value))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={editedServer.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_active"
              checked={editedServer.is_active}
              onCheckedChange={(checked) => handleChange('is_active', checked)}
            />
            <Label htmlFor="is_active">Servidor Activo</Label>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Configuración'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
