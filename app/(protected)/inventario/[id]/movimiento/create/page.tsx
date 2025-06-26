import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MovimientoInventarioForm } from "../components/Form";
import { obtenerMovimientosPorInventario } from "../actions";
import { getInventarioById } from "../../../actions";

type Props = {
  params: {
    id: string;
  };
};

export default async function CreateMovimiento({ params }: Props) {
  const permisos = await getSessionPermisos();

  if (!permisos?.includes("crear_movimientos_inventario")) {
    return <NoAcceso />;
  }
  console.log("🚀 ~ CreateMovimiento ~ params:", params)

  const inventario = await getInventarioById(params.id);
  console.log("🚀 ~ CreateMovimiento ~ inventario:", inventario)

  if (!inventario) {
    return <div>Inventario no encontrado</div>;
  }

  const initialData = {
    inventario_id: inventario,
    tipo: "ingreso",
    cantidad: 0,
    referencia: "",
    descripcion: "",
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un movimiento de inventario."
        screenName="Crear Movimiento Inventario"
      />
      <MovimientoInventarioForm
        inventario={inventario}
        
        isUpdate={false}
      />
    </div>
  );
}
