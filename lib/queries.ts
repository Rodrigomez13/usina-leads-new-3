import { createClient } from '@/utils/supabase/client'
import { Server } from './types'
import { format } from 'date-fns'

export async function getServersWithStats() {
  const supabase = createClient()

  const { data: servers, error: serverError } = await supabase
    .from('servers')
    .select('*')
    .order('name', { ascending: true })

  if (serverError) throw new Error(serverError.message)

  const today = format(new Date(), 'yyyy-MM-dd')

  const { data: metrics, error: metricsError } = await supabase
    .from('server_ads')
    .select('server_id, leads, loads, spent')
    .eq('date', today)

  if (metricsError) throw new Error(metricsError.message)

  const statsMap = new Map<string, { leads: number; loads: number; spent: number }>()

  metrics.forEach((row) => {
    const current = statsMap.get(row.server_id) || { leads: 0, loads: 0, spent: 0 }
    statsMap.set(row.server_id, {
      leads: current.leads + (row.leads || 0),
      loads: current.loads + (row.loads || 0),
      spent: current.spent + (row.spent || 0),
    })
  })

  return servers.map((server) => {
    const stats = statsMap.get(server.id) || { leads: 0, loads: 0, spent: 0 }
    return { ...server, ...stats }
  })
}



// Obtener todos los servidores con métricas
export async function getServers(): Promise<Server[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data
}

// Obtener un servidor por ID
export async function getServer(id: string): Promise<Server> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data
}

// Crear nuevo servidor
export async function createServer(fields: Omit<Server, 'id' | 'created_at' | 'updated_at'>) {
  const supabase = createClient()
  const { error } = await supabase.from('servers').insert(fields)

  if (error) throw new Error(error.message)
}

// Actualizar servidor existente
export async function updateServer(id: string, fields: Partial<Server>) {
  const supabase = createClient()
  const { error } = await supabase.from('servers').update(fields).eq('id', id)

  if (error) throw new Error(error.message)
}

// Eliminar servidor
export async function deleteServer(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from('servers').delete().eq('id', id)

  if (error) throw new Error(error.message)
}
