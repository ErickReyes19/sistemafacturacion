"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createMovimientoInventario } from "../actions"

import { Package, Warehouse, Loader2 } from "lucide-react"
import { Inventario } from "../../../type"
import { MovimientoInventarioSchema } from "../schema"

export function MovimientoInventarioForm({
  inventario,
  isUpdate = false,
}: {
  inventario: Inventario
  isUpdate?: boolean
}) {
  const router = useRouter()

  const form = useForm<z.infer<typeof MovimientoInventarioSchema>>({
    resolver: zodResolver(MovimientoInventarioSchema),
    defaultValues: {
      inventario_id: inventario.id!,
      tipo: "ingreso",
      cantidad: 0,
      observaciones: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof MovimientoInventarioSchema>) => {
    const promise = async () => {
      await createMovimientoInventario(data)
      return { tipo: data.tipo }
    }

    try {
      await toast.promise(promise, {
        loading: "Registrando movimiento...",
        success: (res) => `Movimiento de ${res.tipo} exitoso`,
        error: "Error al registrar el movimiento",
      })

      router.push("/inventario")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Error inesperado al guardar")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Movimiento de Inventario</CardTitle>
            <CardDescription>
              Ingresa o retira stock del inventario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Inventario preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>Producto:</strong> {inventario.producto!}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Warehouse className="h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>Almacén:</strong> {inventario.almacen}
                </span>
              </div>
            </div>

            {/* Tipo de Movimiento */}
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Movimiento</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ingreso">Ingreso</SelectItem>
                        <SelectItem value="egreso">Egreso</SelectItem>
                        <SelectItem value="ajuste">Ajuste</SelectItem>
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
              name="cantidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Ej: 5"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value === "" ? "" : Number(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Observaciones */}
            <FormField
              control={form.control}
              name="observaciones"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Compra a proveedor X, retiro por daño..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botón */}
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-12"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Registrar Movimiento"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
