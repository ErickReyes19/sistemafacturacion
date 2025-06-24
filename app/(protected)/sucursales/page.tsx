import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Building2Icon, LayersIcon } from "lucide-react";
import { getSucursales } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import CategoriaListMobile from "./components/sucursal-list-mobile";
import SucursalListMobile from "./components/sucursal-list-mobile";

export default async function Puestos() {

  const permisos = await getSessionPermisos();


  const data = await getSucursales();
  if (!permisos?.includes("ver_sucursales")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Building2Icon}
        description="En este apartado podrá ver todas las sucursales."
        screenName="Sucursales"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <SucursalListMobile sucursal={data} />
      </div>
    </div>
  );
}
