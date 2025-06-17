/*
  Warnings:

  - The `expires_at` column on the `identities` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "identities" DROP COLUMN "expires_at",
ADD COLUMN     "expires_at" INTEGER;
