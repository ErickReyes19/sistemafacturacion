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
import { Loader2, Package, DollarSign, Settings, Tag } from "lucide-react"
import type { z } from "zod"
import { createProducto, updateProducto } from "../actions"
import { ProductoSchema } from "../schema"
import { toast } from "sonner"
import type { UnidadMedida } from "../../unidad-medidas/types"
import type { Categoria } from "../../categorias/type"
import type { Moneda } from "../../monedas/type"
import type { Impuesto } from "../../impuestos/type"

export function ProductoFormulario({
  isUpdate,
  initialData,
  unidadMedidas,
  categorias,
  monedas,
  impuestos,
}: {
  isUpdate: boolean
  initialData: z.infer<typeof ProductoSchema>
  unidadMedidas: UnidadMedida[]
  categorias: Categoria[]
  monedas: Moneda[]
  impuestos: Impuesto[]
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof ProductoSchema>>({
    resolver: zodResolver(ProductoSchema),
    defaultValues: initialData,
  })

  async function onSubmit(data: z.infer<typeof ProductoSchema>) {
    const productoData = {
      producto: data,
    }

    const promise = async () => {
      if (isUpdate) {
        await updateProducto(productoData.producto.id!, productoData.producto)
        return { name: "Actualización" }
      } else {
        await createProducto(productoData.producto)
        return { name: "Creación" }
      }
    }

    try {
      await toast.promise(promise, {
        loading: "Guardando...",
        success: (data) => `${data.name} exitosa`,
        error: "Error al guardar el producto",
      })

      router.push("/producto")
      router.refresh()
    } catch (error) {
      console.error("Error en la operación:", error)
      toast.error("Error al Guardar", {
        description: isUpdate ? "No se pudo actualizar el producto." : "No se pudo crear el producto.",
      })
    }
  }

  return (
    <div className=" mx-auto  space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Información Básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Información Básica
              </CardTitle>
              <CardDescription>Datos principales del producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-base font-semibold">Nombre del Producto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Laptop Dell Inspiron 15" className="h-11" {...field} />
                      </FormControl>
                      <FormDescription>Ingresa un nombre descriptivo y único para el producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-base font-semibold">Descripción</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej: Laptop con procesador Intel Core i7, 16GB RAM, 512GB SSD"
                          className="h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Descripción detallada del producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: DELL-INS-15-001" className="h-11 font-mono" {...field} />
                      </FormControl>
                      <FormDescription>Código único de identificación</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unidad_medida_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Unidad de Medida</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona la unidad" />
                          </SelectTrigger>
                          <SelectContent>
                            {unidadMedidas.map((um) => (
                              <SelectItem key={um.id!} value={um.id!}>
                                {um.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Categorización */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Categorización y Configuración
              </CardTitle>
              <CardDescription>Clasificación y configuración fiscal del producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="categoria_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Categoría</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona la categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categorias.map((cat) => (
                              <SelectItem key={cat.id!} value={cat.id!}>
                                {cat.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="moneda_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Moneda</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona la moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            {monedas.map((mon) => (
                              <SelectItem key={mon.id!} value={mon.id!}>
                                {mon.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impuesto_id"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-base font-semibold">Impuesto</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona el tipo de impuesto" />
                          </SelectTrigger>
                          <SelectContent>
                            {impuestos.map((imp) => (
                              <SelectItem key={imp.id!} value={imp.id!}>
                                {imp.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Precios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Información de Precios
              </CardTitle>
              <CardDescription>Define los precios de compra y venta del producto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="precio_compra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Precio de Compra</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-11 pl-10 font-mono"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Precio al que adquieres el producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="precio_venta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Precio de Venta</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-11 pl-10 font-mono"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Precio al que vendes el producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Margen de ganancia calculado */}
              {form.watch("precio_compra") && form.watch("precio_venta") && (
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Margen de Ganancia:</span>
                    <span className="text-lg font-bold text-green-600">
                      {(
                        ((Number(form.watch("precio_venta")) - Number(form.watch("precio_compra"))) /
                          Number(form.watch("precio_compra"))) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Ganancia por unidad:</span>
                    <span className="text-sm font-medium">
                      L {(Number(form.watch("precio_venta")) - Number(form.watch("precio_compra"))).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Estado (solo para actualización) */}
          {isUpdate && (
            <Card>
              <CardHeader>
                <CardTitle>Estado del Producto</CardTitle>
                <CardDescription>Controla la disponibilidad del producto en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="activo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">Estado</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value === "true")}
                          defaultValue={field.value ? "true" : "false"}
                        >
                          <SelectTrigger className="h-11 max-w-xs">
                            <SelectValue placeholder="Selecciona el estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Activo
                              </div>
                            </SelectItem>
                            <SelectItem value="false">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                Inactivo
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Los productos inactivos no aparecerán en las listas de selección
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="button" variant="outline" className="h-11 px-8" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-11 px-8 bg-primary hover:bg-primary/90"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : isUpdate ? (
                "Actualizar Producto"
              ) : (
                "Crear Producto"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
