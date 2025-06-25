import { getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
// import { Button } from "@/components/ui/button";
import { Users2 } from "lucide-react";
// import Link from "next/link";
import { getProveedor } from "./actions";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import ProveedorListMobile from "./components/proveedor-list-mobile";

export default async function Empleados() {

  const permisos = await getSessionPermisos();

  const data = await getProveedor();

  if (!permisos?.includes("ver_proveedores")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Users2}
        description="En este apartado podrá ver todos los proveedores"
        screenName="Proveedores"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ProveedorListMobile proveedor={data} />
      </div>
    </div>
  );
}
