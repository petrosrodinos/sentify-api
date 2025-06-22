/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `notification_channels` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TrackedItemType" AS ENUM ('stock', 'crypto', 'keyword');

-- AlterTable
ALTER TABLE "notification_channels" ADD COLUMN     "uuid" TEXT;

-- CreateTable
CREATE TABLE "tracked_items" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "item_type" "TrackedItemType" NOT NULL,
    "item_identifier" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracked_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MediaSubscriptionToTrackedItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MediaSubscriptionToTrackedItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_NotificationChannelToTrackedItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NotificationChannelToTrackedItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "tracked_items_uuid_key" ON "tracked_items"("uuid");

-- CreateIndex
CREATE INDEX "tracked_items_user_uuid_idx" ON "tracked_items"("user_uuid");

-- CreateIndex
CREATE INDEX "tracked_items_item_type_idx" ON "tracked_items"("item_type");

-- CreateIndex
CREATE UNIQUE INDEX "tracked_items_user_uuid_item_type_item_identifier_key" ON "tracked_items"("user_uuid", "item_type", "item_identifier");

-- CreateIndex
CREATE INDEX "_MediaSubscriptionToTrackedItem_B_index" ON "_MediaSubscriptionToTrackedItem"("B");

-- CreateIndex
CREATE INDEX "_NotificationChannelToTrackedItem_B_index" ON "_NotificationChannelToTrackedItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "notification_channels_uuid_key" ON "notification_channels"("uuid");

-- AddForeignKey
ALTER TABLE "tracked_items" ADD CONSTRAINT "tracked_items_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaSubscriptionToTrackedItem" ADD CONSTRAINT "_MediaSubscriptionToTrackedItem_A_fkey" FOREIGN KEY ("A") REFERENCES "media_subscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MediaSubscriptionToTrackedItem" ADD CONSTRAINT "_MediaSubscriptionToTrackedItem_B_fkey" FOREIGN KEY ("B") REFERENCES "tracked_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationChannelToTrackedItem" ADD CONSTRAINT "_NotificationChannelToTrackedItem_A_fkey" FOREIGN KEY ("A") REFERENCES "notification_channels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NotificationChannelToTrackedItem" ADD CONSTRAINT "_NotificationChannelToTrackedItem_B_fkey" FOREIGN KEY ("B") REFERENCES "tracked_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
