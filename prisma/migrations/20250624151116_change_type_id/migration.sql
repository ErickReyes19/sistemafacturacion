/*
  Warnings:

  - The primary key for the `Almacen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AperturaCaja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `AsientoContable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Auditoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Caja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Categoria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CierreCaja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CuentaPorCobrar` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DetalleAsientoContable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DetalleDevolucionCompra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DetalleDevolucionVenta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DetalleFactura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DetalleOrdenCompra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DevolucionCompra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DevolucionVenta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EmpleadoInventario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Factura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Impuesto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Inventario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Moneda` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MovimientoCaja` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `MovimientoInventario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrdenCompra` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Pago` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Producto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductoPromocion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProductoUnidad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Promocion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Proveedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SeriesDocumento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UnidadMedida` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `AperturaCaja` DROP FOREIGN KEY `AperturaCaja_caja_id_fkey`;

-- DropForeignKey
ALTER TABLE `CierreCaja` DROP FOREIGN KEY `CierreCaja_apertura_id_fkey`;

-- DropForeignKey
ALTER TABLE `CuentaPorCobrar` DROP FOREIGN KEY `CuentaPorCobrar_factura_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleAsientoContable` DROP FOREIGN KEY `DetalleAsientoContable_asiento_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleDevolucionCompra` DROP FOREIGN KEY `DetalleDevolucionCompra_devolucion_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleDevolucionCompra` DROP FOREIGN KEY `DetalleDevolucionCompra_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleDevolucionCompra` DROP FOREIGN KEY `DetalleDevolucionCompra_unidad_medida_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleDevolucionVenta` DROP FOREIGN KEY `DetalleDevolucionVenta_devolucion_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleDevolucionVenta` DROP FOREIGN KEY `DetalleDevolucionVenta_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleDevolucionVenta` DROP FOREIGN KEY `DetalleDevolucionVenta_unidad_medida_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleFactura` DROP FOREIGN KEY `DetalleFactura_factura_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleFactura` DROP FOREIGN KEY `DetalleFactura_impuesto_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleFactura` DROP FOREIGN KEY `DetalleFactura_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleFactura` DROP FOREIGN KEY `DetalleFactura_unidad_medida_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleOrdenCompra` DROP FOREIGN KEY `DetalleOrdenCompra_orden_compra_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleOrdenCompra` DROP FOREIGN KEY `DetalleOrdenCompra_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `DetalleOrdenCompra` DROP FOREIGN KEY `DetalleOrdenCompra_unidad_medida_id_fkey`;

-- DropForeignKey
ALTER TABLE `DevolucionCompra` DROP FOREIGN KEY `DevolucionCompra_orden_compra_id_fkey`;

-- DropForeignKey
ALTER TABLE `DevolucionVenta` DROP FOREIGN KEY `DevolucionVenta_factura_id_fkey`;

-- DropForeignKey
ALTER TABLE `EmpleadoInventario` DROP FOREIGN KEY `EmpleadoInventario_inventario_id_fkey`;

-- DropForeignKey
ALTER TABLE `Factura` DROP FOREIGN KEY `Factura_moneda_id_fkey`;

-- DropForeignKey
ALTER TABLE `Factura` DROP FOREIGN KEY `Factura_serie_documento_id_fkey`;

-- DropForeignKey
ALTER TABLE `Inventario` DROP FOREIGN KEY `Inventario_almacen_id_fkey`;

-- DropForeignKey
ALTER TABLE `Inventario` DROP FOREIGN KEY `Inventario_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `MovimientoCaja` DROP FOREIGN KEY `MovimientoCaja_apertura_id_fkey`;

-- DropForeignKey
ALTER TABLE `MovimientoInventario` DROP FOREIGN KEY `MovimientoInventario_inventario_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrdenCompra` DROP FOREIGN KEY `OrdenCompra_moneda_id_fkey`;

-- DropForeignKey
ALTER TABLE `OrdenCompra` DROP FOREIGN KEY `OrdenCompra_proveedor_id_fkey`;

-- DropForeignKey
ALTER TABLE `Pago` DROP FOREIGN KEY `Pago_factura_id_fkey`;

-- DropForeignKey
ALTER TABLE `Producto` DROP FOREIGN KEY `Producto_categoria_id_fkey`;

-- DropForeignKey
ALTER TABLE `Producto` DROP FOREIGN KEY `Producto_impuesto_id_fkey`;

-- DropForeignKey
ALTER TABLE `Producto` DROP FOREIGN KEY `Producto_moneda_id_fkey`;

-- DropForeignKey
ALTER TABLE `Producto` DROP FOREIGN KEY `Producto_unidad_medida_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductoPromocion` DROP FOREIGN KEY `ProductoPromocion_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductoPromocion` DROP FOREIGN KEY `ProductoPromocion_promocion_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductoUnidad` DROP FOREIGN KEY `ProductoUnidad_producto_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProductoUnidad` DROP FOREIGN KEY `ProductoUnidad_unidad_medida_id_fkey`;

-- DropIndex
DROP INDEX `AperturaCaja_caja_id_fkey` ON `AperturaCaja`;

-- DropIndex
DROP INDEX `DetalleAsientoContable_asiento_id_fkey` ON `DetalleAsientoContable`;

-- DropIndex
DROP INDEX `DetalleDevolucionCompra_devolucion_id_fkey` ON `DetalleDevolucionCompra`;

-- DropIndex
DROP INDEX `DetalleDevolucionCompra_producto_id_fkey` ON `DetalleDevolucionCompra`;

-- DropIndex
DROP INDEX `DetalleDevolucionCompra_unidad_medida_id_fkey` ON `DetalleDevolucionCompra`;

-- DropIndex
DROP INDEX `DetalleDevolucionVenta_devolucion_id_fkey` ON `DetalleDevolucionVenta`;

-- DropIndex
DROP INDEX `DetalleDevolucionVenta_producto_id_fkey` ON `DetalleDevolucionVenta`;

-- DropIndex
DROP INDEX `DetalleDevolucionVenta_unidad_medida_id_fkey` ON `DetalleDevolucionVenta`;

-- DropIndex
DROP INDEX `DetalleFactura_factura_id_fkey` ON `DetalleFactura`;

-- DropIndex
DROP INDEX `DetalleFactura_impuesto_id_fkey` ON `DetalleFactura`;

-- DropIndex
DROP INDEX `DetalleFactura_producto_id_fkey` ON `DetalleFactura`;

-- DropIndex
DROP INDEX `DetalleFactura_unidad_medida_id_fkey` ON `DetalleFactura`;

-- DropIndex
DROP INDEX `DetalleOrdenCompra_orden_compra_id_fkey` ON `DetalleOrdenCompra`;

-- DropIndex
DROP INDEX `DetalleOrdenCompra_producto_id_fkey` ON `DetalleOrdenCompra`;

-- DropIndex
DROP INDEX `DetalleOrdenCompra_unidad_medida_id_fkey` ON `DetalleOrdenCompra`;

-- DropIndex
DROP INDEX `DevolucionCompra_orden_compra_id_fkey` ON `DevolucionCompra`;

-- DropIndex
DROP INDEX `DevolucionVenta_factura_id_fkey` ON `DevolucionVenta`;

-- DropIndex
DROP INDEX `EmpleadoInventario_inventario_id_fkey` ON `EmpleadoInventario`;

-- DropIndex
DROP INDEX `Factura_moneda_id_fkey` ON `Factura`;

-- DropIndex
DROP INDEX `Factura_serie_documento_id_fkey` ON `Factura`;

-- DropIndex
DROP INDEX `Inventario_almacen_id_fkey` ON `Inventario`;

-- DropIndex
DROP INDEX `Inventario_producto_id_fkey` ON `Inventario`;

-- DropIndex
DROP INDEX `MovimientoCaja_apertura_id_fkey` ON `MovimientoCaja`;

-- DropIndex
DROP INDEX `MovimientoInventario_inventario_id_fkey` ON `MovimientoInventario`;

-- DropIndex
DROP INDEX `OrdenCompra_moneda_id_fkey` ON `OrdenCompra`;

-- DropIndex
DROP INDEX `OrdenCompra_proveedor_id_fkey` ON `OrdenCompra`;

-- DropIndex
DROP INDEX `Pago_factura_id_fkey` ON `Pago`;

-- DropIndex
DROP INDEX `Producto_categoria_id_fkey` ON `Producto`;

-- DropIndex
DROP INDEX `Producto_impuesto_id_fkey` ON `Producto`;

-- DropIndex
DROP INDEX `Producto_moneda_id_fkey` ON `Producto`;

-- DropIndex
DROP INDEX `Producto_unidad_medida_id_fkey` ON `Producto`;

-- DropIndex
DROP INDEX `ProductoPromocion_producto_id_fkey` ON `ProductoPromocion`;

-- DropIndex
DROP INDEX `ProductoUnidad_unidad_medida_id_fkey` ON `ProductoUnidad`;

-- AlterTable
ALTER TABLE `Almacen` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `AperturaCaja` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `caja_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `AsientoContable` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `documento_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Auditoria` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `registro_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Caja` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Categoria` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CierreCaja` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `apertura_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `CuentaPorCobrar` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `factura_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DetalleAsientoContable` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `asiento_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DetalleDevolucionCompra` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `devolucion_id` VARCHAR(191) NOT NULL,
    MODIFY `producto_id` VARCHAR(191) NOT NULL,
    MODIFY `unidad_medida_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DetalleDevolucionVenta` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `devolucion_id` VARCHAR(191) NOT NULL,
    MODIFY `producto_id` VARCHAR(191) NOT NULL,
    MODIFY `unidad_medida_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DetalleFactura` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `factura_id` VARCHAR(191) NOT NULL,
    MODIFY `producto_id` VARCHAR(191) NOT NULL,
    MODIFY `unidad_medida_id` VARCHAR(191) NOT NULL,
    MODIFY `impuesto_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DetalleOrdenCompra` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `orden_compra_id` VARCHAR(191) NOT NULL,
    MODIFY `producto_id` VARCHAR(191) NOT NULL,
    MODIFY `unidad_medida_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DevolucionCompra` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `orden_compra_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `DevolucionVenta` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `factura_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `EmpleadoInventario` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `inventario_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Factura` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `serie_documento_id` VARCHAR(191) NOT NULL,
    MODIFY `moneda_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Impuesto` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Inventario` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `producto_id` VARCHAR(191) NOT NULL,
    MODIFY `almacen_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Moneda` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `MovimientoCaja` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `apertura_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `MovimientoInventario` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `inventario_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `OrdenCompra` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `proveedor_id` VARCHAR(191) NOT NULL,
    MODIFY `moneda_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Pago` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `factura_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Producto` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `unidad_medida_id` VARCHAR(191) NOT NULL,
    MODIFY `categoria_id` VARCHAR(191) NOT NULL,
    MODIFY `moneda_id` VARCHAR(191) NOT NULL,
    MODIFY `impuesto_id` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `ProductoPromocion` DROP PRIMARY KEY,
    MODIFY `promocion_id` VARCHAR(191) NOT NULL,
    MODIFY `producto_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`promocion_id`, `producto_id`);

-- AlterTable
ALTER TABLE `ProductoUnidad` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `producto_id` VARCHAR(191) NOT NULL,
    MODIFY `unidad_medida_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Promocion` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Proveedor` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `SeriesDocumento` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `UnidadMedida` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

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
ALTER TABLE `MovimientoCaja` ADD CONSTRAINT `MovimientoCaja_apertura_id_fkey` FOREIGN KEY (`apertura_id`) REFERENCES `AperturaCaja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CierreCaja` ADD CONSTRAINT `CierreCaja_apertura_id_fkey` FOREIGN KEY (`apertura_id`) REFERENCES `AperturaCaja`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoPromocion` ADD CONSTRAINT `ProductoPromocion_promocion_id_fkey` FOREIGN KEY (`promocion_id`) REFERENCES `Promocion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductoPromocion` ADD CONSTRAINT `ProductoPromocion_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `Producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CuentaPorCobrar` ADD CONSTRAINT `CuentaPorCobrar_factura_id_fkey` FOREIGN KEY (`factura_id`) REFERENCES `Factura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmpleadoInventario` ADD CONSTRAINT `EmpleadoInventario_inventario_id_fkey` FOREIGN KEY (`inventario_id`) REFERENCES `Inventario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleAsientoContable` ADD CONSTRAINT `DetalleAsientoContable_asiento_id_fkey` FOREIGN KEY (`asiento_id`) REFERENCES `AsientoContable`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
