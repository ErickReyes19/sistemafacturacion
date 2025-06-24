
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getCategoriaById } from "../../actions";
import { CategoriaFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_categorias")) {
    return <NoAcceso />;
  }

  const puesto = await getCategoriaById(params.id);
  if (!puesto) {
    redirect("/categorias"); // Redirige si no se encuentra el cliente
  }
  const puestoCreate = {
    id: puesto.id,
    nombre: puesto.nombre,
    activo: puesto.activo, 
    descripcion: puesto.descripcion
  };


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una categoria."
        screenName="Editar Categoria"
      />
      <CategoriaFormulario
        isUpdate={true}
        initialData={puestoCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
