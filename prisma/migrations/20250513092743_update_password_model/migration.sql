/*
  Warnings:

  - Added the required column `title` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Password" ADD COLUMN     "title" TEXT NOT NULL;
