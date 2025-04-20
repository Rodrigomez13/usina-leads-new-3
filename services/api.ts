// services/api.ts
import { createClient } from '@supabase/supabase-js';

// Asegúrate de tener estas variables en tu .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Agregar estas interfaces al inicio del archivo services/api.ts
export interface BusinessManager {
    id: string;
    name: string;
    portfolio_id: string;
  }
  
  export interface Campaign {
    id: string;
    name: string;
    business_manager_id: string;
    business_managers?: BusinessManager;
  }
  
  export interface AdGroup {
    id: string;
    name: string;
    campaign_id: string;
    campaigns?: Campaign;
  }
  
  export interface Ad {
    id: string;
    name: string;
    ad_group_id: string;
    status: 'active' | 'paused' | 'deleted';
    cost_per_click: number;
    media_url: string;
    ad_groups?: AdGroup;
  }


export interface Employee {
  id: number;
  name: string;
  role: string;
  shift: string;
  account: string;
  salary: number;
  dayOff: string;
  hoursToday: number;
  overtime: number;
  totalToPay: number;
}

export const apiService = {
  // GET - Métricas diarias por servidor
  async getServerDailyMetrics(serverId: string) {
    const { data, error } = await supabase
      .from('view_server_daily_metrics')
      .select('*')
      .eq('server_id', serverId);
    
    if (error) throw error;
    return data;
  },

  // GET - Distribución por franquicia
  async getAgencyDistribution() {
    const { data, error } = await supabase
      .from('view_agency_load_distribution')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  // GET - Ver todos los anuncios
  async getAllAds() {
    const { data, error } = await supabase
      .from('ads')
      .select(`
        *,
        ad_groups (
          name,
          campaigns (name)
        )
      `);
    
    if (error) throw error;
    return data;
  },

  // GET - Anuncios activos hoy
  async getActiveAdsToday() {
    const { data, error } = await supabase
      .from('ads')
      .select(`
        *,
        ad_groups (
          name,
          campaigns (
            name,
            business_managers (name)
          )
        )
      `)
      .eq('status', 'active');
    
    if (error) throw error;
    return data;
  },

  // GET - Personal con franco hoy
  async getEmployeesWithDayOff() {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return data;
  },

  // GET - Derivaciones hoy por agencia
  async getTodayAgencyAssignments() {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('agency_assignments')
      .select(`
        *,
        agencies (name),
        leads (received_at)
      `)
      .gte('assigned_at', today)
      .lt('assigned_at', today + 'T23:59:59');
    
    if (error) throw error;
    return data;
  },

  // POST - Registrar cierre diario
  async registerDailyClose(closeData: {
    date: string;
    server_id: string;
    total_leads: number;
    total_loads: number;
    total_spent: number;
    agency_distributions: Array<{
      agency_id: string;
      leads_count: number;
      whatsapp_line: string;
    }>;
  }) {
    const { data, error } = await supabase
      .from('daily_closures')
      .insert(closeData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // PATCH - Marcar fondeo como pagado
  async markFundingAsPaid(fundingId: string) {
    const { data, error } = await supabase
      .from('funding_records')
      .update({ status: 'paid', paid_at: new Date().toISOString() })
      .eq('id', fundingId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // GET - Obtener empleados activos
  async getActiveEmployees(): Promise<Employee[]> {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        shifts (name),
        work_logs (
          hours_worked,
          is_day_off
        )
      `)
      .eq('is_active', true);
    
    if (error) throw error;
    
    // Transformar los datos al formato que espera el frontend
    return data.map(emp => ({
      id: emp.id,
      name: emp.name,
      role: emp.role,
      shift: emp.shifts?.name || emp.shift,
      account: emp.account,
      salary: emp.hourly_rate * 160, // Asumiendo mes de 160 horas
      dayOff: emp.day_off,
      hoursToday: emp.work_logs?.[0]?.hours_worked || 0,
      overtime: emp.work_logs?.[0]?.overtime || 0,
      totalToPay: calculateTotalPay(emp)
    }));
  }
};

// Función auxiliar para calcular el pago total
function calculateTotalPay(employee: any) {
  const baseHours = employee.work_logs?.[0]?.hours_worked || 0;
  const overtime = employee.work_logs?.[0]?.overtime || 0;
  const hourlyRate = employee.hourly_rate;
  
  return (baseHours * hourlyRate) + (overtime * hourlyRate * 1.5);
}