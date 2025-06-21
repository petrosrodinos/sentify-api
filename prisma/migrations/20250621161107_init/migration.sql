/*
  Warnings:

  - You are about to drop the column `notifications_enabled` on the `media_subscriptions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media_subscriptions" DROP COLUMN "notifications_enabled",
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "meta" JSONB;
