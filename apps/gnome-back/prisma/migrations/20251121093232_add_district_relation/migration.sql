-- AlterTable
ALTER TABLE "Gnome" ADD COLUMN     "districtId" INTEGER;

-- AddForeignKey
ALTER TABLE "Gnome" ADD CONSTRAINT "Gnome_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "Districts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
