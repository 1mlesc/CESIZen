/*
  Warnings:

  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "typeMedia" AS ENUM ('VIDEO', 'IMAGE', 'AUDIO');

-- CreateEnum
CREATE TYPE "typeContenu" AS ENUM ('ARTICLE');

-- CreateEnum
CREATE TYPE "statutContenu" AS ENUM ('PUBLISHED', 'DRAFT', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "nomCategorie" AS ENUM ('SANTE', 'AIDE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" "roles" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciceRespiratoire" (
    "id" TEXT NOT NULL,
    "duree" DOUBLE PRECISION NOT NULL,
    "rythme_inspiration" DOUBLE PRECISION NOT NULL,
    "rythme_expiration" DOUBLE PRECISION NOT NULL,
    "rythme_apnee" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciceRespiratoire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoriqueExerciceRespiratoire" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "exerciceRespiratoireId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HistoriqueExerciceRespiratoire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "name" "nomCategorie" NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contenu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "corps" TEXT NOT NULL,
    "type" "typeContenu" NOT NULL,
    "statut" "statutContenu" NOT NULL DEFAULT 'DRAFT',
    "date_publication" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "auteurId" TEXT NOT NULL,

    CONSTRAINT "Contenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategorieToContenu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategorieToContenu_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_name_key" ON "Categorie"("name");

-- CreateIndex
CREATE INDEX "_CategorieToContenu_B_index" ON "_CategorieToContenu"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoriqueExerciceRespiratoire" ADD CONSTRAINT "HistoriqueExerciceRespiratoire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contenu" ADD CONSTRAINT "Contenu_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorieToContenu" ADD CONSTRAINT "_CategorieToContenu_A_fkey" FOREIGN KEY ("A") REFERENCES "Categorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategorieToContenu" ADD CONSTRAINT "_CategorieToContenu_B_fkey" FOREIGN KEY ("B") REFERENCES "Contenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
