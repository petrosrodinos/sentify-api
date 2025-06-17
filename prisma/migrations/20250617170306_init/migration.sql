/*
  Warnings:

  - Changed the type of `provider` on the `identities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `verification_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('email', 'phone', 'google', 'facebook', 'twitter');

-- DropForeignKey
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_identity_uuid_fkey";

-- AlterTable
ALTER TABLE "identities" DROP COLUMN "provider",
ADD COLUMN     "provider" "AuthProvider" NOT NULL;

-- AlterTable
ALTER TABLE "verification_tokens" ALTER COLUMN "expires_at" DROP NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "AuthProvider" NOT NULL,
ALTER COLUMN "identity_uuid" DROP NOT NULL;

-- DropEnum
DROP TYPE "Provider";

-- CreateIndex
CREATE UNIQUE INDEX "identities_provider_provider_id_key" ON "identities"("provider", "provider_id");

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_identity_uuid_fkey" FOREIGN KEY ("identity_uuid") REFERENCES "identities"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
