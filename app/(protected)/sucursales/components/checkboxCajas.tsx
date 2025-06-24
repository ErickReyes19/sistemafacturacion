import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Caja } from "../../caja/type";

export const CheckboxCajas = ({
  cajas,
  selectedCajas,
  onChange,
}: {
  cajas: Caja[];
  selectedCajas: string[];
  onChange: (selected: string[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (id: string) => {
    const newSelected = selectedCajas.includes(id)
      ? selectedCajas.filter((caja) => caja !== id)
      : [...selectedCajas, id];
    onChange(newSelected);
  };

  const filteredCajas = cajas.filter((caja) =>
    caja.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Buscar cajas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2"
        />
      </div>

      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCajas.map((caja) => (
            <Label
              key={caja.id}
              htmlFor={caja.id}
              className="flex items-center space-x-2 p-3 border border-muted-200 rounded-lg hover:bg-muted-100 transition duration-200 cursor-pointer"
            >
              <Checkbox
                id={caja.id}
                checked={selectedCajas.includes(caja.id || "")}
                onCheckedChange={() => handleCheckboxChange(caja.id || "")}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-muted-800 font-medium">{caja.nombre}</span>
            </Label>
          ))}
        </div>
      </ScrollArea>

      {filteredCajas.length === 0 && (
        <div className="text-muted-500">No se encontraron cajas.</div>
      )}
    </div>
  );
}; 