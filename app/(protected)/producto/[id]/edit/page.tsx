
import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import { getProductoById } from "../../actions";
import { ProductoFormulario } from "../../components/Form";
import { getImpuestos } from "../../../impuestos/actions";
import { getUnidadMedidas } from "../../../unidad-medidas/actions";
import { getCategorias } from "../../../categorias/actions";
import { getMonedas } from "../../../monedas/actions";

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_productos")) {
    return <NoAcceso />;
  }

  const producto = await getProductoById(params.id);
  if (!producto) {
    redirect("/producto"); // Redirige si no se encuentra el cliente
  }
  const unidadMedidas = await getUnidadMedidas();
  const categorias = await getCategorias();
  const monedas = await getMonedas();
  const impuestos = await getImpuestos();
  const productoCreate = {
    id: producto.id,
    sku: producto.sku,
    nombre: producto.nombre,
    activo: producto.activo,
    unidad_medida_id: producto.unidad_medida_id,
    categoria_id: producto.categoria_id,
    moneda_id: producto.moneda_id,
    impuesto_id: producto.impuesto_id,
    precio_compra: producto.precio_compra,
    precio_venta: producto.precio_venta,
  };




  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar una categoria."
        screenName="Editar Categoria"
      />
        <ProductoFormulario
        unidadMedidas={unidadMedidas}
        categorias={categorias}
        monedas={monedas}
        impuestos={impuestos}
        isUpdate={true}
        initialData={productoCreate} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
