
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getAlmacenById } from "../../actions";
import { AlmacenFormulario } from "../../components/Form";
import { getSucursalesActivas } from "@/app/(protected)/sucursales/actions";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_almacen")) {
    return <NoAcceso />;
  }

  const almacen = await getAlmacenById(params.id);
  if (!almacen) {
    redirect("/almacen"); // Redirige si no se encuentra el cliente
  }
  const almacenCreate = {
    id: almacen.id,
    nombre: almacen.nombre,
    activo: almacen.activo,
    sucursalId: almacen.sucursalId,
  };

  const sucursales = await getSucursalesActivas();

  const sucursalesFiltradas = sucursales
    .filter(sucursal => sucursal.id !== undefined)
    .map(sucursal => ({
      id: sucursal.id!,
      nombre: sucursal.nombre,
      direccion: sucursal.direccion || "",
      telefono: sucursal.telefono || "",
      activo: sucursal.activo || true,
      creado_at: sucursal.creado_at || new Date(),
    }));


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una categoria."
        screenName="Editar Categoria"
      />
      <AlmacenFormulario
        sucursales={sucursalesFiltradas}
        isUpdate={true}
        initialData={almacenCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
