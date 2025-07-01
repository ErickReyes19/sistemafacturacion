"use client";

import { zodResolver } from "@hookform/resolvers/zod"; // Usamos el resolutor de Zod
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Importamos useForm

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { createAlmacen, updateAlmacen } from "../actions"; // Tu función para enviar datos
import { AlmacenSchema } from "../schema"; // Tu esquema de Zod para categoria
import { toast } from "sonner";
import { Sucursal } from "@/app/generated/prisma/client";

export function AlmacenFormulario({
  isUpdate,
  initialData,
  sucursales,
}: {
  isUpdate: boolean;
  initialData: z.infer<typeof AlmacenSchema>;
  sucursales: Sucursal[];
}) {
  const router = useRouter();

  // Usamos Zod para resolver la validación
  const form = useForm<z.infer<typeof AlmacenSchema>>({
    resolver: zodResolver(AlmacenSchema),
    defaultValues: initialData,
  });

  // // Verificación de validez antes del submit
  
  // //forma de saber si un form esta valido o no
  // const { formState } = form;
  // const isValid = formState.errors;
  // console.log("isValid");
  // console.log(isValid);
  async function onSubmit(data: z.infer<typeof AlmacenSchema>) {
    const almacenData = {
      almacen: data,
    };


    const promise = async () => {
      if (isUpdate) {
        await updateAlmacen(almacenData.almacen.id!, almacenData.almacen);
        return { name: "Actualización" };
      } else {
        await createAlmacen(almacenData.almacen);
        return { name: "Creación" };
      }
    };

    try {
      await toast.promise(promise, {
        loading: "Guardando...",
        success: (data) => `${data.name} exitosa`,
        error: "Error al guardar el almacen",
      });

      router.push("/almacen");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error("Error al Guardar", {
        description: isUpdate
          ? "No se pudo actualizar el almacen."
          : "No se pudo crear el almacen.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-md p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          {" "}
          {/* Grid de 1 columna en móviles y 2 en pantallas más grandes */}
          {/* Nombre */}
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem className="col-span-1 sm:col-span-1">
                {" "}
                {/* Asignamos el ancho adecuado */}
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingresa el nombre del almacen
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="sucursalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sucursal</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona la sucursal" />
                  </SelectTrigger>
                  <SelectContent>
                    {sucursales.map((sucursal) => (
                      <SelectItem key={sucursal.id} value={sucursal.id}>
                        {sucursal.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Define si el registro está activo o inactivo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Estado Activo (solo si es actualización) */}
        {isUpdate && (
          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value ? "true" : "false"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Define si el registro está activo o inactivo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Enviar */}
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : isUpdate ? (
              "Actualizar"
            ) : (
              "Crear"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
