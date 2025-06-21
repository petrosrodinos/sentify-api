/*
  Warnings:

  - You are about to drop the column `verification_status` on the `notification_channels` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_uuid,channel]` on the table `notification_channels` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "notification_channels" DROP COLUMN "verification_status",
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "notification_channels_user_uuid_channel_key" ON "notification_channels"("user_uuid", "channel");
