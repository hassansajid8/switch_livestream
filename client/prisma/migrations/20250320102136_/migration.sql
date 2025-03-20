/*
  Warnings:

  - A unique constraint covering the columns `[streamkey]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `streamkey` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "streamkey" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_streamkey_key" ON "User"("streamkey");
