/*
  Warnings:

  - The values [EMAIL,PHONE,GOOGLE,FACEBOOK] on the enum `Provider` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[provider,provider_id]` on the table `identities` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Provider_new" AS ENUM ('email', 'phone', 'google', 'facebook');
ALTER TABLE "identities" ALTER COLUMN "provider" TYPE "Provider_new" USING ("provider"::text::"Provider_new");
ALTER TYPE "Provider" RENAME TO "Provider_old";
ALTER TYPE "Provider_new" RENAME TO "Provider";
DROP TYPE "Provider_old";
COMMIT;

-- DropIndex
DROP INDEX "identities_user_uuid_provider_provider_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "identities_provider_provider_id_key" ON "identities"("provider", "provider_id");
