import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { LayersIcon } from "lucide-react";
import { getImpuestos } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import ImpuestoListMobile from "./components/impuesto-list-mobile";

export default async function Puestos() {

  const permisos = await getSessionPermisos();


  const data = await getImpuestos();
  if (!permisos?.includes("ver_impuestos")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={LayersIcon}
        description="En este apartado podrá ver todos los impuestos."
        screenName="Impuestos"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ImpuestoListMobile impuesto={data} />
      </div>
    </div>
  );
}
