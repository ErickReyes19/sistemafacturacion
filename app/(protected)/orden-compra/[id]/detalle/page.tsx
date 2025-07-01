
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getOrdenCompraById } from "../../actions";
import { OrdenCompraDetails } from "../../components/orden-compra-card";


export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

//   if (!permisos?.includes("ver_detalle_orden_compra")) {
//     return <NoAcceso />;
//   }

  const ordenCompra = await getOrdenCompraById(params.id);
  if (!ordenCompra) {
    redirect("/orden-compra"); // Redirige si no se encuentra el cliente
  }




  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una inventario."
        screenName="Detalle orden de compra"
      />
      <OrdenCompraDetails
        ordenCompra={ordenCompra as any}
        // Agrega aquí cualquier otra propiedad necesaria
      />

    </div>
  );
}
