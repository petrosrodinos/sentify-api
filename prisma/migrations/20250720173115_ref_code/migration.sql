/*
  Warnings:

  - You are about to drop the column `ref` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "ref",
ADD COLUMN     "ref_code" TEXT DEFAULT '';
