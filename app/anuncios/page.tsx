// app/anuncios/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePollingData } from '@/hooks/usePollingData';
import { apiService } from '@/services/api';

interface Ad {
  id: string;
  name: string;
  status: string;
  cost_per_click: number;
  media_url: string;
  ad_groups: {
    name: string;
    campaigns: {
      name: string;
      business_managers: {
        name: string;
      }
    }
  }
}

export default function AnunciosPage() {
  const { data: activeAds, loading, error } = usePollingData<Ad[]>(
    () => apiService.getActiveAdsToday(),
    30000
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error al cargar los datos: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4">
        {/* Cards de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Anuncios Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {loading ? 'Cargando...' : activeAds?.length || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CPC Promedio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {loading ? 'Cargando...' : 
                  formatCurrency(
                    activeAds?.reduce((acc, ad) => acc + (ad.cost_per_click || 0), 0) / 
                    (activeAds?.length || 1)
                  )
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabla de anuncios */}
        <Card>
          <CardHeader>
            <CardTitle>Anuncios Activos Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Conjunto</TableHead>
                  <TableHead>Campaña</TableHead>
                  <TableHead>BM</TableHead>
                  <TableHead>CPC</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : activeAds?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No hay anuncios activos
                    </TableCell>
                  </TableRow>
                ) : (
                  activeAds?.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>{ad.name}</TableCell>
                      <TableCell>{ad.ad_groups?.name}</TableCell>
                      <TableCell>{ad.ad_groups?.campaigns?.name}</TableCell>
                      <TableCell>{ad.ad_groups?.campaigns?.business_managers?.name}</TableCell>
                      <TableCell>{formatCurrency(ad.cost_per_click)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ad.status === "active" ? "bg-green-100 text-green-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {ad.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Aquí implementaremos la activación/desactivación
                          }}
                        >
                          {ad.status === 'active' ? 'Pausar' : 'Activar'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}