-- CreateEnum
CREATE TYPE "AuthProviderType" AS ENUM ('email', 'phone', 'sms', 'google', 'facebook', 'twitter', 'telegram');

-- CreateEnum
CREATE TYPE "AuthRole" AS ENUM ('admin', 'user', 'support', 'super_admin');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('twitter', 'youtube', 'reddit');

-- CreateEnum
CREATE TYPE "NotificationChannelType" AS ENUM ('email', 'phone', 'sms', 'push', 'web', 'telegram', 'whatsapp', 'slack', 'discord');

-- CreateEnum
CREATE TYPE "TrackedItemType" AS ENUM ('stock', 'crypto', 'keyword');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "AuthRole" NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identities" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "provider" "AuthProviderType" NOT NULL,
    "provider_id" TEXT,
    "access_token" TEXT,
    "refresh_token" TEXT,
    "password" TEXT,
    "expires_at" INTEGER,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "identities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT,
    "token" TEXT NOT NULL,
    "state" TEXT,
    "type" "AuthProviderType" NOT NULL,
    "client_identifier" TEXT,
    "identity_uuid" TEXT,
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_subscriptions" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "platform_type" "PlatformType" NOT NULL,
    "account_identifier" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_channels" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "channel" "NotificationChannelType" NOT NULL,
    "client_identifier" TEXT,
    "web_push_config" JSONB,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "meta" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tickers" TEXT[],
    "sentiment" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "post_ids" TEXT[],
    "platform_type" "PlatformType" NOT NULL,
    "account_identifier" TEXT NOT NULL,
    "account_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_alerts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "alert_id" INTEGER NOT NULL,
    "notification_channels" "NotificationChannelType"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_alerts_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_uuid_idx" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "identities_uuid_key" ON "identities"("uuid");

-- CreateIndex
CREATE INDEX "identities_provider_id_idx" ON "identities"("provider_id");

-- CreateIndex
CREATE INDEX "identities_user_uuid_idx" ON "identities"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "identities_provider_provider_id_key" ON "identities"("provider", "provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_uuid_key" ON "verification_tokens"("uuid");

-- CreateIndex
CREATE INDEX "verification_tokens_token_idx" ON "verification_tokens"("token");

-- CreateIndex
CREATE INDEX "verification_tokens_user_uuid_idx" ON "verification_tokens"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "media_subscriptions_uuid_key" ON "media_subscriptions"("uuid");

-- CreateIndex
CREATE INDEX "media_subscriptions_user_uuid_idx" ON "media_subscriptions"("user_uuid");

-- CreateIndex
CREATE INDEX "media_subscriptions_platform_type_idx" ON "media_subscriptions"("platform_type");

-- CreateIndex
CREATE INDEX "media_subscriptions_account_identifier_idx" ON "media_subscriptions"("account_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "media_subscriptions_user_uuid_platform_type_account_identif_key" ON "media_subscriptions"("user_uuid", "platform_type", "account_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "notification_channels_uuid_key" ON "notification_channels"("uuid");

-- CreateIndex
CREATE INDEX "notification_channels_user_uuid_idx" ON "notification_channels"("user_uuid");

-- CreateIndex
CREATE INDEX "notification_channels_channel_idx" ON "notification_channels"("channel");

-- CreateIndex
CREATE UNIQUE INDEX "notification_channels_user_uuid_channel_key" ON "notification_channels"("user_uuid", "channel");

-- CreateIndex
CREATE UNIQUE INDEX "alerts_uuid_key" ON "alerts"("uuid");

-- CreateIndex
CREATE INDEX "alerts_platform_type_idx" ON "alerts"("platform_type");

-- CreateIndex
CREATE INDEX "alerts_account_identifier_idx" ON "alerts"("account_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "user_alerts_uuid_key" ON "user_alerts"("uuid");

-- CreateIndex
CREATE INDEX "user_alerts_user_uuid_idx" ON "user_alerts"("user_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tracked_items_uuid_key" ON "tracked_items"("uuid");

-- CreateIndex
CREATE INDEX "tracked_items_user_uuid_idx" ON "tracked_items"("user_uuid");

-- CreateIndex
CREATE INDEX "tracked_items_item_type_idx" ON "tracked_items"("item_type");

-- CreateIndex
CREATE INDEX "tracked_items_item_identifier_idx" ON "tracked_items"("item_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "tracked_items_user_uuid_item_type_item_identifier_key" ON "tracked_items"("user_uuid", "item_type", "item_identifier");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_subscriptions" ADD CONSTRAINT "media_subscriptions_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_channels" ADD CONSTRAINT "notification_channels_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_alerts" ADD CONSTRAINT "user_alerts_alert_id_fkey" FOREIGN KEY ("alert_id") REFERENCES "alerts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_alerts" ADD CONSTRAINT "user_alerts_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracked_items" ADD CONSTRAINT "tracked_items_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
