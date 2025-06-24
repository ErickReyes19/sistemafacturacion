import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { ImpuestoFormulario } from "../components/Form"; // Asegúrate de que el formulario sea para Empleados

export default async function Create() {

  const permisos = await getSessionPermisos();
  // Redirige si no hay sesión

  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_impuestos")) {
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para puesto
  const initialData = {
    nombre: "",
    porcentaje: 0,
    id: undefined,
    activo: true
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un impuesto."
        screenName="Crear Impuesto"  // Cambié la pantalla a "Crear Empleado"
      />
      <ImpuestoFormulario
        isUpdate={false}  // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData}  // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
