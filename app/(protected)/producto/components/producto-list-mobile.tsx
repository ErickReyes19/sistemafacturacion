"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Pencil, Plus, Search, Package } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Producto } from "../type"

interface ProductoListProps {
  producto: Producto[]
}

export default function ProductoListMobile({ producto }: ProductoListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProductos = producto.filter(
    (producto) =>
      producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.sku?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Productos</h1>
      </div>

      {/* Botón para crear un nuevo producto */}
      <Link href="/producto/create" className="w-full">
        <Button className="w-full flex items-center justify-center gap-2 h-12">
          <Plus className="h-5 w-5" />
          Nuevo Producto
        </Button>
      </Link>

      {/* Input de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar por nombre o SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Listado de productos */}
      <div className="space-y-3">
        {filteredProductos.map((producto) => (
          <div key={producto.id} className="bg-card border rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 space-y-2">
                {/* Status y nombre */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      producto.activo !== false ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <h3 className="font-semibold text-base truncate">{producto.nombre}</h3>
                </div>

                {/* SKU */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">SKU:</span>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{producto.sku}</span>
                </div>

                {/* Información adicional */}
                <div className="flex flex-wrap gap-2">
                  {producto.categoria && (
                    <Badge variant="secondary" className="text-xs">
                      {producto.categoria}
                    </Badge>
                  )}
                  {producto.unidadBase && (
                    <Badge variant="outline" className="text-xs">
                      {producto.unidadBase}
                    </Badge>
                  )}
                </div>

                {/* Precio de venta */}
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Precio:</span>
                  <span className="text-sm font-semibold text-green-600">
                    {producto.precio_venta.toLocaleString("es-ES" , { minimumFractionDigits: 2 })}
                    {producto.moneda && <span className="text-xs text-muted-foreground ml-1">{producto.moneda}</span>}
                  </span>
                </div>

                {/* Descripción (si existe) */}
                {producto.descripcion && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{producto.descripcion}</p>
                )}
              </div>

              {/* Botón de editar */}
              <div className="flex-shrink-0 ml-3">
                <Link href={`/producto/${producto.id}/edit`}>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estados vacíos y contadores */}
      {filteredProductos.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No se encontraron productos.</p>
          <p className="text-sm text-muted-foreground">Intenta con otros términos de búsqueda.</p>
        </div>
      )}

      {filteredProductos.length === 0 && !searchTerm && (
        <div className="text-center py-8">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No hay productos registrados.</p>
          <Link href="/producto/create">
            <Button className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Crear primer producto
            </Button>
          </Link>
        </div>
      )}

      {filteredProductos.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredProductos.length} de {producto.length} productos
          </p>
        </div>
      )}
    </div>
  )
}
