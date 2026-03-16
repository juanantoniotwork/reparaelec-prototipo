"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Wrench,
  Zap,
  Thermometer,
  Droplets,
  Wind,
  type LucideIcon,
} from "lucide-react"

const iconOptions: { value: string; icon: LucideIcon; label: string }[] = [
  { value: "wrench", icon: Wrench, label: "Herramienta" },
  { value: "zap", icon: Zap, label: "Eléctrico" },
  { value: "thermometer", icon: Thermometer, label: "Temperatura" },
  { value: "droplets", icon: Droplets, label: "Agua" },
  { value: "wind", icon: Wind, label: "Ventilación" },
]

interface Category {
  id: string
  name: string
  iconValue: string
}

interface CategoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category?: Category | null
  onSave: (data: { name: string; iconValue: string }) => void
}

export function CategoryModal({
  open,
  onOpenChange,
  category,
  onSave,
}: CategoryModalProps) {
  const [name, setName] = useState("")
  const [selectedIcon, setSelectedIcon] = useState("wrench")

  useEffect(() => {
    if (category) {
      setName(category.name)
      setSelectedIcon(category.iconValue)
    } else {
      setName("")
      setSelectedIcon("wrench")
    }
  }, [category, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onSave({ name: name.trim(), iconValue: selectedIcon })
      onOpenChange(false)
    }
  }

  const isEditing = !!category

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? "Editar categoría" : "Nueva categoría"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Nombre
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la categoría"
              className="bg-background border-border text-foreground"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">Icono</Label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSelectedIcon(value)}
                  className={cn(
                    "flex h-14 flex-col items-center justify-center gap-1 rounded-lg border transition-colors",
                    selectedIcon === value
                      ? "border-amber-500 bg-amber-500/10 text-amber-500"
                      : "border-border bg-background text-muted-foreground hover:border-amber-500/50 hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border text-foreground"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-amber-500 text-black hover:bg-amber-400"
              disabled={!name.trim()}
            >
              {isEditing ? "Guardar cambios" : "Crear categoría"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { iconOptions }
