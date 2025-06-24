
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getImpuestoById } from "../../actions";
import { ImpuestoFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_impuestos")) {
    return <NoAcceso />;
  }

  const impuesto = await getImpuestoById(params.id);
  if (!impuesto) {
    redirect("/impuestos"); // Redirige si no se encuentra el cliente
  }
  const impuestoCreate = {
    id: impuesto.id,
    nombre: impuesto.nombre,
    activo: impuesto.activo, 
    porcentaje: impuesto.porcentaje,
  };


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una moneda."
        screenName="Editar Moneda"
      />
      <ImpuestoFormulario
        isUpdate={true}
        initialData={impuestoCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
