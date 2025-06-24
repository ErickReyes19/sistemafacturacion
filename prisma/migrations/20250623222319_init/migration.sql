-- CreateTable
CREATE TABLE `Rol` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Rol_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permiso` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Permiso_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RolPermiso` (
    `rolId` VARCHAR(191) NOT NULL,
    `permisoId` VARCHAR(191) NOT NULL,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`rolId`, `permisoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleado` (
    `id` VARCHAR(191) NOT NULL,
    `puesto_id` VARCHAR(191) NOT NULL,
    `numeroIdentificacion` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,
    `correo` LONGTEXT NOT NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `fechaIngreso` DATETIME(3) NULL,
    `telefono` VARCHAR(191) NULL,
    `genero` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    INDEX `Empleado_puesto_id_idx`(`puesto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Puesto` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `empleado_id` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `contrasena` LONGTEXT NOT NULL,
    `debeCambiarPwd` BOOLEAN NULL,
    `rol_id` VARCHAR(191) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuarios_empleado_id_key`(`empleado_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PasswordResetToken` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PasswordResetToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sucursal` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Sucursal_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Almacen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sucursalId` VARCHAR(191) NULL,

    UNIQUE INDEX `Almacen_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Categoria_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Moneda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` CHAR(3) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `simbolo` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Moneda_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Impuesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `porcentaje` DOUBLE NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Impuesto_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proveedor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `contacto` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnidadMedida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `UnidadMedida_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `precio_compra` DOUBLE NOT NULL,
    `precio_venta` DOUBLE NOT NULL,
    `unidad_medida_id` INTEGER NOT NULL,
    `categoria_id` INTEGER NOT NULL,
    `moneda_id` INTEGER NOT NULL,
    `impuesto_id` INTEGER NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Producto_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoUnidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `unidad_medida_id` INTEGER NOT NULL,
    `factor` DOUBLE NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ProductoUnidad_producto_id_unidad_medida_id_key`(`producto_id`, `unidad_medida_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `almacen_id` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `minimo_stock` INTEGER NOT NULL,
    `actualizado_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovimientoInventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `inventario_id` INTEGER NOT NULL,
    `tipo` ENUM('ingreso', 'egreso', 'ajuste') NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `referencia` VARCHAR(191) NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cliente` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NULL,
    `correo` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `fechaNacimiento` DATETIME(3) NULL,
    `genero` VARCHAR(191) NULL,
    `numeroIdentificacion` VARCHAR(191) NULL,
    `direccion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cliente_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeriesDocumento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_documento` ENUM('factura', 'boleta', 'ticket') NOT NULL,
    `serie` VARCHAR(191) NOT NULL,
    `ultimo_numero` INTEGER NOT NULL DEFAULT 0,
    `descripcion` VARCHAR(191) NULL,

    UNIQUE INDEX `SeriesDocumento_tipo_documento_serie_key`(`tipo_documento`, `serie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Factura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serie_documento_id` INTEGER NOT NULL,
    `numero` INTEGER NOT NULL,
    `cliente_id` VARCHAR(191) NOT NULL,
    `empleado_id` VARCHAR(191) NOT NULL,
    `fecha_emision` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_vencimiento` DATETIME(3) NULL,
    `estado` ENUM('factura', 'boleta', 'ticket') NULL,
    `subtotal` DOUBLE NOT NULL,
    `total_impuestos` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `moneda_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleFactura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `factura_id` INTEGER NOT NULL,
    `producto_id` INTEGER NOT NULL,
    `unidad_medida_id` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DOUBLE NOT NULL,
    `descuento` DOUBLE NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `impuesto_id` INTEGER NULL,
    `porcentaje_impuesto` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `factura_id` INTEGER NOT NULL,
    `fecha_pago` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metodo_pago` ENUM('efectivo', 'tarjeta', 'transferencia', 'otro') NOT NULL,
    `monto` DOUBLE NOT NULL,
    `referencia` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdenCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `proveedor_id` INTEGER NOT NULL,
    `empleado_id` VARCHAR(191) NOT NULL,
    `fecha_orden` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('factura', 'boleta', 'ticket') NOT NULL,
    `total` DOUBLE NOT NULL,
    `moneda_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleOrdenCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_compra_id` INTEGER NOT NULL,
    `producto_id` INTEGER NOT NULL,
    `unidad_medida_id` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DOUBLE NOT NULL,
    `subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DevolucionVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `factura_id` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleDevolucionVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `devolucion_id` INTEGER NOT NULL,
    `producto_id` INTEGER NOT NULL,
    `unidad_medida_id` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DOUBLE NOT NULL,
    `subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DevolucionCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orden_compra_id` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `motivo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleDevolucionCompra` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `devolucion_id` INTEGER NOT NULL,
    `producto_id` INTEGER NOT NULL,
    `unidad_medida_id` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DOUBLE NOT NULL,
    `subtotal` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Caja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Caja_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AperturaCaja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `caja_id` INTEGER NOT NULL,
    `empleado_id` VARCHAR(191) NOT NULL,
    `fecha_apertura` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monto_inicial` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MovimientoCaja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apertura_id` INTEGER NOT NULL,
    `tipo` ENUM('ingreso', 'egreso', 'ajuste') NOT NULL,
    `fecha_movimiento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monto` DOUBLE NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `empleado_id` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CierreCaja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apertura_id` INTEGER NOT NULL,
    `fecha_cierre` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monto_final` DOUBLE NOT NULL,
    `total_ventas` DOUBLE NOT NULL,
    `total_movimientos` DOUBLE NOT NULL,
    `diferencia` DOUBLE NOT NULL,

    UNIQUE INDEX `CierreCaja_apertura_id_key`(`apertura_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auditoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tabla_nombre` VARCHAR(191) NOT NULL,
    `registro_id` INTEGER NOT NULL,
    `accion` VARCHAR(191) NOT NULL,
    `datos_anteriores` JSON NULL,
    `datos_nuevos` JSON NULL,
    `usuario_id` VARCHAR(191) NULL,
    `fecha_accion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Auditoria_usuario_id_key`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promocion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` ENUM('porcentaje', 'monto_fijo') NOT NULL,
    `valor` DOUBLE NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductoPromocion` (
    `promocion_id` INTEGER NOT NULL,
    `producto_id` INTEGER NOT NULL,

    PRIMARY KEY (`promocion_id`, `producto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CuentaPorCobrar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` VARCHAR(191) NOT NULL,
    `factura_id` INTEGER NOT NULL,
    `monto_total` DOUBLE NOT NULL,
    `monto_pagado` DOUBLE NOT NULL DEFAULT 0,
    `saldo` DOUBLE NOT NULL,
    `estado` ENUM('abierto', 'cerrado') NOT NULL DEFAULT 'abierto',
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `CuentaPorCobrar_factura_id_key`(`factura_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmpleadoInventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empleado_id` VARCHAR(191) NOT NULL,
    `inventario_id` INTEGER NOT NULL,
    `fecha_asignacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activo` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `EmpleadoInventario_empleado_id_inventario_id_key`(`empleado_id`, `inventario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AsientoContable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `empleado_id` VARCHAR(191) NOT NULL,
    `tipo_documento` VARCHAR(191) NULL,
    `documento_id` INTEGER NULL,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleAsientoContable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asiento_id` INTEGER NOT NULL,
    `cuenta_contable` VARCHAR(191) NOT NULL,
    `debe` DOUBLE NOT NULL,
    `haber` DOUBLE NOT NULL,
    `descripcion` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Configuracion` (
    `clave` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `sucursal_id` VARCHAR(191) NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `creado_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`clave`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `Rol`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RolPermiso` ADD CONSTRAINT `RolPermiso_permisoId_fkey` FOREIGN KEY (`permisoId`) REFERENCES `Permiso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleado` ADD CONSTRAINT `Empleado_puesto_id_fkey` FOREIGN KEY (`puesto_id`) REFERENCES `Puesto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_empleado_id_fkey` FOREIGN KEY (`empleado_id`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PasswordResetToken` ADD CONSTRAINT `PasswordResetToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Almacen` ADD CONSTRAINT `Almacen_sucursalId_fkey` FOREIGN KEY (`sucursalId`) REFERENCES `Sucursal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_unidad_medida_id_fkey` FOREIGN KEY (`unidad_medida_id`) REFERENCES `UnidadMedida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_moneda_id_fkey` FOREIGN KEY (`moneda_id`) REFERENCES `Moneda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_impuesto_id_fkey` FOREIGN KEY (`impuesto_id`) REFERENCES `Impuesto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoUnidad` ADD CONSTRAINT `ProductoUnidad_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoUnidad` ADD CONSTRAINT `ProductoUnidad_unidad_medida_id_fkey` FOREIGN KEY (`unidad_medida_id`) REFERENCES `UnidadMedida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inventario` ADD CONSTRAINT `Inventario_almacen_id_fkey` FOREIGN KEY (`almacen_id`) REFERENCES `Almacen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimientoInventario` ADD CONSTRAINT `MovimientoInventario_inventario_id_fkey` FOREIGN KEY (`inventario_id`) REFERENCES `Inventario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_serie_documento_id_fkey` FOREIGN KEY (`serie_documento_id`) REFERENCES `SeriesDocumento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_empleado_id_fkey` FOREIGN KEY (`empleado_id`) REFERENCES `Empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Factura` ADD CONSTRAINT `Factura_moneda_id_fkey` FOREIGN KEY (`moneda_id`) REFERENCES `Moneda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_unidad_medida_id_fkey` FOREIGN KEY (`unidad_medida_id`) REFERENCES `UnidadMedida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleFactura` ADD CONSTRAINT `DetalleFactura_impuesto_id_fkey` FOREIGN KEY (`impuesto_id`) REFERENCES `Impuesto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_proveedor_id_fkey` FOREIGN KEY (`proveedor_id`) REFERENCES `Proveedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_empleado_id_fkey` FOREIGN KEY (`empleado_id`) REFERENCES `Empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_moneda_id_fkey` FOREIGN KEY (`moneda_id`) REFERENCES `Moneda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleOrdenCompra` ADD CONSTRAINT `DetalleOrdenCompra_orden_compra_id_fkey` FOREIGN KEY (`orden_compra_id`) REFERENCES `OrdenCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleOrdenCompra` ADD CONSTRAINT `DetalleOrdenCompra_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleOrdenCompra` ADD CONSTRAINT `DetalleOrdenCompra_unidad_medida_id_fkey` FOREIGN KEY (`unidad_medida_id`) REFERENCES `UnidadMedida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DevolucionVenta` ADD CONSTRAINT `DevolucionVenta_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleDevolucionVenta` ADD CONSTRAINT `DetalleDevolucionVenta_devolucion_id_fkey` FOREIGN KEY (`devolucion_id`) REFERENCES `DevolucionVenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleDevolucionVenta` ADD CONSTRAINT `DetalleDevolucionVenta_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleDevolucionVenta` ADD CONSTRAINT `DetalleDevolucionVenta_unidad_medida_id_fkey` FOREIGN KEY (`unidad_medida_id`) REFERENCES `UnidadMedida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DevolucionCompra` ADD CONSTRAINT `DevolucionCompra_orden_compra_id_fkey` FOREIGN KEY (`orden_compra_id`) REFERENCES `OrdenCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleDevolucionCompra` ADD CONSTRAINT `DetalleDevolucionCompra_devolucion_id_fkey` FOREIGN KEY (`devolucion_id`) REFERENCES `DevolucionCompra`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleDevolucionCompra` ADD CONSTRAINT `DetalleDevolucionCompra_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleDevolucionCompra` ADD CONSTRAINT `DetalleDevolucionCompra_unidad_medida_id_fkey` FOREIGN KEY (`unidad_medida_id`) REFERENCES `UnidadMedida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AperturaCaja` ADD CONSTRAINT `AperturaCaja_caja_id_fkey` FOREIGN KEY (`caja_id`) REFERENCES `Caja`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AperturaCaja` ADD CONSTRAINT `AperturaCaja_empleado_id_fkey` FOREIGN KEY (`empleado_id`) REFERENCES `Empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimientoCaja` ADD CONSTRAINT `MovimientoCaja_apertura_id_fkey` FOREIGN KEY (`apertura_id`) REFERENCES `AperturaCaja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MovimientoCaja` ADD CONSTRAINT `MovimientoCaja_empleado_id_fkey` FOREIGN KEY (`empleado_id`) REFERENCES `Empleado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CierreCaja` ADD CONSTRAINT `CierreCaja_apertura_id_fkey` FOREIGN KEY (`apertura_id`) REFERENCES `AperturaCaja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Auditoria` ADD CONSTRAINT `Auditoria_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Empleado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoPromocion` ADD CONSTRAINT `ProductoPromocion_promocion_id_fkey` FOREIGN KEY (`promocion_id`) REFERENCES `Promocion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoPromocion` ADD CONSTRAINT `ProductoPromocion_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CuentaPorCobrar` ADD CONSTRAINT `CuentaPorCobrar_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CuentaPorCobrar` ADD CONSTRAINT `CuentaPorCobrar_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpleadoInventario` ADD CONSTRAINT `EmpleadoInventario_empleado_id_fkey` FOREIGN KEY (`empleado_id`) REFERENCES `Empleado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpleadoInventario` ADD CONSTRAINT `EmpleadoInventario_inventario_id_fkey` FOREIGN KEY (`inventario_id`) REFERENCES `Inventario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AsientoContable` ADD CONSTRAINT `AsientoContable_empleado_id_fkey` FOREIGN KEY (`empleado_id`) REFERENCES `Empleado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleAsientoContable` ADD CONSTRAINT `DetalleAsientoContable_asiento_id_fkey` FOREIGN KEY (`asiento_id`) REFERENCES `AsientoContable`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Configuracion` ADD CONSTRAINT `Configuracion_sucursal_id_fkey` FOREIGN KEY (`sucursal_id`) REFERENCES `Sucursal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
