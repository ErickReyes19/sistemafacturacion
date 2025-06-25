"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calcularEdad } from "@/lib/utils";
import { House, Mail, Pencil, Phone, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Proveedor } from "../type";

interface ProveedorListProps {
  proveedor: Proveedor[];
}

export default function ProveedorListMobile({ proveedor: proveedores }: ProveedorListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProveedor = proveedores.filter(
    (proveedor) =>
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proveedor.telefono!.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Link href={`/proveedor/create`} className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo proveedor
          <Plus />
        </Button>
      </Link>
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar proveedor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {filteredProveedor.map((proveedor) => (
        <div
          key={proveedor.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${proveedor.activo ? "bg-green-500" : "bg-red-500"
                  }`}
              ></span>
              <h3 className="text-sm font-medium truncate">
                {proveedor.nombre}
              </h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                <span className="truncate">{proveedor.email}</span>
              </p>
              <p className="text-xs flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                <span className="truncate">{proveedor.telefono}</span>
              </p>

            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <House className="h-3 w-3 mr-1" />
                <span className="truncate">{proveedor.direccion}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/proveedor/${proveedor.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredProveedor.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron proveedores.
        </p>
      )}
      {filteredProveedor.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredProveedor.length} de {proveedores.length} proveedores.
        </p>
      )}
    </div>
  );
}
