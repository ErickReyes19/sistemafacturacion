import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { BoxIcon, LayersIcon } from "lucide-react";
import { getProductos } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import AlmacenListMobile from "./components/producto-list-mobile";

export default async function Caja() {

  const permisos = await getSessionPermisos();


  const data = await getProductos();
  if (!permisos?.includes("ver_productos")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={BoxIcon}
        description="En este apartado podrá ver todos los almacenes."
        screenName="Almacenes"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <AlmacenListMobile producto={data} />
      </div>
    </div>
  );
}
