/*
  Warnings:

  - Made the column `moo` on table `jobapplication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `jobapplication` MODIFY `moo` VARCHAR(191) NOT NULL;
