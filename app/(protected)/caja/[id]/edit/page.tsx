
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getCajaById } from "../../actions";
import { CajaFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_categorias")) {
    return <NoAcceso />;
  }

  const puesto = await getCajaById(params.id);
  if (!puesto) {
    redirect("/caja"); // Redirige si no se encuentra el cliente
  }
  const puestoCreate = {
    id: puesto.id,
    nombre: puesto.nombre,
    activo: puesto.activo, 
  };


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una categoria."
        screenName="Editar Categoria"
      />
      <CajaFormulario
        isUpdate={true}
        initialData={puestoCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
