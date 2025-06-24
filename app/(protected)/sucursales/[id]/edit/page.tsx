
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getSucursalById } from "../../actions";
import { SucursalFormulario } from "../../components/Form";
import { getCajasActivas } from "@/app/(protected)/caja/actions";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_sucursales")) {
    return <NoAcceso />;
  }

  const puesto = await getSucursalById(params.id);

  const cajas = await getCajasActivas();


  if (!puesto) {
    redirect("/sucursales"); // Redirige si no se encuentra el cliente
  }
  const puestoCreate = {
    id: puesto.id,
    nombre: puesto.nombre,
    activo: puesto.activo, 
    direccion: puesto.direccion,
    telefono: puesto.telefono,
    cajas: puesto.cajas?.map(c => ({
      id: c.id,
      nombre: c.nombre,
    })) || []
  };


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una sucursal."
        screenName="Editar Sucursal"
      />
      <SucursalFormulario
        cajas={cajas}
        isUpdate={true}
        initialData={puestoCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
