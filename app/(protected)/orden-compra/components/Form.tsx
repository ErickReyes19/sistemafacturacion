"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Trash2, Package, Calculator } from "lucide-react"
import type { z } from "zod"
import { OrdenCompraSchema } from "../schema"
import { toast } from "sonner"
import { createOrdenCompra, updateOrdenCompra } from "../actions"
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react"

export function OrdenCompraFormulario({
  isUpdate,
  initialData,
  proveedores,
  almacenes,
  monedas,
  productos,
}: {
  isUpdate: boolean
  initialData?: z.infer<typeof OrdenCompraSchema>
  proveedores: any[]
  almacenes: any[]
  monedas: any[]
  productos: any[]
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof OrdenCompraSchema>>({
    resolver: zodResolver(OrdenCompraSchema),
    defaultValues: initialData || {
      proveedor_id: "",
      almacen_id: "",
      moneda_id: "",
      estado: "pendiente", // Estado fijo en pendiente
      fecha_orden: new Date(),
      total: 0,
      detalle: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "detalle",
  })




  async function onSubmit(data: z.infer<typeof OrdenCompraSchema>) {
    const safeDetalle = Array.isArray(data.detalle) ? data.detalle : []

    // Calcular y agregar el subtotal a cada detalle
    const detalleConSubtotal = safeDetalle.map((d) => {
      const prod = productos.find((p) => p.id === d.producto_id)
      const unidad = prod?.unidades?.find((u: { unidad_medida_id: string }) => u.unidad_medida_id === d.unidad_medida_id)
      const factor = unidad?.factor ?? 1
      const subtotal = d.cantidad * d.precio_unitario * factor
      return { ...d, subtotal }
    })

    const promise = async () => {
      if (isUpdate) {
        await updateOrdenCompra(data.id!, { ...data, detalle: detalleConSubtotal })
        return { name: "Actualización" }
      } else {
        await createOrdenCompra({ ...data, detalle: detalleConSubtotal })
        return { name: "Creación" }
      }
    }

    try {
      await toast.promise(promise, {
        loading: "Guardando orden de compra...",
        success: (data) => `${data.name} exitosa`,
        error: "Error al guardar la orden de compra",
      })
      router.push("/orden-compra")
      router.refresh()
    } catch (error) {
      toast.error("Error al Guardar", {
        description: isUpdate ? "No se pudo actualizar la orden." : "No se pudo crear la orden.",
      })
    }
  }

  // Sincronizar precio_compra al seleccionar producto
  useEffect(() => {
    fields.forEach((field, idx) => {
      const prodId = form.watch(`detalle.${idx}.producto_id`)
      const selectedProduct = productos.find((p) => p.id === prodId)
      const currentPrice = form.getValues(`detalle.${idx}.precio_unitario`)

      if (selectedProduct && (currentPrice === 0 || currentPrice === undefined)) {
        form.setValue(`detalle.${idx}.precio_unitario`, selectedProduct.precio_compra || 0)
      }
    })
  },)

  const detalle = form.watch("detalle") || []
  const totalOrden = detalle.reduce((acc, d) => {
    // Busca el factor en tu lista de productos
    const prod = productos.find(p => p.id === d.producto_id)
    const unidad = prod?.unidades?.find((u: { unidad_medida_id: string }) => u.unidad_medida_id === d.unidad_medida_id)
    const factor = unidad?.factor ?? 1

    return acc + d.cantidad * d.precio_unitario * factor
  }, 0)

  useEffect(() => {
    form.setValue("total", totalOrden, { shouldValidate: true })
  }, [totalOrden, form])

  return (
    <div className=" mx-auto space-y-6">


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Información General */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Información General
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Proveedor */}
                <FormField
                  control={form.control}
                  name="proveedor_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Proveedor *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona un proveedor" />
                          </SelectTrigger>
                          <SelectContent>
                            {proveedores.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Proveedor que suministrará los productos</FormDescription>
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
                      <FormLabel className="text-sm font-medium">Almacén *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona un almacén" />
                          </SelectTrigger>
                          <SelectContent>
                            {almacenes.map((a) => (
                              <SelectItem key={a.id} value={a.id}>
                                {a.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Almacén donde se recibirán los productos</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Moneda */}
                <FormField
                  control={form.control}
                  name="moneda_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Moneda *</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Selecciona una moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            {monedas.map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.nombre} {m.simbolo && `(${m.simbolo})`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Moneda para los precios de la orden</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Fecha de orden */}
                <FormField
                  control={form.control}
                  name="fecha_orden"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Fecha de Orden *</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="h-11"
                          value={field.value ? new Date(field.value).toISOString().substring(0, 10) : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>Fecha de creación de la orden</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Estado (oculto pero visible para referencia) */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Estado:</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Pendiente
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detalles de la orden */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Productos de la Orden
                </CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      id: "",
                      producto_id: "",
                      unidad_medida_id: "",
                      cantidad: 1,
                      precio_unitario: 0,
                      subtotal: 0,
                      orden_compra_id: initialData?.id || "",
                    })
                  }
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Agregar Producto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No hay productos agregados</p>
                    <p className="text-sm">Haz clic en &quot;Agregar Producto&quot; para comenzar</p>
                  </div>
                )}

                {fields.map((field, idx) => {
                  // Obtén el producto seleccionado y sus unidades
                  const prodId = form.watch(`detalle.${idx}.producto_id`);
                  const selectedProduct = productos.find((p) => p.id === prodId);

                  // Obtén la unidad seleccionada y calcula el stock según su factor
                  const uniId = form.watch(`detalle.${idx}.unidad_medida_id`);
                  const selectedUnidad = selectedProduct?.unidades?.find(
                    (u: { unidad_medida_id: string }) => u.unidad_medida_id === uniId
                  );
                  const cantidad = form.watch(`detalle.${idx}.cantidad`) || 0;
                  const unidadesInventario = selectedUnidad
                    ? cantidad * selectedUnidad.factor
                    : cantidad;

                  // Calcula el subtotal
                  const precioUnitario = form.watch(`detalle.${idx}.precio_unitario`) || 0
                  const factor = selectedUnidad?.factor ?? 1

                  // Cálculo real: precioBase × factor × cantidad
                  const subtotal = cantidad * precioUnitario * factor

                  return (
                    <Card key={field.id} className="border-l-4 border-l-primary/20">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                          {/* Producto */}
                          <FormField
                            control={form.control}
                            name={`detalle.${idx}.producto_id`}
                            render={({ field: prodField }) => (
                              <FormItem className="col-span-4">
                                <FormLabel className="text-sm font-medium">Producto *</FormLabel>
                                <FormControl>
                                  <Select
                                    value={prodField.value}
                                    onValueChange={(value) => {
                                      prodField.onChange(value);
                                      // Al cambiar producto, setea precio_unitario, limpia unidad y cantidad
                                      const selectedProduct = productos.find((p) => p.id === value);
                                      form.setValue(`detalle.${idx}.precio_unitario`, selectedProduct?.precio_compra || 0);
                                      form.setValue(`detalle.${idx}.unidad_medida_id`, "");
                                      form.setValue(`detalle.${idx}.cantidad`, 1);
                                    }}
                                  >
                                    <SelectTrigger className="h-11">
                                      <SelectValue placeholder="Selecciona producto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {productos.map((p) => (
                                        <SelectItem key={p.id} value={p.id}>
                                          {p.nombre}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Unidad de medida */}
                          <FormField
                            control={form.control}
                            name={`detalle.${idx}.unidad_medida_id`}
                            render={({ field: uniField }) => (
                              <FormItem className="col-span-2">
                                <FormLabel className="text-sm font-medium">Unidad *</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={uniField.onChange}
                                    value={uniField.value}
                                  >
                                    <SelectTrigger className="h-11">
                                      <SelectValue placeholder="Unidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {selectedProduct?.unidades?.map((u: { unidad_medida_id: Key | null | undefined; unidadMedida: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; factor: number }) => (
                                        <SelectItem
                                          key={String(u.unidad_medida_id)}
                                          value={String(u.unidad_medida_id)}
                                        >
                                          {u.unidadMedida}{" "}
                                          {u.factor > 1 && `(×${u.factor})`}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Cantidad */}
                          <FormField
                            control={form.control}
                            name={`detalle.${idx}.cantidad`}
                            render={({ field: cantField }) => (
                              <FormItem className="col-span-2">
                                <FormLabel className="text-sm font-medium">Cantidad *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={1}
                                    className="h-11"
                                    {...cantField}
                                    onChange={(e) =>
                                      cantField.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Precio unitario */}
                          <FormField
                            control={form.control}
                            name={`detalle.${idx}.precio_unitario`}
                            render={({ field: precioField }) => (
                              <FormItem className="col-span-2">
                                <FormLabel className="text-sm font-medium">
                                  Precio Unit. *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min={0}
                                    step={0.01}
                                    className="h-11"
                                    {...precioField}
                                    onChange={(e) =>
                                      precioField.onChange(Number(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Subtotal */}
                          <div className="col-span-1">
                            <FormLabel className="text-sm font-medium">Subtotal</FormLabel>
                            <div className="h-11 px-3 py-2 bg-muted rounded-md flex items-center justify-end font-medium">
                              {subtotal.toFixed(2)}
                            </div>
                            
                          </div>

                          {/* Eliminar */}
                          <div className="col-span-1 flex justify-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10 h-11 w-11"
                              onClick={() => remove(idx)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Información adicional del factor */}
                        {selectedUnidad && cantidad > 0 && (
                          <div className="mt-4 p-3  rounded-lg border ">
                            <div className="flex items-center gap-2 text-sm">
                              <Calculator className="h-4 w-4 " />
                              <span className="font-medium ">
                                Cálculo de inventario:
                              </span>
                              <span className="">
                                {cantidad} × {selectedUnidad.factor} ={" "}
                                {unidadesInventario} unidades en inventario
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}

              </div>
            </CardContent>
          </Card>

          {/* Resumen Total */}
          {fields.length > 0 && (
            <Card className="border-2 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total de la orden</p>
                    <p className="text-sm text-muted-foreground">{fields.length} producto(s) agregado(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{totalOrden.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      {monedas.find((m) => m.id === form.watch("moneda_id"))?.simbolo || ""}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={form.formState.isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || fields.length === 0}
              className="min-w-[120px]"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : isUpdate ? (
                "Actualizar Orden"
              ) : (
                "Crear Orden"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
