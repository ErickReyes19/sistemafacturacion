import { getUnidadMedidas } from "../../../../unidad-medidas/actions";
import { PresentacionFormulario } from "../components/Form";
import { notFound } from "next/navigation";

export default async function CreatePresentacionPage({ params }: { params: { id: string } }) {
  const unidadMedidas = await getUnidadMedidas();
  
  if (!params.id) return notFound();

  const initialData = {
    producto_id: "",
    unidad_medida_id: "",
    factor: 0,
    activo: true,
  };


  return (



      <PresentacionFormulario
        isUpdate={false}
        initialData={initialData} 
        productoId={params.id}
        unidadMedidas={unidadMedidas}
      />
  );
}
