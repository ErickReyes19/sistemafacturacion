"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatLempiras } from "@/lib/utils"
import { CalendarDays, Building2, User, Package, Phone, Mail, Check } from "lucide-react"
import { useTransition } from "react"
import { updateEstadoYInventario } from "../actions" // Ajusta la ruta según tu estructura

// Tipos basados en tu estructura
interface Proveedor {
  id: string
  nombre: string
  email: string
  telefono: string
  direccion: string
  activo: boolean
}

interface Empleado {
  id: string
  nombre: string
  apellido: string
  correo: string
  numeroIdentificacion: string
  genero: string
  activo: boolean
  puesto_id: string
  puesto: string
}

interface Moneda {
  id: string
  codigo: string
  nombre: string
  simbolo: string
  activo: boolean
  creado_at?: Date
}

interface Almacen {
  id: string
  nombre: string
  activo: boolean
  creado_at?: Date
  sucursalId: string
  sucursal: string
}

interface DetalleOrdenCompra {
  id: string
  producto_id: string
  producto_nombre: string
  unidad_medida_id: string
  unidad_medida_nombre: string
  cantidad: number
  precio_unitario: number
  subtotal: number
}

interface OrdenCompra {
  id: string
  fecha_orden: Date
  estado: string
  total: number
  observaciones?: string
  proveedor: Proveedor
  empleado: Empleado
  moneda: Moneda
  almacen: Almacen
  detalle: DetalleOrdenCompra[]
  devoluciones?: any[]
}

interface OrdenCompraDetailsProps {
  ordenCompra: OrdenCompra
}

export function OrdenCompraDetails({ ordenCompra }: OrdenCompraDetailsProps) {
  const [isPending, startTransition] = useTransition()

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  const getEstadoBadgeVariant = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "secondary"
      case "aprobada":
        return "default"
      case "completada":
        return "default"
      case "cancelada":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const handleAprobar = () => {
    startTransition(async () => {
      try {
        await updateEstadoYInventario(ordenCompra.id, "aprobada")
        // Opcional: mostrar un toast de éxito o recargar la página
        window.location.reload()
      } catch (error) {
        console.error("Error al aprobar la orden:", error)
        // Opcional: mostrar un toast de error
      }
    })
  }

  const puedeAprobar = ordenCompra.estado.toLowerCase() === "pendiente"

  return (
    <div className="space-y-6">
      {/* Header de la Orden */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Orden de Compra</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <CalendarDays className="h-4 w-4" />
                {formatDate(ordenCompra.fecha_orden)}
              </CardDescription>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={getEstadoBadgeVariant(ordenCompra.estado)}>{ordenCompra.estado}</Badge>
                {puedeAprobar && (
                  <Button
                    onClick={handleAprobar}
                    disabled={isPending}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Aprobando...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Aprobado
                      </>
                    )}
                  </Button>
                )}
              </div>
              <div className="text-2xl font-bold">{formatLempiras(ordenCompra.total)}</div>
            </div>
          </div>
        </CardHeader>
        {ordenCompra.observaciones && (
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Observaciones</h4>
              <p className="text-sm text-muted-foreground">{ordenCompra.observaciones}</p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Información General */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Proveedor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Proveedor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium">{ordenCompra.proveedor.nombre}</h4>
            </div>
            <Separator />
            <div className="space-y-2">
              {ordenCompra.proveedor.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{ordenCompra.proveedor.email}</span>
                </div>
              )}
              {ordenCompra.proveedor.telefono && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{ordenCompra.proveedor.telefono}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Empleado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Empleado Responsable
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium">
                {ordenCompra.empleado.nombre} {ordenCompra.empleado.apellido}
              </h4>
              <p className="text-sm text-muted-foreground">{ordenCompra.empleado.puesto}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{ordenCompra.empleado.correo}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detalle de Productos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalle de Productos
          </CardTitle>
          <CardDescription>
            {ordenCompra.detalle.length} producto{ordenCompra.detalle.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Presentacion</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Precio Unitario</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordenCompra.detalle.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.producto_nombre}</TableCell>
                  <TableCell>{item.unidad_medida_nombre}</TableCell>
                  <TableCell className="text-right">{item.cantidad}</TableCell>
                  <TableCell className="text-right">{formatLempiras(item.precio_unitario)}</TableCell>
                  <TableCell className="text-right font-medium">{formatLempiras(item.subtotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Total */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-lg font-semibold">Total: {formatLempiras(ordenCompra.total)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
