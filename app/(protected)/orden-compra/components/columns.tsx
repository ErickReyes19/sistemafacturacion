"use client";
import { ArrowUpDown, CheckCircleIcon, XCircleIcon } from "lucide-react";
// import { FormateadorFecha } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { OrdenCompra } from "../type";

export const columns: ColumnDef<OrdenCompra>[] = [

  {
    accessorKey: "almacen.nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "empleado.nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Empleado
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "proveedor.nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Proveedor
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "fecha_orden",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Fecha
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const raw = new Date(row.getValue("fecha_orden"));
      const date = raw ? new Date(raw) : null;
      return date ? date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "-";
    },
  },


  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const ordenCompra = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            {/* <Link href={`/orden-compra/${ordenCompra.id}/edit`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link> */}
            <Link href={`/orden-compra/${ordenCompra.id}/detalle`}>
              <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
