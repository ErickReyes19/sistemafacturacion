/*
  Warnings:

  - You are about to drop the column `contacto` on the `Proveedor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Proveedor` DROP COLUMN `contacto`,
    ADD COLUMN `activo` BOOLEAN NOT NULL DEFAULT true;
