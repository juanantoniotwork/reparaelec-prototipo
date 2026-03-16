"use client"

import { useState } from "react"
import { Plus, FolderTree, Wrench, Zap, Thermometer, Droplets, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/categorias/category-card"
import { CategoryModal, iconOptions } from "@/components/categorias/category-modal"

const MOCK_CATEGORIES = [
  { id: "1", name: "Línea Blanca", iconValue: "wrench", documentsCount: 12, queriesCount: 145 },
  { id: "2", name: "Electrónica", iconValue: "zap", documentsCount: 8, queriesCount: 89 },
  { id: "3", name: "Climatización", iconValue: "wind", documentsCount: 15, queriesCount: 210 },
  { id: "4", name: "Pequeño Electrodoméstico", iconValue: "wrench", documentsCount: 20, queriesCount: 320 },
]

const iconMap: Record<string, any> = {
  wrench: Wrench,
  zap: Zap,
  thermometer: Thermometer,
  droplets: Droplets,
  wind: Wind,
}

export default function CategoriasPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const handleCreate = () => {
    setSelectedCategory(null)
    setIsModalOpen(true)
  }

  const handleEdit = (category: any) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const handleSave = (data: { name: string; iconValue: string }) => {
    if (selectedCategory) {
      setCategories(categories.map(c => 
        c.id === selectedCategory.id ? { ...c, ...data } : c
      ))
    } else {
      const newCategory = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        documentsCount: 0,
        queriesCount: 0
      }
      setCategories([...categories, newCategory])
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-slate-50/50 dark:bg-slate-950/50">
      <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
        <div className="flex items-center gap-2">
          <FolderTree className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-lg font-semibold text-foreground">Categorías</h1>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </Button>
      </header>
      
      <main className="flex-1 p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon={iconMap[category.iconValue] || Wrench}
              documentsCount={category.documentsCount}
              queriesCount={category.queriesCount}
              onEdit={() => handleEdit(category)}
              onDelete={() => handleDelete(category.id)}
            />
          ))}
        </div>
      </main>

      <CategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={selectedCategory}
        onSave={handleSave}
      />
    </div>
  )
}
