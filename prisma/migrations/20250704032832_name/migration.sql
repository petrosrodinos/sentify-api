/*
  Warnings:

  - The values [phone] on the enum `NotificationChannelType` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `provider` on the `identities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `verification_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AuthProviderType" AS ENUM ('email', 'phone', 'google', 'facebook', 'twitter', 'telegram');

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationChannelType_new" AS ENUM ('email', 'phone_call', 'push', 'web', 'telegram', 'whatsapp', 'slack', 'discord');
ALTER TABLE "notification_channels" ALTER COLUMN "channel" TYPE "NotificationChannelType_new" USING ("channel"::text::"NotificationChannelType_new");
ALTER TYPE "NotificationChannelType" RENAME TO "NotificationChannelType_old";
ALTER TYPE "NotificationChannelType_new" RENAME TO "NotificationChannelType";
DROP TYPE "NotificationChannelType_old";
COMMIT;

-- AlterTable
ALTER TABLE "identities" DROP COLUMN "provider",
ADD COLUMN     "provider" "AuthProviderType" NOT NULL;

-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "type",
ADD COLUMN     "type" "AuthProviderType" NOT NULL;

-- DropEnum
DROP TYPE "AuthProvider";

-- CreateIndex
CREATE UNIQUE INDEX "identities_provider_provider_id_key" ON "identities"("provider", "provider_id");
