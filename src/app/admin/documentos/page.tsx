"use client"

import { useState } from "react"
import { Plus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentsTable } from "@/components/documentos/documents-table"
import { UploadDocumentModal } from "@/components/documentos/upload-document-modal"

const MOCK_DOCUMENTS: any[] = [
  {
    id: "1",
    nombre: "Manual_Servicio_Caldera_X100.pdf",
    categorias: ["Caldera"],
    estado: "procesado",
    fechaSubida: "2026-03-10",
  },
  {
    id: "2",
    nombre: "Esquema_Electrico_Lavadora_L20.pdf",
    categorias: ["Lavadora"],
    estado: "procesando",
    fechaSubida: "2026-03-15",
  },
  {
    id: "3",
    nombre: "Guia_Mantenimiento_Frigo_F50.pdf",
    categorias: ["Frigorífico"],
    estado: "error",
    fechaSubida: "2026-03-14",
  },
]

export default function DocumentosPage() {
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUpload = () => {
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  return (
    <div className="flex flex-col flex-1 bg-slate-50/50 dark:bg-slate-950/50">
      <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h1 className="text-lg font-semibold text-foreground">Documentos Técnicos</h1>
        </div>
        <Button onClick={handleUpload} className="gap-2">
          <Plus className="h-4 w-4" />
          Subir Documento
        </Button>
      </header>
      
      <main className="flex-1 p-6">
        <DocumentsTable 
          documents={documents} 
          onDelete={handleDelete}
        />
      </main>

      <UploadDocumentModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  )
}
