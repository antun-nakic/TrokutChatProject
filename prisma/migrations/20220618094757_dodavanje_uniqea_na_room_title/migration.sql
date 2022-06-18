/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Room_title_key` ON `Room`(`title`);
