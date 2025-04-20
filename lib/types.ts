// Estructura Publicitaria
export interface Portfolio {
  id: string
  name: string
  description?: string
  cardInfo?: string // Información de tarjeta vinculada
  status: "active" | "inactive" | "limited"
  createdAt: Date
  updatedAt: Date
}

export interface BusinessManager {
  id: string
  portfolioId: string
  name: string
  accountId: string
  status: "active" | "inactive" | "limited" | "restricted"
  createdAt: Date
  updatedAt: Date
}

export interface Campaign {
  id: string
  businessManagerId: string
  name: string
  objective: string
  status: "active" | "inactive" | "paused"
  createdAt: Date
  updatedAt: Date
}

export interface AdSet {
  id: string
  campaignId: string
  name: string
  status: "active" | "inactive" | "paused"
  createdAt: Date
  updatedAt: Date
}

export interface Advertisement {
  id: string
  adSetId: string
  name: string
  creativeUrl?: string
  status: "active" | "inactive" | "paused"
  historicalPerformance?: {
    averageLeads: number
    averageLoads: number
    averageConversion: number
    averageCost: number
  }
  createdAt: Date
  updatedAt: Date
}

// Servidores (Entornos de Trabajo)
export interface ServerEjemplos {
  id: string
  name: string
  description?: string
  coefficient: number // Coeficiente de impuesto
  isActive: boolean
  additionalParameters?: Record<string, any> // Para futuras variables
  createdAt: Date
  updatedAt: Date
}
export type Server = {
  id: string
  name: string
  coefficient: number
  description: string
  is_active: boolean
}




// Registro diario por anuncio (tabla server_ads)
export interface ServerAd {
  id: string
  server_id: string
  ad_id: string
  api_id?: string
  date: string
  leads: number
  loads: number
  spent: number
  total_cost: number
}

// Distribución de franquicias (tabla o vista derivaciones)
export interface FranchiseLoad {
  franquicia: string
  cantidad: number
}

// Gráfico diario por fecha (por ahora mockeado, pero se puede usar para chart)
export interface DailyGraph {
  date: string
  loads: number
  leads: number
  spent: number
}

// Activación de Anuncios en Servidores
export interface ActiveAdvertisement {
  id: string
  serverId: string
  advertisementId: string
  apiId: string // API conectada
  dailyBudget: number
  date: Date
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// APIs de WhatsApp
export interface WhatsAppApi {
  id: string
  name: string
  token: string
  phone: string
  messagesPerDay: number
  monthlyCost: number
  status: "active" | "inactive" | "limited"
  createdAt: Date
  updatedAt: Date
}

// Registro Diario de Resultados
export interface DailyRecord {
  id: string
  serverId: string
  date: Date
  totalLeads: number
  totalLoads: number
  conversion: number
  adSpend: number
  totalCost: number // adSpend * Coefficient + otras variables
  createdAt: Date
  updatedAt: Date
}

// Franquicias
export interface Franchise {
  id: string
  name: string
  password: string
  cvu: string
  alias: string
  owner: string
  link: string
  createdAt: Date
  updatedAt: Date
}

// Teléfonos de Franquicias
export interface FranchisePhone {
  id: string
  franchiseId: string
  number: string
  order: number
  dailyGoal: number // Meta diaria
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

// Distribución de Leads por Franquicia
export interface LeadDistribution {
  id: string
  dailyRecordId: string
  franchiseId: string
  phoneId: string
  leadsCount: number
  date: Date
  createdAt: Date
  updatedAt: Date
}

// Pagos Adelantados de Franquicias
export interface FranchisePayment {
  id: string
  franchiseId: string
  amount: number
  date: Date
  paymentMethod: string
  description?: string
  status: "confirmed" | "pending" | "rejected"
  createdAt: Date
  updatedAt: Date
}

// Balance de Franquicias
export interface FranchiseBalance {
  id: string
  franchiseId: string
  availableFunds: number
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

// Empleados
export interface Employee {
  id: string
  name: string
  role: string
  shift: "morning" | "afternoon" | "night" | "rotating"
  account: string
  salary: number
  dayOff: string
  createdAt: Date
  updatedAt: Date
}

// Asistencia de Empleados
export interface Attendance {
  id: string
  employeeId: string
  date: Date
  hoursWorked: number
  overtime: number
  dayOffWorked: boolean
  createdAt: Date
  updatedAt: Date
}

// Financiero
export interface FinancialSummary {
  id: string
  month: string
  year: number
  totalIncome: number
  totalAdSpend: number
  totalAdministrativeExpenses: number
  totalSalaries: number
  balance: number
  franchiseDistribution: Record<string, number> // Porcentaje por franquicia
  createdAt: Date
  updatedAt: Date
}
