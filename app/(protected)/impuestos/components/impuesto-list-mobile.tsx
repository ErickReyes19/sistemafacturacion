"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Impuesto } from "../type";

interface ImpuestoListProps {
  impuesto: Impuesto[];
}

export default function ImpuestoListMobile({ impuesto }: ImpuestoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredImpuesto = impuesto.filter((user) =>
    user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.porcentaje?.toString().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo usuario */}
      <Link href="/impuestos/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo impuesto
          <Plus />
        </Button>
      </Link>

      {/* Input de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar impuesto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de usuarios */}
      {filteredImpuesto.map((impuesto) => (
        <div key={impuesto.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                    className={`w-2 h-2 rounded-full mr-2 ${impuesto.activo ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <h3 className="text-sm font-medium truncate">{impuesto.nombre}</h3>
            </div>
              <p className="text-xs mt-1 truncate">Porcentaje: {impuesto.porcentaje}</p>
          </div>
          <div className="flex items-center ml-4">
           
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            
          </div>
        </div>
      ))}

      {filteredImpuesto.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron impuestos.</p>
      )}
      {filteredImpuesto.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredImpuesto.length} de {impuesto.length} impuestos.
        </p>
      )}
    </div>
  );
}
