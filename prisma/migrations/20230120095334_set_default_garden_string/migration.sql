/*
  Warnings:

  - You are about to alter the column `garden` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `garden` VARCHAR(191) NOT NULL DEFAULT '';
