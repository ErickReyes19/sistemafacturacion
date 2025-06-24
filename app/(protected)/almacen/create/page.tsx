import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { PlusCircle } from "lucide-react";
import { AlmacenFormulario } from "../components/Form";
import { getSucursalesActivas } from "../../sucursales/actions";

export default async function Create() {
  const permisos = await getSessionPermisos();

  // Verifica permisos para crear almacenes
  if (!permisos?.includes("crear_almacen")) {
    return <NoAcceso />;
  }
  
  const sucursales = await getSucursalesActivas();

  // Filtramos solo las sucursales que tienen id definido y las convertimos al formato esperado
  const sucursalesFiltradas = sucursales
    .filter(sucursal => sucursal.id !== undefined)
    .map(sucursal => ({
      id: sucursal.id!,
      nombre: sucursal.nombre,
      direccion: sucursal.direccion || "",
      telefono: sucursal.telefono || "",
      activo: sucursal.activo || true,
      creado_at: sucursal.creado_at || new Date(),
    }));

  // Inicializamos con un valor específico para almacén
  const initialData = {
    nombre: "",
    id: "",
    activo: true,
    sucursalId: "",
    sucursal: "",
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un almacén."
        screenName="Crear Almacén"
      />
      <AlmacenFormulario
        sucursales={sucursalesFiltradas}
        isUpdate={false}
        initialData={initialData}
      />
    </div>
  );
}
