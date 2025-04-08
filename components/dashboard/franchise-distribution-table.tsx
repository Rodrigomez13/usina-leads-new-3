import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Datos de ejemplo para la distribución por franquicia
const franchiseData = [
  { name: "FENIX", server4: 128, server5: 0, server6: 0, total: 128 },
  { name: "FORTUNA", server4: 0, server5: 0, server6: 0, total: 0 },
  { name: "ATENEA", server4: 58, server5: 0, server6: 0, total: 58 },
  { name: "PADRINO", server4: 0, server5: 0, server6: 0, total: 0 },
  { name: "EROS", server4: 180, server5: 0, server6: 0, total: 180 },
  { name: "GANA24", server4: 309, server5: 0, server6: 0, total: 309 },
  { name: "SPIRITA", server4: 0, server5: 0, server6: 0, total: 0 },
  { name: "FLASHBET", server4: 1, server5: 0, server6: 0, total: 1 },
]

// Totales por servidor
const serverTotals = {
  server4: 676,
  server5: 0,
  server6: 1,
  total: 677,
}

export default function FranchiseDistributionTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Franquicia</TableHead>
            <TableHead className="text-right">Server 4</TableHead>
            <TableHead className="text-right">Server 5</TableHead>
            <TableHead className="text-right">Server 6</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {franchiseData.map((franchise) => (
            <TableRow key={franchise.name}>
              <TableCell className="font-medium">{franchise.name}</TableCell>
              <TableCell className="text-right">{franchise.server4}</TableCell>
              <TableCell className="text-right">{franchise.server5}</TableCell>
              <TableCell className="text-right">{franchise.server6}</TableCell>
              <TableCell className="text-right font-bold">{franchise.total}</TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-slate-100">
            <TableCell className="font-bold">TOTALES</TableCell>
            <TableCell className="text-right font-bold">{serverTotals.server4}</TableCell>
            <TableCell className="text-right font-bold">{serverTotals.server5}</TableCell>
            <TableCell className="text-right font-bold">{serverTotals.server6}</TableCell>
            <TableCell className="text-right font-bold">{serverTotals.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
