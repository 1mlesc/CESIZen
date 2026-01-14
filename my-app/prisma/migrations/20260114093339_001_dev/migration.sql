-- CreateEnum
CREATE TYPE "statut" AS ENUM ('ON', 'OFF');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "statut" "statut" NOT NULL DEFAULT 'ON',
    "token_reset" TEXT,
    "token_expiration" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
