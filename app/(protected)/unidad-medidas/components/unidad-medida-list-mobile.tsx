"use client"

import { Info, Pencil, Plus, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UnidadMedida } from "../types"



interface UnidadMedidaListProps {
  unidadMedida: UnidadMedida[]
}

export default function UnidadMedidaList({ unidadMedida: unidadMedidas }: UnidadMedidaListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUnidadMedidas = unidadMedidas.filter(
    (unidadMedida) =>
      unidadMedida.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unidadMedida.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <Link href={`/unidad-medidas/create`} className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva unidad de medida
          </Button>
        </Link>
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {filteredUnidadMedidas.length > 0 ? (
          filteredUnidadMedidas.map((unidadMedida) => (
            <Card
              key={unidadMedida.id}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{unidadMedida.nombre}</h3>
                      <Badge variant={unidadMedida.activo ? "default" : "destructive"} className="text-xs">
                        {unidadMedida.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>

                    <p className="max-w-xs">{unidadMedida.descripcion || "Sin descripción"}</p>
                  </div>

                  <Link href={`/unidad-medidas/${unidadMedida.id}/edit`} className="ml-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar unidad de medida</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 bg-muted/30 rounded-lg">
            <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No se encontraron unidades de medida.</p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm ? "Intenta con otra búsqueda." : "Crea una nueva unidad de medida para comenzar."}
            </p>
          </div>
        )}
      </div>

      {filteredUnidadMedidas.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredUnidadMedidas.length} de {unidadMedidas.length} unidades de medida
        </p>
      )}
    </div>
  )
}
