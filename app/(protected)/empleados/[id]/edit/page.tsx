
import { getPuestosActivas } from "@/app/(protected)/puestos/actions";
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getEmpleadoById } from "../../actions";
import { EmpleadoFormulario } from "../../components/Form";
import { getSucursalesActivas } from "@/app/(protected)/sucursales/actions";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_empleado")) {
    return <NoAcceso />;
  }
  const puestos = await getPuestosActivas()
  const sucursales = await getSucursalesActivas() 

  // Obtener el cliente por getEmpleadoById ID
  const empleado = await getEmpleadoById(params.id);
  if (!empleado) {
    redirect("/empleados"); // Redirige si no se encuentra el cliente
  }
  const initialData = {
    id: empleado.id || "",
    nombre: empleado.nombre,
    apellido: empleado.apellido,
    correo: empleado.correo,
    genero: empleado.genero, // Valor por defecto
    activo: empleado.activo ?? false,
    fechaNacimiento: new Date(empleado.fechaNacimiento),
    nombreUsuario: empleado.usuario,
    puesto_id: empleado.puesto_id || "",
    numeroIdentificacion: empleado.numeroIdentificacion || "",
    fechaIngreso: empleado.fechaIngreso ? new Date(empleado.fechaIngreso) : new Date(),
    telefono: empleado.telefono || "",
    sucursal_id: empleado.sucursal_id || "",
  };

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un empleado"
        screenName="Editar Empleado"
      />
      <EmpleadoFormulario
        sucursales={sucursales || []}
        puestos={puestos || []}
        isUpdate={true} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} // Datos iniciales para crear un nuevo empleado
      />

    </div>
  );
}
