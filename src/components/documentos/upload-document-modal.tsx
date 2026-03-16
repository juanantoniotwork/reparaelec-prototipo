"use client"

import { useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Upload, FileText, File, X } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "caldera", label: "Caldera", color: "bg-orange-500" },
  { id: "lavadora", label: "Lavadora", color: "bg-blue-500" },
  { id: "frigorifico", label: "Frigorífico", color: "bg-cyan-500" },
  { id: "lavavajillas", label: "Lavavajillas", color: "bg-emerald-500" },
  { id: "horno", label: "Horno", color: "bg-red-500" },
  { id: "microondas", label: "Microondas", color: "bg-purple-500" },
]

interface UploadDocumentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function getFileIcon(fileName: string) {
  const ext = fileName.split(".").pop()?.toLowerCase()
  if (ext === "pdf") {
    return (
      <div className="flex size-12 items-center justify-center rounded-lg bg-red-500/20">
        <FileText className="size-6 text-red-400" />
      </div>
    )
  }
  if (ext === "doc" || ext === "docx") {
    return (
      <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/20">
        <File className="size-6 text-blue-400" />
      </div>
    )
  }
  return (
    <div className="flex size-12 items-center justify-center rounded-lg bg-muted">
      <File className="size-6 text-muted-foreground" />
    </div>
  )
}

export function UploadDocumentModal({
  open,
  onOpenChange,
}: UploadDocumentModalProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleUpload = () => {
    // Handle upload logic here
    console.log("Uploading:", selectedFile, "Categories:", selectedCategories)
    onOpenChange(false)
    setSelectedFile(null)
    setSelectedCategories([])
  }

  const removeFile = () => {
    setSelectedFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Subir documento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Drag and Drop Area */}
          <div
            className={cn(
              "relative rounded-lg border-2 border-dashed transition-colors",
              dragActive
                ? "border-amber-500 bg-amber-500/10"
                : "border-border hover:border-muted-foreground/50",
              selectedFile && "border-solid border-border"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {selectedFile ? (
              <div className="flex items-center gap-4 p-4">
                {getFileIcon(selectedFile.name)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="shrink-0"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-8 cursor-pointer">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted mb-4">
                  <Upload className="size-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Arrastra y suelta tu archivo aquí
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  o haz clic para seleccionar
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-2.5 py-1">
                    <FileText className="size-3 text-red-400" />
                    <span className="text-red-400">PDF</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-blue-500/20 px-2.5 py-1">
                    <File className="size-3 text-blue-400" />
                    <span className="text-blue-400">Word</span>
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>

          {/* Category Multi-Select */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Categorías</Label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                    selectedCategories.includes(category.id)
                      ? "border-amber-500 bg-amber-500/10"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <div className="flex items-center gap-2">
                    <div className={cn("size-2.5 rounded-full", category.color)} />
                    <span className="text-sm text-foreground">{category.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || selectedCategories.length === 0}
            className="bg-amber-500 text-background hover:bg-amber-600"
          >
            <Upload className="size-4" />
            Subir documento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
