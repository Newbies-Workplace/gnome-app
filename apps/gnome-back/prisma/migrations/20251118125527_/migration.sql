/*
  Warnings:

  - Changed the type of `points` on the `Districts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `bbox` on the `Districts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Districts" DROP COLUMN "points",
ADD COLUMN     "points" JSONB NOT NULL,
DROP COLUMN "bbox",
ADD COLUMN     "bbox" JSONB NOT NULL;
