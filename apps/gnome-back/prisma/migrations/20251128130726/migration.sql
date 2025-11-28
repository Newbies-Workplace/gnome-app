/*
  Warnings:

  - You are about to drop the column `pictureUrl` on the `Achievement` table. All the data in the column will be lost.
  - The primary key for the `UserAchievement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,achievementId]` on the table `UserAchievement` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `UserAchievement` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "UserAchievement" DROP CONSTRAINT "UserAchievement_userId_fkey";

-- AlterTable
ALTER TABLE "Achievement" DROP COLUMN "pictureUrl";

-- AlterTable
ALTER TABLE "UserAchievement" DROP CONSTRAINT "UserAchievement_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserAchievement_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
