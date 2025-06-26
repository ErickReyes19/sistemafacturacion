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
import { Loader2, Package, Scale, Hash, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

import { ProductoUnidadSchema } from "../schema"
import type { ProductoUnidad } from "../type"
import { createPresentacion, updatePresentacion } from "../action"
import type { UnidadMedida } from "@/app/(protected)/unidad-medidas/types"

export function PresentacionFormulario({
  isUpdate,
  initialData,
  productoId,
  unidadMedidas,
}: {
  isUpdate: boolean
  initialData: ProductoUnidad
  productoId: string
  unidadMedidas: UnidadMedida[]
}) {
  const router = useRouter()

  const form = useForm<ProductoUnidad>({
    resolver: zodResolver(ProductoUnidadSchema),
    defaultValues: {
      ...initialData,
      producto_id: productoId,
      unidad_medida_id: initialData.unidad_medida_id ?? "",
      factor: initialData.factor ?? 1,
      id: initialData.id,
      producto: initialData.producto,
      unidad_medida: initialData.unidad_medida,
      activo: initialData.activo ?? true,
    },
  })

  async function onSubmit(data: Partial<ProductoUnidad>) {
    const payload = {
      ...data,
      producto_id: productoId,
      factor: Number(data.factor),
    }

    const promise = async () => {
      if (isUpdate && data.id) {
        await updatePresentacion(data.id, payload)
        return { name: "Actualización" }
      } else {
        await createPresentacion(payload as ProductoUnidad)
        return { name: "Creación" }
      }
    }

    try {
      await toast.promise(promise, {
        loading: "Guardando...",
        success: (data) => `${data.name} exitosa`,
        error: "Error al guardar la presentación",
      })
      router.push("/producto/" + productoId + "/presentaciones")
      router.refresh()
    } catch (error) {
      toast.error("Error al Guardar", {
        description: isUpdate ? "No se pudo actualizar la presentación." : "No se pudo crear la presentación.",
      })
    }
  }

  const watchedFactor = form.watch("factor")
  const watchedUnidadMedida = form.watch("unidad_medida_id")
  const selectedUnidad = unidadMedidas.find((um) => um.id === watchedUnidadMedida)

  return (
    <div className="  p-6 border rounded-lg shadow-md space-y-8">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Button type="button" variant="ghost" size="icon" onClick={() => router.back()} className="h-10 w-10">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isUpdate ? "Actualizar Presentación" : "Nueva Presentación"}
            </h1>
            <p className="text-muted-foreground">
              {isUpdate ? "Modifica la presentación del producto" : "Define una nueva presentación para el producto"}
            </p>
          </div>
          {isUpdate && (
            <Badge variant="secondary" className="ml-auto">
              Modo Edición
            </Badge>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Configuración de Presentación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Configuración de Presentación
              </CardTitle>
              <CardDescription>
                Define la unidad de medida y el factor de conversión para esta presentación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unidad de Medida */}
                <FormField
                  control={form.control}
                  name="unidad_medida_id"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-base font-semibold">Unidad de Medida</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona la unidad de medida" />
                          </SelectTrigger>
                          <SelectContent>
                            {unidadMedidas.map((um) => (
                              <SelectItem key={um.id} value={um.id || ""}>
                                <div className="flex items-center gap-2">
                                  <Scale className="h-4 w-4 text-muted-foreground" />
                                  {um.nombre}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Selecciona la unidad en la que se presentará el producto</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Factor */}
                <FormField
                  control={form.control}
                  name="factor"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-base font-semibold">Factor de Conversión</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Ej: 6, 12, 24..."
                            className="h-12 pl-10 font-mono text-lg"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Número de unidades base que contiene esta presentación</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preview de la conversión */}
              {watchedFactor && selectedUnidad && (
                <>
                  <Separator />
                  <div className="p-4  rounded-lg border ">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 " />
                      <span className="text-sm font-medium ">Vista Previa de Conversión</span>
                    </div>
                    <div className="text-sm ">
                      <strong>1 {selectedUnidad.nombre}</strong> = <strong>{watchedFactor} unidades base</strong>
                    </div>
                    <div className="text-xs  mt-1">
                      Esta presentación contendrá {watchedFactor} {watchedFactor === 1 ? "unidad" : "unidades"} del
                      producto base
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Estado (solo para edición) */}
          {isUpdate && (
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
                      <SelectTrigger className="h-12 max-w-xs">
                        <SelectValue placeholder="Selecciona el estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>Activo</span>
                            <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                              Disponible
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="false">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span>Inactivo</span>
                            <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
                              No disponible
                            </Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Las presentaciones inactivas no aparecerán en las opciones de selección
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button type="button" variant="outline" className="h-12 px-8" onClick={() => router.back()}>
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
                "Actualizar Presentación"
              ) : (
                "Crear Presentación"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
