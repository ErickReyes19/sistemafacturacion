/*
  Warnings:

  - You are about to alter the column `estado` on the `OrdenCompra` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Enum(EnumId(4))`.
  - Added the required column `almacen_id` to the `OrdenCompra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrdenCompra` ADD COLUMN `almacen_id` VARCHAR(191) NOT NULL,
    MODIFY `estado` ENUM('pendiente', 'aprobada', 'recibida', 'anulada') NOT NULL DEFAULT 'pendiente';

-- AddForeignKey
ALTER TABLE `OrdenCompra` ADD CONSTRAINT `OrdenCompra_almacen_id_fkey` FOREIGN KEY (`almacen_id`) REFERENCES `Almacen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
