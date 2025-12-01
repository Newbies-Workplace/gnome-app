-- CreateEnum
CREATE TYPE "BuildingType" AS ENUM ('WATCHTOWER', 'MINE');

-- CreateEnum
CREATE TYPE "BuildingInteractionType" AS ENUM ('ATTACK', 'EMPOWER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'MODERATOR');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "Team" AS ENUM ('TEAM1', 'TEAM2', 'TEAM3');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "Team" "Team",
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserResource" (
    "berries" INTEGER DEFAULT 0,
    "sticks" INTEGER DEFAULT 0,
    "stones" INTEGER DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserResource_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Gnome" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "funFact" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "exists" BOOLEAN NOT NULL DEFAULT true,
    "pictureUrl" TEXT NOT NULL,
    "districtId" INTEGER,

    CONSTRAINT "Gnome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "gnomeName" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "reportAuthor" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GnomeInteraction" (
    "id" TEXT NOT NULL,
    "interactionDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "gnomeId" TEXT NOT NULL,

    CONSTRAINT "GnomeInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "gnomeCount" INTEGER NOT NULL,
    "Health" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "District" TEXT NOT NULL,
    "Type" "BuildingType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingInteraction" (
    "id" TEXT NOT NULL,
    "interactionType" "BuildingInteractionType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "BuildingInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "points" JSONB NOT NULL,
    "minX" DOUBLE PRECISION NOT NULL,
    "maxX" DOUBLE PRECISION NOT NULL,
    "minY" DOUBLE PRECISION NOT NULL,
    "maxY" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_inviteCode_key" ON "User"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "UserResource_userId_key" ON "UserResource"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Gnome_id_key" ON "Gnome"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_id_key" ON "Achievement"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GnomeInteraction_id_key" ON "GnomeInteraction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_id_key" ON "Friendship"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Building_id_key" ON "Building"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BuildingInteraction_id_key" ON "BuildingInteraction"("id");

-- AddForeignKey
ALTER TABLE "UserResource" ADD CONSTRAINT "UserResource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gnome" ADD CONSTRAINT "Gnome_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAchievement" ADD CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GnomeInteraction" ADD CONSTRAINT "GnomeInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GnomeInteraction" ADD CONSTRAINT "GnomeInteraction_gnomeId_fkey" FOREIGN KEY ("gnomeId") REFERENCES "Gnome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuildingInteraction" ADD CONSTRAINT "BuildingInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
