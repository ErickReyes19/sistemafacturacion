import dynamic from "next/dynamic";
import { getSession } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";

// Importamos sin SSR para que sólo corra en cliente
const Clock = dynamic(() => import("@/components/clock"), { ssr: false });

export default async function Layout({ children }: { children: React.ReactNode }) {
  const sesion = await getSession();
  if (!sesion) redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full p-2">
        {/* Header con trigger a la izquierda y reloj a la derecha */}
        <div className="flex items-center justify-between mb-4">
          <SidebarTrigger />
          <Clock />
        </div>

        {children}

        <Toaster />
      </main>
    </SidebarProvider>
  );
}
