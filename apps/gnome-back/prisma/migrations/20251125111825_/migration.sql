/*
  Warnings:

  - You are about to drop the column `berrys` on the `UserResource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserResource" DROP COLUMN "berrys",
ADD COLUMN     "berries" INTEGER DEFAULT 0,
ALTER COLUMN "sticks" DROP NOT NULL,
ALTER COLUMN "stones" DROP NOT NULL;
