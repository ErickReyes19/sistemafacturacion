

import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getProveedorById } from "../../actions";
import { ProveedorFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_proveedores")) {
    return <NoAcceso />;
  }


  // Obtener el cliente por getEmpleadoById ID
  const proveedor = await getProveedorById(params.id);
  if (!proveedor) {
    redirect("/proveedor"); // Redirige si no se encuentra el proveedor
  }
  const initialData = {
    id: proveedor.id || "",
    nombre: proveedor.nombre,
    email: proveedor.email,
    activo: proveedor.activo ?? false,
    telefono: proveedor.telefono || "",
    direccion: proveedor.direccion || "",

  };

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un proveedor."
        screenName="Editar Proveedor" // Cambié la pantalla a "Editar Proveedor"
      />
      <ProveedorFormulario
        isUpdate={true} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} // Datos iniciales para crear un nuevo empleado
      />

    </div>
  );
}
