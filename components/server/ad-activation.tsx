"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, PlusCircle } from "lucide-react"
import type { Server, Advertisement, WhatsAppApi, ActiveAdvertisement } from "@/lib/types"

interface AdActivationProps {
  readonly server: Server
  readonly advertisements: readonly Advertisement[]
  readonly apis: readonly WhatsAppApi[]
  readonly activeAds: readonly ActiveAdvertisement[]
  readonly onActivate: (activeAd: Omit<ActiveAdvertisement, "id" | "createdAt" | "updatedAt">) => void
  readonly onDeactivate: (activeAdId: string) => void
}

export default function AdActivation({  
  server,
  advertisements,
  apis,
  activeAds,
  onActivate,
  onDeactivate,
}: AdActivationProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null)
  const [selectedApi, setSelectedApi] = useState<string>("")
  const [dailyBudget, setDailyBudget] = useState<number>(0)

  const filteredAds = advertisements.filter(
    (ad) =>
      ad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleActivate = () => {
    if (!selectedAd || !selectedApi || dailyBudget <= 0) return

    onActivate({
      serverId: server.id,
      advertisementId: selectedAd.id,
      apiId: selectedApi,
      dailyBudget,
      date: new Date(),
      isActive: true,
    })

    // Reset form
    setSelectedAd(null)
    setSelectedApi("")
    setDailyBudget(0)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activación de Anuncios en {server.name}</CardTitle>
        <CardDescription>Selecciona y configura anuncios para este servidor</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Buscar Anuncio</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por ID o nombre..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {searchTerm && filteredAds.length > 0 && (
              <div className="border rounded-md max-h-[200px] overflow-y-auto">
                {filteredAds.map((ad) => (
                  <div
                    key={ad.id}
                    className="p-2 hover:bg-slate-100 cursor-pointer border-b last:border-b-0 flex justify-between"
                    onClick={() => setSelectedAd(ad)}
                  >
                    <div>
                      <div className="font-medium">{ad.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {ad.id}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {ad.status === "active" ? (
                        <span className="text-green-600">Activo</span>
                      ) : (
                        <span className="text-amber-600">Inactivo</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedAd && (
            <div className="border rounded-md p-4 bg-slate-50">
              <div className="font-medium text-lg mb-2">Configuración de Anuncio</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Anuncio Seleccionado:</p>
                  <p>{selectedAd.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {selectedAd.id}</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiSelect">API de WhatsApp</Label>
                    <Select value={selectedApi} onValueChange={setSelectedApi}>
                      <SelectTrigger id="apiSelect">
                        <SelectValue placeholder="Seleccionar API" />
                      </SelectTrigger>
                      <SelectContent>
                        {apis.map((api) => (
                          <SelectItem key={api.id} value={api.id}>
                            {api.name} ({api.phone})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dailyBudget">Presupuesto Diario ($)</Label>
                    <Input
                      id="dailyBudget"
                      type="number"
                      step="0.01"
                      min="0"
                      value={dailyBudget || ""}
                      onChange={(e) => setDailyBudget(Number.parseFloat(e.target.value))}
                      placeholder="Ej: 100.00"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleActivate} className="mt-4" disabled={!selectedApi || dailyBudget <= 0}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Activar Anuncio en {server.name}
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <div className="font-medium">Anuncios Activos en {server.name}</div>
            {activeAds.length === 0 ? (
              <p className="text-muted-foreground">No hay anuncios activos en este servidor.</p>
            ) : (
              <div className="border rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Anuncio
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        API
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Presupuesto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeAds.map((activeAd) => {
                      const ad = advertisements.find((a) => a.id === activeAd.advertisementId)
                      const api = apis.find((a) => a.id === activeAd.apiId)

                      return (
                        <tr key={activeAd.id}>
                          <td className="px-4 py-3">
                            <div className="font-medium">{ad?.name || "Anuncio Desconocido"}</div>
                            <div className="text-sm text-muted-foreground">ID: {activeAd.advertisementId}</div>
                          </td>
                          <td className="px-4 py-3">{api?.name || "API Desconocida"}</td>
                          <td className="px-4 py-3">${activeAd.dailyBudget.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <Button variant="destructive" size="sm" onClick={() => onDeactivate(activeAd.id)}>
                              Desactivar
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
