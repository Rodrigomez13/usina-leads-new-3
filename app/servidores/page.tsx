'use client'

import ServerSettingsPanel from '@/components/server/server-settings-panel'

export default function ServersPage() {



  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestión de Servidores</h2>
      </div>
      <ServerSettingsPanel />
    </div>
  )
}