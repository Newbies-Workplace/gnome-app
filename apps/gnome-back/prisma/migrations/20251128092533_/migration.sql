/*
  Warnings:

  - You are about to drop the column `Type` on the `Building` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."UserResource" DROP CONSTRAINT "UserResource_userId_fkey";

-- AlterTable
ALTER TABLE "Building" DROP COLUMN "Type",
ADD COLUMN     "type" "BuildingType" NOT NULL DEFAULT 'MINE';

-- AddForeignKey
ALTER TABLE "UserResource" ADD CONSTRAINT "UserResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
