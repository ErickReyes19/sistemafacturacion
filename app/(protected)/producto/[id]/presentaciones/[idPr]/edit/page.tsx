import { notFound } from "next/navigation";
import { getUnidadMedidas } from "../../../../../unidad-medidas/actions";
import { getPresentacionById, getPresentacionesByProducto } from "../../action";
import { PresentacionFormulario } from "../../components/Form";

export default async function EditPresentacionPage({ params }: { params: { id: string, idPr: string } }) {
  const unidadMedidas = await getUnidadMedidas();
  const presentacion = await getPresentacionById(params.idPr);
  console.log("🚀 ~ EditPresentacionPage ~ presentacion:", presentacion)

  if (!params.id || !presentacion) return notFound();



  return (
    <PresentacionFormulario
      isUpdate={true}
      initialData={presentacion}
      productoId={params.id}
      unidadMedidas={unidadMedidas}
    />
  );
}
