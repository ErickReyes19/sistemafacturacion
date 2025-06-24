
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getUnidadMedidaById } from "../../actions";
import { UnidadMedidaFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_unidad_medidas")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const unidadMedida = await getUnidadMedidaById(params.id);
  if (!unidadMedida) {
    redirect("/unidad-medidas"); // Redirige si no se encuentra la unidad de medida
  }
  const unidadMedidaCreate = {
    id: unidadMedida.id,
    nombre: unidadMedida.nombre,
    activo: unidadMedida.activo,
    descripcion: unidadMedida.descripcion
  };


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una unidad de medida."
        screenName="Editar Unidad de Medida"
      />
      <UnidadMedidaFormulario
        isUpdate={true}
        initialData={unidadMedidaCreate} // Pasamos los datos de la unidad de medida al formulario
      />
    </div>
  );
}
