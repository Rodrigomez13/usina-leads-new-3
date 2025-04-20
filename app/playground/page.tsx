// app/playground/page.tsx
'use client'

import ServerSettings from '@/components/server/server-settings'

export default function PlaygroundPage() {
  const mockServer = {
    id: 'server4',
    name: 'Test Server',
    description: 'Servidor de prueba',
    Coefficient: 0.15,
    isActive: true,
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Playground</h1>
      <ServerSettings server={mockServer} onSave={(s) => console.log('Guardado', s)} />
    </div>
  )
}
