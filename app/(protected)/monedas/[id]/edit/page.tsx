
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getMonedaById } from "../../actions";
import { MonedaFormulario } from "../../components/Form";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_monedas")) {
    return <NoAcceso />;
  }

  const moneda = await getMonedaById(params.id);
  if (!moneda) {
    redirect("/monedas"); // Redirige si no se encuentra el cliente
  }
  const monedaCreate = {
    id: moneda.id,
    nombre: moneda.nombre,
    activo: moneda.activo, 
    simbolo: moneda.simbolo,
    codigo: moneda.codigo
  };


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una moneda."
        screenName="Editar Moneda"
      />
      <MonedaFormulario
        isUpdate={true}
        initialData={monedaCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
