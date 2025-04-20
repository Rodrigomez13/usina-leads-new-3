"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

interface Ad {
  id: string
  bm: string
  budget: number
  spent: number
  api: string
  status: string
  leads: number
  loads: number
}

interface ServerMetricsCardProps {
  serverId: string
}

export default function ServerMetricsCard({ serverId }: ServerMetricsCardProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [view_active_server_ads, setAds] = useState<Ad[]>([])

  useEffect(() => {
    const fetchAds = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("view_active_server_ads")
        .select("*")
        .eq("server", serverId)
        .or("status.eq.ACTIVE,status.eq.TESTING CONVERSION")

      if (!error && data) {
        setAds(data)
      } else {
        console.error("Error al obtener anuncios:", error)
      }
    }

    fetchAds()
  }, [serverId])

  const filteredData = view_active_server_ads.filter(
    (ad) =>
      ad.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.api.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Anuncios Server {serverId}</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar anuncios..."
              className="pl-8 w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Anuncio
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Ad Set</TableHead>
                <TableHead>BM</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Gastado</TableHead>
                <TableHead>API</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Loads</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>$ Lead</TableHead>
                <TableHead>$ Load</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((ad) => {
                const conversion = ad.leads ? ((ad.loads / ad.leads) * 100).toFixed(0) + "%" : "-"
                const costPerLead = ad.leads ? `$${(ad.spent / ad.leads).toFixed(2)}` : "-"
                const costPerLoad = ad.loads ? `$${(ad.spent / ad.loads).toFixed(2)}` : "-"

                return (
                  <TableRow key={ad.id}>
                    <TableCell className="font-medium">{ad.id}</TableCell>
                    <TableCell>{ad.bm}</TableCell>
                    <TableCell>${ad.budget}</TableCell>
                    <TableCell>${ad.spent}</TableCell>
                    <TableCell>{ad.api}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ad.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : ad.status === "TESTING CONVERSION"
                            ? "bg-blue-100 text-blue-800"
                            : ad.status === "API DEAD"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ad.status}
                      </span>
                    </TableCell>
                    <TableCell>{ad.leads}</TableCell>
                    <TableCell>{ad.loads}</TableCell>
                    <TableCell>{conversion}</TableCell>
                    <TableCell>{costPerLead}</TableCell>
                    <TableCell>{costPerLoad}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
