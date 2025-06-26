import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { InventarioFormulario } from "../components/Form";
import { getAlmacenesActivos } from "../../almacen/actions";
import { getProductosActivos } from "../../producto/actions";

export default async function Create() {
  const permisos = await getSessionPermisos();

  // Verifica permisos para crear almacenes
  if (!permisos?.includes("crear_inventario")) {
    return <NoAcceso />;
  }
  
  const almacenes = await getAlmacenesActivos();
  const productos = await getProductosActivos();



  // Inicializamos con un valor específico para almacén
  const initialData = {
    producto_id: "",
    almacen_id: "", // Asigna el primer almacén si existe
    cantidad: 0,
    stock_minimo: 0,
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un almacén."
        screenName="Crear Almacén"
      />
      <InventarioFormulario
        productos={productos}
        isUpdate={false}
        almacenes={almacenes}
        initialData={initialData}
      />
    </div>
  );
}
