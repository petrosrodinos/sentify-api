-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('twitter', 'youtube', 'reddit');

-- DropForeignKey
ALTER TABLE "identities" DROP CONSTRAINT "identities_user_uuid_fkey";

-- DropForeignKey
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_user_uuid_fkey";

-- CreateTable
CREATE TABLE "media_subscriptions" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_uuid" TEXT NOT NULL,
    "platform_type" "PlatformType" NOT NULL,
    "account_identifier" TEXT NOT NULL,
    "notifications_enabled" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_subscriptions_uuid_key" ON "media_subscriptions"("uuid");

-- CreateIndex
CREATE INDEX "media_subscriptions_user_uuid_idx" ON "media_subscriptions"("user_uuid");

-- CreateIndex
CREATE INDEX "media_subscriptions_platform_type_idx" ON "media_subscriptions"("platform_type");

-- CreateIndex
CREATE UNIQUE INDEX "media_subscriptions_user_uuid_platform_type_account_identif_key" ON "media_subscriptions"("user_uuid", "platform_type", "account_identifier");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_subscriptions" ADD CONSTRAINT "media_subscriptions_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
