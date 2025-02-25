/*
  Warnings:

  - You are about to drop the column `dateApplied` on the `jobapplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `jobapplication` DROP COLUMN `dateApplied`,
    ADD COLUMN `applyDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
