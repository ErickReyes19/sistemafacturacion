import { getSession, getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { ProveedorFormulario } from "../components/Form"; // Asegúrate de que el formulario sea para Empleados


export default async function Create() {
  const permisos = await getSessionPermisos();
  const sesion = await getSession();

  // Redirige si no hay sesión
  if (!sesion) {
    redirect("/login");
  }

  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_proveedores")) {
    return <NoAcceso />;
  }



  const initialData = {
    id: "",
    nombre: "",
    email: "",
    activo: true, 
    telefono: "",
    direccion: "",
  };


  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un nuevo proveedor."
        screenName="Crear Proveedor " // Cambié la pantalla a "Crear Empleado"
      />
      <ProveedorFormulario
        isUpdate={false} // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData} // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
