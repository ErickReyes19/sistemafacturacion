import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { BoxIcon, CheckSquareIcon, LayersIcon } from "lucide-react";
import { getOrdenesCompra } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

export default async function Caja() {

  const permisos = await getSessionPermisos();


  const data = await getOrdenesCompra();
  if (!permisos?.includes("ver_ordenes_compra")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={CheckSquareIcon}
        description="En este apartado podrá ver todas las ordenes de compra."
        screenName="Ordenes de compra"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>

    </div>
  );
}
