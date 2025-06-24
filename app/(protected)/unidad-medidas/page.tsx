import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { ScaleIcon } from "lucide-react";
import { getUnidadMedidas } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import UnidadMedidaList from "./components/unidad-medida-list-mobile";

export default async function UnidadMedidas() {

  const permisos = await getSessionPermisos();


  const data = await getUnidadMedidas();
  if (!permisos?.includes("ver_unidad_medidas")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ScaleIcon}
        description="En este apartado podrá ver todas las unidades de medida."
        screenName="Unidades de Medida"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <UnidadMedidaList unidadMedida={data} />
      </div>
    </div>
  );
}
