-- CreateEnum
CREATE TYPE "NotificationChannelType" AS ENUM ('email', 'phone', 'push', 'web', 'telegram', 'whatsapp', 'slack', 'discord');

-- CreateTable
CREATE TABLE "notification_channels" (
    "id" SERIAL NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "channel" "NotificationChannelType" NOT NULL,
    "identity_id" TEXT,
    "client_identifier" TEXT,
    "web_push_config" JSONB,
    "verification_status" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notification_channels_user_uuid_idx" ON "notification_channels"("user_uuid");

-- AddForeignKey
ALTER TABLE "notification_channels" ADD CONSTRAINT "notification_channels_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
