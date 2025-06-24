import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { SucursalFormulario } from "../components/Form"; // Asegúrate de que el formulario sea para Empleados
import { getCajasActivas } from "../../caja/actions";

export default async function Create() {

  const permisos = await getSessionPermisos();
  // Redirige si no hay sesión

  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_sucursales")) {
    return <NoAcceso />;
  }

  const cajas = await getCajasActivas();

  // Inicializamos con un valor específico para puesto
  const initialData = {
    nombre: "",
    direccion: "",
    telefono: "",
    id: "",
    activo: true
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear una sucursal."
        screenName="Crear Sucursal"  // Cambié la pantalla a "Crear Empleado"
      />
      <SucursalFormulario
        cajas={cajas}
        isUpdate={false}  // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData}  // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
