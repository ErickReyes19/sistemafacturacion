import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { LayersIcon } from "lucide-react";
import { getMonedas } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import MonedaListMobile from "./components/categorias-list-mobile";

export default async function Puestos() {

  const permisos = await getSessionPermisos();


  const data = await getMonedas();
  if (!permisos?.includes("ver_monedas")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={LayersIcon}
        description="En este apartado podrá ver todas las monedas."
        screenName="Monedas"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <MonedaListMobile moneda={data} />
      </div>
    </div>
  );
}
