/*
  Warnings:

  - Added the required column `userPicture` to the `GnomeInteraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GnomeInteraction" ADD COLUMN     "userPicture" TEXT NOT NULL;
