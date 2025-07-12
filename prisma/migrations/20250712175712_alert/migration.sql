-- CreateTable
CREATE TABLE "alerts" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tickers" "TrackedItemType"[],
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
    "alert_uuid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_alerts_pkey" PRIMARY KEY ("id")
);

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
CREATE INDEX "user_alerts_alert_uuid_idx" ON "user_alerts"("alert_uuid");

-- CreateIndex
CREATE INDEX "media_subscriptions_account_identifier_idx" ON "media_subscriptions"("account_identifier");

-- CreateIndex
CREATE INDEX "tracked_items_item_identifier_idx" ON "tracked_items"("item_identifier");
