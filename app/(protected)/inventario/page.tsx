import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { BoxIcon, LayersIcon } from "lucide-react";
import { getInventarios } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import AlmacenListMobile from "./components/almacen-list-mobile";

export default async function Caja() {

  const permisos = await getSessionPermisos();


  if (!permisos?.includes("ver_inventario")) {
    return <NoAcceso />;
  }
  const data = await getInventarios();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={BoxIcon}
        description="En este apartado podrá ver todos los inventario."
        screenName="Inventario"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <AlmacenListMobile almacen={data} />
      </div>
    </div>
  );
}
