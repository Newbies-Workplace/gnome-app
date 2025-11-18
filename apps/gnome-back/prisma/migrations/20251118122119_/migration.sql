/*
  Warnings:

  - The `points` column on the `Districts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bbox` column on the `Districts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Districts" DROP COLUMN "points",
ADD COLUMN     "points" DOUBLE PRECISION[],
DROP COLUMN "bbox",
ADD COLUMN     "bbox" DOUBLE PRECISION[];
