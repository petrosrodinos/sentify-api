/*
  Warnings:

  - You are about to drop the column `identity_id` on the `notification_channels` table. All the data in the column will be lost.
  - You are about to drop the `_MediaSubscriptionToTrackedItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_NotificationChannelToTrackedItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MediaSubscriptionToTrackedItem" DROP CONSTRAINT "_MediaSubscriptionToTrackedItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_MediaSubscriptionToTrackedItem" DROP CONSTRAINT "_MediaSubscriptionToTrackedItem_B_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationChannelToTrackedItem" DROP CONSTRAINT "_NotificationChannelToTrackedItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_NotificationChannelToTrackedItem" DROP CONSTRAINT "_NotificationChannelToTrackedItem_B_fkey";

-- DropForeignKey
ALTER TABLE "notification_channels" DROP CONSTRAINT "notification_channels_identity_id_fkey";

-- DropForeignKey
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_identity_uuid_fkey";

-- DropIndex
DROP INDEX "verification_tokens_identity_uuid_idx";

-- AlterTable
ALTER TABLE "notification_channels" DROP COLUMN "identity_id";

-- DropTable
DROP TABLE "_MediaSubscriptionToTrackedItem";

-- DropTable
DROP TABLE "_NotificationChannelToTrackedItem";

-- CreateIndex
CREATE INDEX "notification_channels_channel_idx" ON "notification_channels"("channel");
