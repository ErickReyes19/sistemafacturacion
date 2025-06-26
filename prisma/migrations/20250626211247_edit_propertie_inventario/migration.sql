/*
  Warnings:

  - A unique constraint covering the columns `[producto_id,almacen_id]` on the table `Inventario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Inventario_producto_id_almacen_id_key` ON `Inventario`(`producto_id`, `almacen_id`);
