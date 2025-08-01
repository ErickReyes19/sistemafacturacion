// app/components/client-back-button.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function ClientBackButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => router.back()}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Regresar
    </Button>
  );
}
