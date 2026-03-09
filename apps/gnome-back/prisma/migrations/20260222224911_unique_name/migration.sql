/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Gnome` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Gnome_name_key" ON "Gnome"("name");
