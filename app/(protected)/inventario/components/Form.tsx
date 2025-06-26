"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  Package,
  Warehouse,
  Hash,
  AlertTriangle,
  ArrowLeft,
  TrendingDown,
  BarChart3,
  CheckCircle,
} from "lucide-react"
import type { z } from "zod"
import { createInventario, updateInventario } from "../actions"
import { InventarioSchema } from "../schema"
import { toast } from "sonner"
import type { Producto } from "../../producto/type"
import type { Almacen } from "../../almacen/type"

export function InventarioFormulario({
  isUpdate,
  initialData,
  productos,
  almacenes,
}: {
  isUpdate: boolean
  initialData: z.infer<typeof InventarioSchema>
  productos: Producto[]
  almacenes: Almacen[]
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof InventarioSchema>>({
    resolver: zodResolver(InventarioSchema),
    defaultValues: initialData,
  })

  async function onSubmit(data: z.infer<typeof InventarioSchema>) {
    const almacenData = {
      inventario: data,
    }

    const promise = async () => {
      if (isUpdate) {
        await updateInventario(almacenData.inventario.id!, almacenData.inventario)
        return { name: "Actualización" }
      } else {
        await createInventario(almacenData.inventario)
        return { name: "Creación" }
      }
    }

    try {
      await toast.promise(promise, {
        loading: "Guardando...",
        success: (data) => `${data.name} exitosa`,
        error: "Error al guardar el inventario",
      })

      router.push("/inventario")
      router.refresh()
    } catch (error) {
      console.error("Error en la operación:", error)
      toast.error("Error al Guardar", {
        description: isUpdate ? "No se pudo actualizar el inventario." : "No se pudo crear el inventario.",
      })
    }
  }

  // Watch form values for dynamic feedback
  const watchedCantidad = form.watch("cantidad")
  const watchedStockMinimo = form.watch("stock_minimo")
  const watchedProducto = form.watch("producto_id")
  const watchedAlmacen = form.watch("almacen_id")

  const selectedProducto = productos.find((p) => p.id === watchedProducto)
  const selectedAlmacen = almacenes.find((a) => a.id === watchedAlmacen)

  // Check if stock is below minimum
  const isLowStock = watchedCantidad && watchedStockMinimo && Number(watchedCantidad) < Number(watchedStockMinimo)

  return (
    <div className=" mx-auto space-y-8">
      {/* Header Section */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Selección de Producto y Almacén */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Información del Producto
              </CardTitle>
              <CardDescription>Selecciona el producto y el almacén donde se encuentra</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Producto */}
                <FormField
                  control={form.control}
                  name="producto_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Producto</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona el producto" />
                          </SelectTrigger>
                          <SelectContent>
                            {productos.map((producto) => (
                              <SelectItem key={producto.id} value={producto.id!}>
                                <div className="flex items-center gap-2">
                                  <Package className="h-4 w-4 text-muted-foreground" />
                                  <div className="flex flex-col">
                                    <span>{producto.nombre}</span>
                                    <span className="text-xs text-muted-foreground font-mono">{producto.sku}</span>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Selecciona el producto para registrar en inventario</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Almacén */}
                <FormField
                  control={form.control}
                  name="almacen_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Almacén</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona el almacén" />
                          </SelectTrigger>
                          <SelectContent>
                            {almacenes.map((almacen) => (
                              <SelectItem key={almacen.id} value={almacen.id!}>
                                <div className="flex items-center gap-2">
                                  <Warehouse className="h-4 w-4 text-muted-foreground" />
                                  <span>{almacen.nombre}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Selecciona el almacén donde se encuentra el producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preview de selección */}
              {selectedProducto && selectedAlmacen && (
                <>
                  <Separator />
                  <div className="p-4  rounded-lg border ">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 " />
                      <span className="text-sm font-medium ">Registro Seleccionado</span>
                    </div>
                    <div className="text-sm ">
                      <strong>{selectedProducto.nombre}</strong> en <strong>{selectedAlmacen.nombre}</strong>
                    </div>
                    <div className="text-xs  mt-1">SKU: {selectedProducto.sku}</div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Gestión de Stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Gestión de Stock
              </CardTitle>
              <CardDescription>Define las cantidades actuales y los niveles mínimos de stock</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Cantidad Actual */}
                <FormField
                  control={form.control}
                  name="cantidad"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Cantidad Actual</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="0"
                            type="number"
                            min="0"
                            step="1"
                            className="h-12 pl-10 font-mono text-lg"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Cantidad actual disponible en el almacén</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stock Mínimo */}
                <FormField
                  control={form.control}
                  name="stock_minimo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Stock Mínimo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <TrendingDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="0"
                            type="number"
                            min="0"
                            step="1"
                            className="h-12 pl-10 font-mono text-lg"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Nivel mínimo antes de requerir reabastecimiento</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Alerta de Stock Bajo */}
              {isLowStock && (
                <>
                  <Separator />
                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>¡Atención!</strong> La cantidad actual ({watchedCantidad}) está por debajo del stock
                      mínimo ({watchedStockMinimo}). Se recomienda reabastecer este producto.
                    </AlertDescription>
                  </Alert>
                </>
              )}

              {/* Indicadores de Stock */}
              {watchedCantidad && watchedStockMinimo && (
                <>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">{watchedCantidad}</div>
                      <div className="text-xs text-muted-foreground">Cantidad Actual</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary mb-1">{watchedStockMinimo}</div>
                      <div className="text-xs text-muted-foreground">Stock Mínimo</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className={`text-2xl font-bold mb-1 ${isLowStock ? "text-red-600" : "text-green-600"}`}>
                        {isLowStock ? "BAJO" : "OK"}
                      </div>
                      <div className="text-xs text-muted-foreground">Estado del Stock</div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="button" variant="outline" className="h-12 px-8 bg-transparent" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-12 px-8 bg-primary hover:bg-primary/90"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : isUpdate ? (
                "Actualizar Inventario"
              ) : (
                "Crear Registro"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
