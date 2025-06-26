import { getSessionPermisos } from "@/auth";
import { getProductoById } from "../../actions";
import NoAcceso from "@/components/noAccess";
import { redirect } from "next/navigation";
import { ProductoCard } from "../../components/ProductoCard";


export default async function Detalle({ params }: { params: { id: string } }) {
    const permisos = await getSessionPermisos();
    if (!permisos?.includes("ver_productos")) {
        return <NoAcceso />;
    }
    const producto = await getProductoById(params.id);
    if (!producto) {
        redirect("/producto");
    }
    return (
        <ProductoCard producto={producto} />
    )
}