/*
  Warnings:

  - You are about to drop the column `employeeId` on the `leave` table. All the data in the column will be lost.
  - Added the required column `employeeName` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `leave` DROP FOREIGN KEY `Leave_employeeId_fkey`;

-- DropIndex
DROP INDEX `Leave_employeeId_fkey` ON `leave`;

-- AlterTable
ALTER TABLE `leave` DROP COLUMN `employeeId`,
    ADD COLUMN `employeeName` VARCHAR(191) NOT NULL;
