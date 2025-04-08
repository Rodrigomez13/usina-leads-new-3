"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import SimpleChart from "@/components/dashboard/simple-chart"
import FranchiseDistributionTable from "@/components/dashboard/franchise-distribution-table"

interface ServerResultsProps {
  serverId: string
  defaultExpanded?: boolean
}

export default function ServerResults({ serverId, defaultExpanded = true }: ServerResultsProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  // Usamos una referencia estática para la fecha para evitar problemas de hidratación
  const currentDate = "2023-04-08" // Fecha estática para evitar problemas de hidratación

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Resultados del Día</h3>
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Contraer
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Expandir
            </>
          )}
        </Button>
      </div>

      {expanded && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Progreso Diario</CardTitle>
              <CardDescription>Evolución de leads y cargas durante el día</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <SimpleChart />
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Distribución por Franquicia</CardTitle>
              <CardDescription>Cargas enviadas a cada franquicia</CardDescription>
            </CardHeader>
            <CardContent>
              <FranchiseDistributionTable />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
