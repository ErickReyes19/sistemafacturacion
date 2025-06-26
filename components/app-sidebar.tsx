import { getSessionUsuario } from "@/auth";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BoxIcon, Building2Icon, ChevronDown, ChevronUp, CoinsIcon, LayersIcon, PercentIcon, ScaleIcon, Settings, UserIcon, UserRoundCheck, Users, Users2, UsersIcon } from 'lucide-react';
import Link from "next/link";
import ToggleThemeButton from "../components/button-theme";
import { NavUser } from "./nav-user";

// Menú de mantenimiento
const mantenimientoItems = [
  {
    title: "Roles",
    url: "/roles",
    icon: LayersIcon,
    permiso: "ver_roles",
  },
  {
    title: "Permisos",
    url: "/permisos",
    icon: LayersIcon,
    permiso: "ver_permisos",
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: UserIcon,
    permiso: "ver_usuarios",
  },
  {
    title: "Empleados",
    url: "/empleados",
    icon: UsersIcon,
    permiso: "ver_empleados",
  },
  {
    title: "Puestos",
    url: "/puestos",
    icon: UserRoundCheck,
    permiso: "ver_puestos",
  },
];

// Agrupaciones lógicas
const catalogoItems = [
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users,
    permiso: "ver_clientes",
  },
  {
    title: "Proveedores",
    url: "/proveedor",
    icon: Users2,
    permiso: "ver_proveedores",
  },
  {
    title: "Productos",
    url: "/producto",
    icon: BoxIcon,
    permiso: "ver_productos",
  },
  {
    title: "Categorias",
    url: "/categorias",
    icon: LayersIcon,
    permiso: "ver_categorias",
  },
  {
    title: "Monedas",
    url: "/monedas",
    icon: CoinsIcon,
    permiso: "ver_monedas",
  },
  {
    title: "Impuestos",
    url: "/impuestos",
    icon: PercentIcon,
    permiso: "ver_impuestos",
  },
  {
    title: "Unidades de Medida",
    url: "/unidad-medidas",
    icon: ScaleIcon,
    permiso: "ver_unidad_medidas",
  },
];

const operacionesItems = [
  {
    title: "Sucursales",
    url: "/sucursales",
    icon: Building2Icon,
    permiso: "ver_sucursales",
  },
  {
    title: "Almacenes",
    url: "/almacen",
    icon: BoxIcon,
    permiso: "ver_almacen",
  },
  {
    title: "Cajas",
    url: "/caja",
    icon: LayersIcon,
    permiso: "ver_caja",
  },
];

export async function AppSidebar() {
  const usuario = await getSessionUsuario(); // Obtiene el nombre del usuario
  const permisosUsuario = usuario?.Permiso || [];

  // Filtrar los ítems basados en los permisos del usuario
  const filteredCatalogo = catalogoItems.filter(item => permisosUsuario.includes(item.permiso));
  const filteredOperaciones = operacionesItems.filter(item => permisosUsuario.includes(item.permiso));

  // Filtrar los ítems de mantenimiento basados en los permisos del usuario
  const filteredMantenimientoItems = mantenimientoItems.filter(item =>
    permisosUsuario.includes(item.permiso)
  );

  // Solo mostrar la sección de mantenimiento si hay al menos un ítem con permiso
  const showMantenimiento = filteredMantenimientoItems.length > 0;

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <span>Sistema POS </span>
            
            <ToggleThemeButton />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {/* Catálogos */}
              {filteredCatalogo.length > 0 && (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <LayersIcon size={16} className="p-0" />
                        <span>Catálogos</span>
                        <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {filteredCatalogo.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url}>
                                <item.icon size={16} className="p-0" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
              {/* Operaciones */}
              {filteredOperaciones.length > 0 && (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <BoxIcon size={16} className="p-0" />
                        <span>Operaciones</span>
                        <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {filteredOperaciones.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url}>
                                <item.icon size={16} className="p-0" />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
              {/* Mantenimiento */}
              {showMantenimiento && (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Settings size={16} className="p-0" />
                        <span>Mantenimiento</span>
                        <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {filteredMantenimientoItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={item.url}>
                                {item.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {usuario && <NavUser usuario={usuario} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}