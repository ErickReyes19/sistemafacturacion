import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  // 1. Opcional: resetear datos
  const resetData = process.env.RESET_SEED === 'true';
  if (resetData) {
    await prisma.rolPermiso.deleteMany();
    await prisma.usuarios.deleteMany();
    await prisma.empleado.deleteMany();
    await prisma.puesto.deleteMany();
    await prisma.rol.deleteMany();
    await prisma.permiso.deleteMany();
    console.log("Datos anteriores eliminados");
  }

  // 2. Sembrar Permisos
  const permisosData = [
    // Empleados
    { nombre: "ver_empleados", descripcion: "Permiso para ver los empleados" },
    { nombre: "crear_empleados", descripcion: "Permiso para crear los empleados" },
    { nombre: "editar_empleado", descripcion: "Permiso para editar los empleados" },
    // Clientes
    { nombre: "ver_clientes", descripcion: "Permiso para ver los clientes" },
    { nombre: "crear_clientes", descripcion: "Permiso para crear los clientes" },
    { nombre: "editar_clientes", descripcion: "Permiso para editar los clientes" },

    // { nombre: "editar_empleado", descripcion: "Permiso para editar los empleados" },
    // Permisos
    { nombre: "ver_permisos", descripcion: "Permiso para ver los permisos" },
    { nombre: "ver_roles", descripcion: "Permiso para ver roles" },
    { nombre: "crear_roles", descripcion: "Permiso para crear roles" },
    { nombre: "editar_roles", descripcion: "Permiso para editar roles" },
    // Usuarios
    { nombre: "ver_usuarios", descripcion: "Permiso para ver usuarios" },
    { nombre: "crear_usuario", descripcion: "Permiso para crear usuarios" },
    { nombre: "editar_usuario", descripcion: "Permiso para editar usuarios" },

    // Puestos
    { nombre: "ver_puestos", descripcion: "Permiso para ver puestos" },
    { nombre: "crear_puestos", descripcion: "Permiso para crear puestos" },
    { nombre: "editar_puestos", descripcion: "Permiso para editar puestos" },

    // Servicios
    { nombre: "ver_servicios", descripcion: "Permiso para ver los servicios" },
    { nombre: "crear_servicios", descripcion: "Permiso para crear servicios" },
    { nombre: "editar_servicios", descripcion: "Permiso para editar servicios" },

    // categorias productos
    { nombre: "ver_categorias", descripcion: "Permiso para ver las categorias" },
    { nombre: "crear_categorias", descripcion: "Permiso para crear categorias" },
    { nombre: "editar_categorias", descripcion: "Permiso para editar categorias" },

    // unidades de medida
    { nombre: "ver_unidad_medidas", descripcion: "Permiso para ver las unidades de medida" },
    { nombre: "crear_unidad_medidas", descripcion: "Permiso para crear unidades de medida" },
    { nombre: "editar_unidad_medidas", descripcion: "Permiso para editar unidades de medida" },

    // monedas
    { nombre: "ver_monedas", descripcion: "Permiso para ver las monedas" },
    { nombre: "crear_monedas", descripcion: "Permiso para crear monedas" },
    { nombre: "editar_monedas", descripcion: "Permiso para editar monedas" },

    // impuestos
    { nombre: "ver_impuestos", descripcion: "Permiso para ver los impuestos" },
    { nombre: "crear_impuestos", descripcion: "Permiso para crear impuestos" },
    { nombre: "editar_impuestos", descripcion: "Permiso para editar impuestos" },

    // sucursales
    { nombre: "ver_sucursales", descripcion: "Permiso para ver las sucursales" },
    { nombre: "crear_sucursales", descripcion: "Permiso para crear sucursales" },
    { nombre: "editar_sucursales", descripcion: "Permiso para editar sucursales" },

    // cajas
    { nombre: "ver_caja", descripcion: "Permiso para ver las cajas" },
    { nombre: "crear_caja", descripcion: "Permiso para crear cajas" },
    { nombre: "editar_caja", descripcion: "Permiso para editar cajas" },

    // almacenes
    { nombre: "ver_almacen", descripcion: "Permiso para ver los almacenes" },
    { nombre: "crear_almacen", descripcion: "Permiso para crear almacenes" },
    { nombre: "editar_almacen", descripcion: "Permiso para editar almacenes" },

    // productos
    { nombre: "ver_productos", descripcion: "Permiso para ver los productos" },
    { nombre: "crear_productos", descripcion: "Permiso para crear productos" },
    { nombre: "editar_productos", descripcion: "Permiso para editar productos" },

    // proveedores
    { nombre: "ver_proveedores", descripcion: "Permiso para ver los almacenes" },
    { nombre: "crear_proveedores", descripcion: "Permiso para crear proveedores" },
    { nombre: "editar_proveedores", descripcion: "Permiso para editar proveedores" },

    // inventario
    { nombre: "ver_inventario", descripcion: "Permiso para ver el inventario" },
    { nombre: "crear_inventario", descripcion: "Permiso para crear inventario" },
    { nombre: "editar_inventario", descripcion: "Permiso para editar inventario" },

    // Movimientos de inventario
    { nombre: "ver_movimientos_inventario", descripcion: "Permiso para ver los movimientos de inventario" },
    { nombre: "crear_movimientos_inventario", descripcion: "Permiso para crear movimientos de inventario" },

    // Orden de compra
    { nombre: "ver_ordenes_compra", descripcion: "Permiso para ver las órdenes de compra" },
    { nombre: "crear_ordenes_compra", descripcion: "Permiso para crear órdenes de compra" },
    { nombre: "editar_ordenes_compra", descripcion: "Permiso para editar órdenes de compra" },
    

    // Perfil
    { nombre: "ver_profile", descripcion: "Permiso para ver el perfil" },

  ];

  const permisoIds: string[] = [];
  for (const p of permisosData) {
    let permiso = await prisma.permiso.findUnique({ where: { nombre: p.nombre } });
    if (!permiso) {
      permiso = await prisma.permiso.create({
        data: {
          id: randomUUID(),
          nombre: p.nombre,
          descripcion: p.descripcion,
          activo: true,
        },
      });
      console.log(`Permiso creado: ${p.nombre}`);
    } else {
      console.log(`Permiso existente: ${p.nombre}`);
    }
    permisoIds.push(permiso.id);
  }
  // 2.1. Crear sucursales
  const sucursalesData = [
    { id: randomUUID(), nombre: "Sucursal 1", direccion: "Sucursal 1", telefono: "1234567890", activo: true },
    { id: randomUUID(), nombre: "Sucursal 2", direccion: "Sucursal 2", telefono: "1234567890", activo: true },
    { id: randomUUID(), nombre: "Sucursal 3", direccion: "Sucursal 3", telefono: "1234567890", activo: true },
  ];
  
  const createdSucursales: any[] = [];
  for (const s of sucursalesData) {
    let sucursal = await prisma.sucursal.findUnique({ where: { nombre: s.nombre } });
    if (!sucursal) {
      sucursal = await prisma.sucursal.create({
        data: {
          id: s.id, // Use the predefined ID
          nombre: s.nombre,
          direccion: s.direccion,
          telefono: s.telefono,
          activo: s.activo,
        },
      });
      console.log(`Sucursal creada: ${s.nombre}`);
    } else {
      console.log(`Sucursal existente: ${s.nombre}`);
    }
    createdSucursales.push(sucursal);
  }

  // 3. Crear rol Administrador
  let adminRole = await prisma.rol.findUnique({ where: { nombre: "Administrador" } });
  if (!adminRole) {
    adminRole = await prisma.rol.create({
      data: {
        id: randomUUID(),
        nombre: "Administrador",
        descripcion: "Rol con acceso total al sistema",
        activo: true,
      },
    });
    console.log("Rol Administrador creado");
  } else {
    console.log("Rol Administrador existente");
  }

  // 4. Asignar permisos al rol
  const existingRolePermisos = await prisma.rolPermiso.findMany({ where: { rolId: adminRole.id } });
  const existingIds = new Set(existingRolePermisos.map(rp => rp.permisoId));
  for (const pid of permisoIds) {
    if (!existingIds.has(pid)) {
      await prisma.rolPermiso.create({ data: { rolId: adminRole.id, permisoId: pid } });
    }
  }
  console.log("Permisos asignados a Administrador");

  // 5. Crear Puesto
  let puesto = await prisma.puesto.findFirst({ where: { nombre: "Gerente Recursos Humanos" } });
  if (!puesto) {
    puesto = await prisma.puesto.create({
      data: {
        id: randomUUID(),
        nombre: "Gerente Recursos Humanos",
        descripcion: "Gerente de recursos humanos",
        activo: true,
      },
    });
    console.log("Puesto creado");
  }

  // 6. Crear Empleado
  let empleado = await prisma.empleado.findFirst({ where: { correo: "erickjosepineda33@gmail.com" } });
  if (!empleado) {
    empleado = await prisma.empleado.create({
      data: {
        id: randomUUID(),
        nombre: "Erick Jose",
        sucursal_id: createdSucursales[0].id, // Use the created sucursal ID
        apellido: "Reyes Pineda",
        puesto_id: puesto.id,
        correo: "erickjosepineda33@gmail.com",
        fechaNacimiento: new Date(1999, 12, 2),
        fechaIngreso: new Date(2023, 0, 1),
        telefono: "9999-9999",
        numeroIdentificacion: "0801-1999-00001",
        genero: "Masculino",
        activo: true,
      },
    });
    console.log("Empleado Erick Reyes creado");
  }

  // 7. Crear Usuario
  let usuario = await prisma.usuarios.findFirst({ where: { usuario: "erick.reyes" } });
  if (!usuario) {
    usuario = await prisma.usuarios.create({
      data: {
        id: randomUUID(),

        usuario: "erick.reyes",
        contrasena: await bcrypt.hash("erick.reyes", 10),
        empleado_id: empleado.id,
        rol_id: adminRole.id,
        activo: true,
        debeCambiarPwd: false,
      },
    });
    console.log("Usuario Erick Reyes creado");
  }

  console.log("Seed completado exitosamente");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
