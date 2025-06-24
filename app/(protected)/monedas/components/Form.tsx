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
import { createMoneda, updateMoneda } from "../actions"; // Tu función para enviar datos
import { MonedaSchema } from "../schema"; // Tu esquema de Zod para categoria
import { toast } from "sonner";

export function MonedaFormulario({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData: z.infer<typeof MonedaSchema>;
}) {
  const router = useRouter();

  // Usamos Zod para resolver la validación
  const form = useForm<z.infer<typeof MonedaSchema>>({
    resolver: zodResolver(MonedaSchema),
    defaultValues: initialData,
  });

  // // Verificación de validez antes del submit
  // const { formState } = form;

  // //forma de saber si un form esta valido o no
  // const isValid = formState.errors;
  // console.log("isValid");
  // console.log(isValid);
  async function onSubmit(data: z.infer<typeof MonedaSchema>) {
    const monedaData = {
      moneda: data,
    };


    const promise = async () => {
      if (isUpdate) {
      await updateMoneda(monedaData.moneda.id!, monedaData.moneda);
      return { name: "Actualización" };
      } else {
      await createMoneda(monedaData.moneda);
      return { name: "Creación" };
      }
    };

    try {
      await toast.promise(promise, {
      loading: "Guardando...",
      success: (data) => `${data.name} exitosa`,
      error: "Error al guardar la moneda",
      });

      router.push("/monedas");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error("Error al Guardar", {
      description: isUpdate
        ? "No se pudo actualizar la moneda."
        : "No se pudo crear la moneda.",
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
                      Por favor ingresa el nombre de la moneda
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            {/* Simbolo */}
          <FormField
            control={form.control}
            name="simbolo"
            render={({ field }) => (
              <FormItem className="col-span-1 sm:col-span-1">
                {" "}
                {/* Asignamos el ancho adecuado */}
                <FormLabel>Simbolo</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingresa el simbolo de la moneda.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}

          />
          {/* Codigo */}
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem className="col-span-1 sm:col-span-1">
                <FormLabel>Codigo</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa tu codigo" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingresa el codigo de la moneda.
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
