import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { UnidadMedidaFormulario } from "../components/Form"; // Asegúrate de que el formulario sea para Empleados

export default async function Create() {

  const permisos = await getSessionPermisos();
  // Redirige si no hay sesión

  // Verifica permisos para crear unidades de medida
  if (!permisos?.includes("crear_unidad_medidas")) {
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para unidad de medida
  const initialData = {
    nombre: "",
    descripcion: "",
    id: "",
    activo: true,
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear una unidad de medida."
        screenName="Crear Unidad de Medida"  // Cambié la pantalla a "Crear Unidad de Medida"
      />
      <UnidadMedidaFormulario
        isUpdate={false}  // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData}  // Datos iniciales para crear una nueva unidad de medida
      />
    </div>
  );
}
