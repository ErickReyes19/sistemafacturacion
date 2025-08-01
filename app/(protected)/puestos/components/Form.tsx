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
import { createPuesto, updatePuesto } from "../actions"; // Tu función para enviar datos
import { PuestoSchema } from "../schema"; // Tu esquema de Zod para puesto
import { toast } from "sonner";

export function PuestoFormulario({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData: z.infer<typeof PuestoSchema>;
}) {
  const router = useRouter();

  // Usamos Zod para resolver la validación
  const form = useForm<z.infer<typeof PuestoSchema>>({
    resolver: zodResolver(PuestoSchema),
    defaultValues: initialData,
  });

  // Verificación de validez antes del submit
  const { formState } = form;

  //forma de saber si un form esta valido o no
  const isValid = formState.errors;
  console.log("isValid");
  console.log(isValid);
  async function onSubmit(data: z.infer<typeof PuestoSchema>) {
    const puestoData = {
      puesto: data,
    };


    const promise = async () => {
      if (isUpdate) {
      await updatePuesto(puestoData.puesto.id!, puestoData.puesto);
      return { name: "Actualización" };
      } else {
      await createPuesto(puestoData.puesto);
      return { name: "Creación" };
      }
    };

    try {
      await toast.promise(promise, {
      loading: "Guardando...",
      success: (data) => `${data.name} exitosa`,
      error: "Error al guardar el puesto",
      });

      router.push("/puestos");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error("Error al Guardar", {
      description: isUpdate
        ? "No se pudo actualizar el puesto."
        : "No se pudo crear el puesto.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-md p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  Por favor ingresa tu nombre completo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Nombre */}
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem className="col-span-1 sm:col-span-1">
                {" "}
                {/* Asignamos el ancho adecuado */}
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingresa la descripción de puesto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
