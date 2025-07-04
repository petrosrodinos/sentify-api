/*
  Warnings:

  - The values [phone_call] on the enum `NotificationChannelType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationChannelType_new" AS ENUM ('email', 'phone', 'push', 'web', 'telegram', 'whatsapp', 'slack', 'discord');
ALTER TABLE "notification_channels" ALTER COLUMN "channel" TYPE "NotificationChannelType_new" USING ("channel"::text::"NotificationChannelType_new");
ALTER TYPE "NotificationChannelType" RENAME TO "NotificationChannelType_old";
ALTER TYPE "NotificationChannelType_new" RENAME TO "NotificationChannelType";
DROP TYPE "NotificationChannelType_old";
COMMIT;
