/*
  Warnings:

  - You are about to drop the column `primary_email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `primary_phone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_primary_email_idx";

-- DropIndex
DROP INDEX "users_primary_email_key";

-- DropIndex
DROP INDEX "users_primary_phone_idx";

-- DropIndex
DROP INDEX "users_primary_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "primary_email",
DROP COLUMN "primary_phone",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");
