import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { CajaFormulario } from "../components/Form"; // Asegúrate de que el formulario sea para Empleados

export default async function Create() {

  const permisos = await getSessionPermisos();
  // Redirige si no hay sesión

  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_categorias")) {
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para puesto
  const initialData = {
    nombre: "",
    id: "",
    activo: true
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear una categoria."
        screenName="Crear Categoria"  // Cambié la pantalla a "Crear Empleado"
      />
      <CajaFormulario
        isUpdate={false}  // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData}  // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
