import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { LayersIcon } from "lucide-react";
import { getPresentacionesByProducto } from "./action";
import { getUnidadMedidas } from "../../../unidad-medidas/actions";

import { useParams } from "next/navigation";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default async function PresentacionesPage({ params }: { params: { id: string } }) {
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("ver_productos")) {
    return <NoAcceso />;
  }

  const presentaciones = await getPresentacionesByProducto(params.id);
  const unidades = await getUnidadMedidas();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={LayersIcon}
        description="En este apartado podrá ver todas las presentaciones del producto."
        screenName="Presentaciones"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={presentaciones} productoId={params.id} />
      </div>
    </div>
  );
}
