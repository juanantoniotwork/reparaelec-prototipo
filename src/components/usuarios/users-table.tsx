"use client"

import { Pencil, UserX } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface User {
  id: string
  nombre: string
  email: string
  rol: "admin" | "técnico"
  estado: "activo" | "inactivo"
  ultimaConexion: string
}

interface UsersTableProps {
  users: User[]
  onEdit: (user: User) => void
  onToggleStatus: (user: User) => void
}

export function UsersTable({ users, onEdit, onToggleStatus }: UsersTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground font-semibold">Nombre</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Email</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Rol</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Estado</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Última conexión</TableHead>
            <TableHead className="text-muted-foreground font-semibold text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-border">
              <TableCell className="font-medium text-foreground">{user.nombre}</TableCell>
              <TableCell className="text-muted-foreground">{user.email}</TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "font-medium",
                    user.rol === "admin"
                      ? "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
                      : "bg-sky-500/20 text-sky-400 border-sky-500/30 hover:bg-sky-500/30"
                  )}
                  variant="outline"
                >
                  {user.rol === "admin" ? "Admin" : "Técnico"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "font-medium",
                    user.estado === "activo"
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30"
                      : "bg-zinc-500/20 text-zinc-400 border-zinc-500/30 hover:bg-zinc-500/30"
                  )}
                  variant="outline"
                >
                  {user.estado === "activo" ? "Activo" : "Inactivo"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{user.ultimaConexion}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => onEdit(user)}
                    aria-label={`Editar usuario ${user.nombre}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8",
                      user.estado === "activo"
                        ? "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        : "text-muted-foreground hover:text-emerald-400 hover:bg-emerald-500/10"
                    )}
                    onClick={() => onToggleStatus(user)}
                    aria-label={user.estado === "activo" ? `Desactivar usuario ${user.nombre}` : `Activar usuario ${user.nombre}`}
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
