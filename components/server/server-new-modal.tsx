'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { Server } from '@/lib/types'

interface NewServerModalProps {
  open: boolean
  onClose: () => void
  onCreate: (server: Omit<Server, 'id'>) => void
}

export function NewServerModal({ open, onClose, onCreate }: NewServerModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cofficient, setCoefficient] = useState(0)

  const handleCreate = () => {
    if (!name || !description) return

    onCreate({
      name,
      description,
      coefficient: cofficient,
      is_active: false,
    })

    setName('')
    setDescription('')
    setCoefficient(0)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Servidor</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
          <Input
            placeholder="Coeficiente de Impuesto"
            type="number"
            value={cofficient}
            onChange={(e) => setCoefficient(parseFloat(e.target.value))}
          />
          <Button onClick={handleCreate} disabled={!name || !description}>
            Crear Servidor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
