import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { OrdenCompraFormulario } from "../components/Form";
import { getSucursalesActivas } from "../../sucursales/actions";
import { getAlmacenesActivos } from "../../almacen/actions";
import { getMonedasActivas } from "../../monedas/actions";
import { getProductosActivos } from "../../producto/actions";
import { getProveedor } from "../../proveedor/actions";
import { getUnidadMedidasActivas } from "../../unidad-medidas/actions";

export default async function Create() {
  const permisos = await getSessionPermisos();

  // Verifica permisos para crear almacenes
  if (!permisos?.includes("crear_ordenes_compra")) {
    return <NoAcceso />;
  }
  
  const almacences = await getAlmacenesActivos();
  const monedas = await getMonedasActivas();
  const productos = await getProductosActivos();
  const proveedores = await getProveedor();
  const unidades = await getUnidadMedidasActivas();
  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear una orden de compra."
        screenName="Crear Orden de compra"
      />
      <OrdenCompraFormulario
        almacenes={almacences}
        monedas={monedas}
        productos={productos}
        proveedores={proveedores}
        isUpdate={false}
        initialData={{
          proveedor_id: "",
          empleado_id: "",
          fecha_orden: new Date(),
          estado: "pendiente",
          total: 0,
          moneda_id: "",
          almacen_id: "",
        }}
      />
    </div>
  );
}
