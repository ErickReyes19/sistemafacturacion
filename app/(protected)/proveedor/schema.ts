import * as z from "zod";

export const ProveedorSchema = z.object({
  id: z.string().optional(), // Ahora obligatorio y debe ser UUID
  nombre: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Correo no válido"),

  telefono: z
    .string()
    .min(1, "El teléfono es requerido")
    .regex(/^[0-9\-+() ]+$/, "Formato de teléfono inválido"),

  direccion: z.string().min(1, "La direccion es requerida"),

  activo: z.boolean(),

});

export type Proveedor = z.infer<typeof ProveedorSchema>;
