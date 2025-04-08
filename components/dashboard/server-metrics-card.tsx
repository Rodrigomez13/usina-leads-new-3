"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

// Datos de ejemplo para la tabla de anuncios
const adData = [
  {
    id: "120212593871270338",
    bm: "RF 2",
    budget: "$100.00",
    spent: "$74.35",
    api: "Vivien",
    status: "TESTING CONVERSION",
    leads: 10,
    loads: 8,
    conversion: "35%",
    costPerLead: "$3.23",
    costPerLoad: "$9.29",
  },
  {
    id: "120213061164050338",
    bm: "RF 2",
    budget: "$30.00",
    spent: "$15.99",
    api: "Ezra",
    status: "TESTING CONVERSION",
    leads: 6,
    loads: 2,
    conversion: "33%",
    costPerLead: "$2.67",
    costPerLoad: "$8.00",
  },
  {
    id: "120212246465590338",
    bm: "RF 2",
    budget: "$4,000.00",
    spent: "$3,449.59",
    api: "MARANDA",
    status: "ACTIVE",
    leads: 1304,
    loads: 664,
    conversion: "51%",
    costPerLead: "$2.65",
    costPerLoad: "$5.20",
  },
]

interface ServerMetricsCardProps {
  serverId: string
}

export default function ServerMetricsCard({ serverId }: ServerMetricsCardProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = adData.filter(
    (ad) =>
      ad.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.api.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.status.toLowerCase().includes(searchTerm.toLowerCase()),
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
        <div className="rounded-md border">
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
                <TableHead>$ Loads</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.id}</TableCell>
                  <TableCell>{ad.bm}</TableCell>
                  <TableCell>{ad.budget}</TableCell>
                  <TableCell>{ad.spent}</TableCell>
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
                  <TableCell>{ad.conversion}</TableCell>
                  <TableCell>{ad.costPerLead}</TableCell>
                  <TableCell>{ad.costPerLoad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
