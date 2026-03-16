"use client"

import { useState } from "react"
import { Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UsersTable, type User } from "@/components/usuarios/users-table"
import { UserModal } from "@/components/usuarios/user-modal"

const MOCK_USERS: User[] = [
  {
    id: "1",
    nombre: "Juan Pérez",
    email: "juan.perez@reparaelec.com",
    rol: "admin",
    estado: "activo",
    ultimaConexion: "Hace 5 minutos",
  },
  {
    id: "2",
    nombre: "María García",
    email: "m.garcia@reparaelec.com",
    rol: "técnico",
    estado: "activo",
    ultimaConexion: "Hace 2 horas",
  },
  {
    id: "3",
    nombre: "Carlos Rodríguez",
    email: "c.rodriguez@reparaelec.com",
    rol: "técnico",
    estado: "inactivo",
    ultimaConexion: "Hace 3 días",
  },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleEdit = (user: User) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedUser(null)
    setIsModalOpen(true)
  }

  const handleToggleStatus = (user: User) => {
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, estado: u.estado === "activo" ? "inactivo" : "activo" } 
        : u
    ))
  }

  const handleSave = (userData: any) => {
    if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id ? { ...u, ...userData } : u
      ))
    } else {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        estado: "activo",
        ultimaConexion: "Recién creado",
      }
      setUsers([...users, newUser])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col flex-1 bg-slate-50/50 dark:bg-slate-950/50">
      <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-lg font-semibold text-foreground">Gestión de Usuarios</h1>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Usuario
        </Button>
      </header>
      
      <main className="flex-1 p-6">
        <UsersTable 
          users={users} 
          onEdit={handleEdit} 
          onToggleStatus={handleToggleStatus} 
        />
      </main>

      <UserModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        user={selectedUser}
        onSave={handleSave}
      />
    </div>
  )
}
