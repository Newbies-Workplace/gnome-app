
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

CREATE TYPE "userRole" AS ENUM ('ADMIN', 'USER', 'MODERATOR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "discoveredGnomes",
DROP COLUMN "friends",
ADD COLUMN     "role" "userRole" DEFAULT 'USER',
ALTER COLUMN "googleId" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "pictureUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Gnomy" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "location" TEXT,
    "date" TIMESTAMP(3),

    CONSTRAINT "Gnomy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gnomeInteractions" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "gnomyId" TEXT,

    CONSTRAINT "gnomeInteractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friends" (
    "id" TEXT NOT NULL,
    "status" TEXT,
    "userId1" TEXT,
    "userId2" TEXT,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gnomy_id_key" ON "Gnomy"("id");

-- CreateIndex
CREATE UNIQUE INDEX "gnomeInteractions_id_key" ON "gnomeInteractions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "friends_id_key" ON "friends"("id");

-- AddForeignKey
ALTER TABLE "gnomeInteractions" ADD CONSTRAINT "gnomeInteractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gnomeInteractions" ADD CONSTRAINT "gnomeInteractions_gnomyId_fkey" FOREIGN KEY ("gnomyId") REFERENCES "Gnomy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "friends" ALTER COLUMN "status" SET NOT NULL;
