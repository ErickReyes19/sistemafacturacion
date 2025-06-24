import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { LayersIcon } from "lucide-react";
import { getCategorias } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import CategoriaListMobile from "./components/categorias-list-mobile";

export default async function Puestos() {

  const permisos = await getSessionPermisos();


  const data = await getCategorias();
  if (!permisos?.includes("ver_categorias")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={LayersIcon}
        description="En este apartado podrá ver todas las categorias."
        screenName="Categorias"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <CategoriaListMobile categoria={data} />
      </div>
    </div>
  );
}
