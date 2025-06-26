import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { ArrowUpDownIcon, BoxIcon, LayersIcon } from "lucide-react";

import AlmacenListMobile from "./components/almacen-list-mobile";
import { obtenerMovimientosPorInventario } from "./actions";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function inventario({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();


  if (!permisos?.includes("ver_inventario")) {
    return <NoAcceso />;
  }
  const data = await obtenerMovimientosPorInventario(params.id);

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ ArrowUpDownIcon }
        description="En este apartado podrá ver todos los movimientos de un invetario."
        screenName="Movimientos de inventario"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} inventarioId={params.id} />
      </div>
      <div className="block md:hidden">
        <AlmacenListMobile almacen={data} />
      </div>
    </div>
  );
}
