import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { LayersIcon } from "lucide-react";
import { getCajas } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import CajaListMobile from "./components/caja-list-mobile";

export default async function Caja() {

  const permisos = await getSessionPermisos();


  const data = await getCajas();
  if (!permisos?.includes("ver_caja")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={LayersIcon}
        description="En este apartado podrá ver todas las cajas."
        screenName="Cajas"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <CajaListMobile caja={data} />
      </div>
    </div>
  );
}
