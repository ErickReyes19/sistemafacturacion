import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { ProductoFormulario } from "../components/Form";
import { getImpuestos } from "../../impuestos/actions";
import { getUnidadMedidas } from "../../unidad-medidas/actions";
import { getCategorias } from "../../categorias/actions";
import { getMonedas } from "../../monedas/actions";

export default async function Create() {
  const permisos = await getSessionPermisos();

  // Verifica permisos para crear almacenes
  if (!permisos?.includes("crear_productos")) {
    return <NoAcceso />;
  }
  
const unidadMedidas = await getUnidadMedidas();
const categorias = await getCategorias();
const monedas = await getMonedas();
const impuestos = await getImpuestos();

  // Inicializamos con un valor específico para almacén
  const initialData = {
    sku: "",
    nombre: "",
    activo: true,
    unidad_medida_id: "",
    categoria_id: "",
    moneda_id: "",
    impuesto_id: "",
    precio_compra: 0,
    precio_venta: 0,
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un almacén."
        screenName="Crear Almacén"
      />
      <ProductoFormulario
        unidadMedidas={unidadMedidas}
        categorias={categorias}
        monedas={monedas}
        impuestos={impuestos}
        isUpdate={false}
        initialData={initialData}

      />
    </div>
  );
}
