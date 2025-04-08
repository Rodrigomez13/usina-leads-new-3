"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { Server } from "@/lib/types"

interface ServerSettingsProps {
  server: Server
  onSave: (server: Server) => void
}

export default function ServerSettings({ server, onSave }: ServerSettingsProps) {
  const [editedServer, setEditedServer] = useState<Server>(server)

  const handleChange = (field: keyof Server, value: any) => {
    setEditedServer((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedServer)
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
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ej: Server 4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxCoefficient">Coeficiente de Impuesto</Label>
              <Input
                id="taxCoefficient"
                type="number"
                step="0.01"
                value={editedServer.taxCoefficient}
                onChange={(e) => handleChange("taxCoefficient", Number.parseFloat(e.target.value))}
                placeholder="Ej: 0.12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Input
              id="description"
              value={editedServer.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Descripción del servidor"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={editedServer.isActive}
              onCheckedChange={(checked) => handleChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Servidor Activo</Label>
          </div>

          <Button type="submit">Guardar Configuración</Button>
        </form>
      </CardContent>
    </Card>
  )
}
