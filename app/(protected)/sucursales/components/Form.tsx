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
import { createSucursal, updateSucursal } from "../actions"; // Tu función para enviar datos
import { SucursalSchema } from "../schema"; // Tu esquema de Zod para categoria
import { toast } from "sonner";
import { CheckboxCajas } from "./checkboxCajas";
import { Caja } from "../../caja/type";

export function SucursalFormulario({
  isUpdate,
  initialData,
  cajas,
}: {
  isUpdate: boolean;
  initialData: z.infer<typeof SucursalSchema>;
  cajas: Caja[];
}) {
  const router = useRouter();

  // Usamos Zod para resolver la validación
  const form = useForm<z.infer<typeof SucursalSchema>>({
    resolver: zodResolver(SucursalSchema),
    defaultValues: initialData,
  });

  // // Verificación de validez antes del submit
  // const { formState } = form;

  // //forma de saber si un form esta valido o no
  // const isValid = formState.errors;
  // console.log("isValid");
  // console.log(isValid);
  async function onSubmit(data: z.infer<typeof SucursalSchema>) {
    const sucursalData = {
      sucursal: {
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono,
        activo: data.activo,
        ...(isUpdate && { id: data.id }),
      },
      cajasSucursal: data.cajas?.map((caja: any) => caja.id) || [],
    };

    const promise = async () => {
      if (isUpdate) {
        await updateSucursal(sucursalData.sucursal.id!, sucursalData);
        return { name: "Actualización" };
      } else {
        await createSucursal(sucursalData);
        return { name: "Creación" };
      }
    };

    try {
      await toast.promise(promise, {
      loading: "Guardando...",
      success: (data) => `${data.name} exitosa`,
      error: "Error al guardar la sucursal",
      });

      router.push("/sucursales");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast.error("Error al Guardar", {
      description: isUpdate
        ? "No se pudo actualizar la sucursal."
        : "No se pudo crear la sucursal.",
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
                  <Input placeholder="Ingresa el nombre de la sucursal" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingresa el nombre de la sucursal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Direccion */}
          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="col-span-1 sm:col-span-1">
                {" "}
                {/* Asignamos el ancho adecuado */}
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa la direccion" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingresa la direccion de la sucursal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Telefono */}
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem className="col-span-1 sm:col-span-1">
                {" "}
                {/* Asignamos el ancho adecuado */}
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa el telefono" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingresa el telefono de la sucursal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Checkbox de cajas */}
        <FormField
          control={form.control}
          name="cajas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cajas de la Sucursal</FormLabel>
              <FormControl>
                <CheckboxCajas
                  cajas={cajas}
                  selectedCajas={
                    field.value?.map((caja: any) => caja.id) || []
                  }
                  onChange={(selected) => {
                    const selectedCajas = cajas.filter((caja) =>
                      selected.includes(caja.id || "")
                    );
                    field.onChange(selectedCajas);
                  }}
                />
              </FormControl>
              <FormDescription>
                Selecciona las cajas asociadas a esta sucursal.
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
