// app/personal/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePollingData } from '@/hooks/usePollingData';
import { apiService } from '@/services/api';
import type { Employee } from '@/services/api';

interface AgencyAssignment {
  id: string;
  whatsapp_line: string;
  agencies?: {
    name: string;
  };
  leads?: Array<any>;
}

export default function PersonalPage() {
  const { data: employees, loading: employeesLoading, error: employeesError } = usePollingData<Employee[]>(
    () => apiService.getActiveEmployees(),
    30000
  );

  const { data: assignments, loading: assignmentsLoading, error: assignmentsError } = usePollingData(
    () => apiService.getTodayAgencyAssignments(),
    30000
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  if (employeesError || assignmentsError) {
    return (
      <div className="p-4 text-red-500">
        Error al cargar los datos: {employeesError?.message || assignmentsError?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Cards de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Empleados Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {employeesLoading ? '...' : employees?.length || 0}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Horas Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {employeesLoading ? '...' : 
                employees?.reduce((acc, emp) => acc + emp.hoursToday, 0) || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {employeesLoading ? '...' : 
                formatCurrency(employees?.reduce((acc, emp) => acc + emp.totalToPay, 0) || 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Derivaciones Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {assignmentsLoading ? '...' : assignments?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de empleados */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Activo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Turno</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead>Salario</TableHead>
                  <TableHead>Franco</TableHead>
                  <TableHead>Horas Hoy</TableHead>
                  <TableHead>Extra</TableHead>
                  <TableHead>A Pagar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeesLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : employees?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
                      No hay empleados activos
                    </TableCell>
                  </TableRow>
                ) : (
                  employees?.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                          employee.shift === "MAÑANA" ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10" :
                          employee.shift === "TARDE" ? "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-700/10" :
                          employee.shift === "NOCHE" ? "bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-700/10" :
                          "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-700/10"
                        }`}>
                          {employee.shift}
                        </span>
                      </TableCell>
                      <TableCell>{employee.account}</TableCell>
                      <TableCell>{formatCurrency(employee.salary)}</TableCell>
                      <TableCell>{employee.dayOff}</TableCell>
                      <TableCell>{employee.hoursToday}</TableCell>
                      <TableCell>{employee.overtime}</TableCell>
                      <TableCell>{formatCurrency(employee.totalToPay)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de derivaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Derivaciones de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agencia</TableHead>
                  <TableHead>Línea WhatsApp</TableHead>
                  <TableHead>Leads Asignados</TableHead>
                  <TableHead>Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignmentsLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Cargando...
                    </TableCell>
                  </TableRow>
                ) : assignments?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No hay derivaciones hoy
                    </TableCell>
                  </TableRow>
                ) : (
                  assignments?.map((assignment: AgencyAssignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{assignment.agencies?.name}</TableCell>
                      <TableCell>{assignment.whatsapp_line}</TableCell>
                      <TableCell>{assignment.leads?.length || 0}</TableCell>
                      <TableCell>
                        {new Date(assignment.assigned_at).toLocaleTimeString('es-AR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}