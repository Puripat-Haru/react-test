-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobApplication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dateApplied` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `desiredPosition` VARCHAR(191) NOT NULL,
    `expectedSalary` INTEGER NOT NULL,
    `idCardCopy` BOOLEAN NOT NULL,
    `houseRegistration` BOOLEAN NOT NULL,
    `certificateCopy` BOOLEAN NOT NULL,
    `bankBookCopy` BOOLEAN NOT NULL,
    `otherDocuments` BOOLEAN NOT NULL,
    `houseNumber` VARCHAR(191) NOT NULL,
    `moo` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `subDistrict` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,
    `age` INTEGER NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `ethnicity` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `militaryStatus` VARCHAR(191) NOT NULL,
    `maritalStatus` VARCHAR(191) NOT NULL,
    `livingStatus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
