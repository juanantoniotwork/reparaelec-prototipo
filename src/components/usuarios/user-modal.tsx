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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import type { User } from "@/components/users-table"

interface UserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSave: (userData: Omit<User, "id" | "ultimaConexion" | "estado"> & { password?: string }) => void
}

export function UserModal({ open, onOpenChange, user, onSave }: UserModalProps) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState<"admin" | "técnico">("técnico")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEditing = !!user

  useEffect(() => {
    if (user) {
      setNombre(user.nombre)
      setEmail(user.email)
      setRol(user.rol)
      setPassword("")
    } else {
      setNombre("")
      setEmail("")
      setPassword("")
      setRol("técnico")
    }
  }, [user, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    onSave({
      nombre,
      email,
      rol,
      ...(password && { password }),
    })
    
    setIsSubmitting(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditing ? "Editar usuario" : "Nuevo usuario"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="py-4">
            <Field>
              <FieldLabel htmlFor="nombre">Nombre completo</FieldLabel>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Juan García"
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@reparaelec.com"
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">
                Contraseña {isEditing && <span className="text-muted-foreground font-normal">(dejar vacío para no cambiar)</span>}
              </FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required={!isEditing}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="rol">Rol</FieldLabel>
              <Select value={rol} onValueChange={(value: "admin" | "técnico") => setRol(value)}>
                <SelectTrigger className="w-full bg-input border-border text-foreground focus:ring-primary">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="admin" className="text-foreground focus:bg-accent focus:text-accent-foreground">
                    Administrador
                  </SelectItem>
                  <SelectItem value="técnico" className="text-foreground focus:bg-accent focus:text-accent-foreground">
                    Técnico
                  </SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-border text-foreground hover:bg-accent"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting && <Spinner className="mr-2" />}
              {isEditing ? "Guardar cambios" : "Crear usuario"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
