-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `pass` VARCHAR(30) NOT NULL,
    `avatar` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,
    `desc` TEXT NOT NULL,
    `type` ENUM('PUBLIC', 'PRIVATE', 'PERSONAL') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Joined` (
    `id_u` INTEGER NOT NULL,
    `id_r` INTEGER NOT NULL,

    PRIMARY KEY (`id_u`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sub_Priv` (
    `id_u` INTEGER NOT NULL,
    `id_r` INTEGER NOT NULL,

    PRIMARY KEY (`id_u`, `id_r`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sub_Pers` (
    `id_u1` INTEGER NOT NULL,
    `id_u2` INTEGER NOT NULL,
    `id_r` INTEGER NOT NULL,

    PRIMARY KEY (`id_u1`, `id_u2`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_u` INTEGER NOT NULL,
    `id_r` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Joined` ADD CONSTRAINT `Joined_id_u_fkey` FOREIGN KEY (`id_u`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Joined` ADD CONSTRAINT `Joined_id_r_fkey` FOREIGN KEY (`id_r`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sub_Priv` ADD CONSTRAINT `Sub_Priv_id_u_fkey` FOREIGN KEY (`id_u`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sub_Priv` ADD CONSTRAINT `Sub_Priv_id_r_fkey` FOREIGN KEY (`id_r`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sub_Pers` ADD CONSTRAINT `Sub_Pers_id_u1_fkey` FOREIGN KEY (`id_u1`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sub_Pers` ADD CONSTRAINT `Sub_Pers_id_u2_fkey` FOREIGN KEY (`id_u2`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sub_Pers` ADD CONSTRAINT `Sub_Pers_id_r_fkey` FOREIGN KEY (`id_r`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_id_u_fkey` FOREIGN KEY (`id_u`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_id_r_fkey` FOREIGN KEY (`id_r`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
