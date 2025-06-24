"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Moneda } from "../type";

interface MonedaListProps {
  moneda: Moneda[];
}

export default function MonedaListMobile({ moneda }: MonedaListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMoneda = moneda.filter((user) =>
    user.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.simbolo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.codigo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo usuario */}
      <Link href="/monedas/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nueva moneda
          <Plus />
        </Button>
      </Link>

      {/* Input de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar moneda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de usuarios */}
      {filteredMoneda.map((moneda) => (
        <div key={moneda.id} className="flex items-center justify-between p-4 rounded-lg shadow border">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${moneda.activo ? "bg-green-500" : "bg-red-500"}`}
              ></span>
              <h3 className="text-sm font-medium truncate">{moneda.nombre}</h3>
            </div>
              <p className="text-xs mt-1 truncate">Simbolo: {moneda.simbolo}</p>
          </div>
          <div className="flex items-center ml-4">
           
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            
          </div>
        </div>
      ))}

      {filteredMoneda.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron monedas.</p>
      )}
      {filteredMoneda.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Mostrando {filteredMoneda.length} de {moneda.length} monedas.
        </p>
      )}
    </div>
  );
}
