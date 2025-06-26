
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getInventarioById } from "../../actions";
import { InventarioFormulario } from "../../components/Form";
import { getSucursalesActivas } from "@/app/(protected)/sucursales/actions";
import { getAlmacenesActivos } from "@/app/(protected)/almacen/actions";
import { getProductosActivos } from "@/app/(protected)/producto/actions";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_almacen")) {
    return <NoAcceso />;
  }

  const inventario = await getInventarioById(params.id);
  if (!inventario) {
    redirect("/inventario"); // Redirige si no se encuentra el cliente
  }

  const almacen = await getAlmacenesActivos();
  const productos = await getProductosActivos();



  const almacenCreate = {
    id: inventario.id,
    producto_id: inventario.producto_id,
    producto: inventario.producto,
    almacen_id: inventario.almacen_id,
    almacen: inventario.almacen,
    cantidad: inventario.cantidad,
    stock_minimo: inventario.stock_minimo,
  };

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una inventario."
        screenName="Editar inventario"
      />
      <InventarioFormulario
        productos={productos}
        almacenes={almacen}
        isUpdate={true}
        initialData={almacenCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
