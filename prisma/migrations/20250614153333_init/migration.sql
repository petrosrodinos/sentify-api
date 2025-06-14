-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('EMAIL', 'PHONE', 'GOOGLE', 'FACEBOOK');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "primary_email" TEXT,
    "primary_phone" TEXT,
    "hashed_password" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identities" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "provider" "Provider" NOT NULL,
    "provider_id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "identities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_primary_email_key" ON "users"("primary_email");

-- CreateIndex
CREATE UNIQUE INDEX "users_primary_phone_key" ON "users"("primary_phone");

-- CreateIndex
CREATE INDEX "users_primary_email_idx" ON "users"("primary_email");

-- CreateIndex
CREATE INDEX "users_primary_phone_idx" ON "users"("primary_phone");

-- CreateIndex
CREATE INDEX "users_uuid_idx" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "identities_uuid_key" ON "identities"("uuid");

-- CreateIndex
CREATE INDEX "identities_provider_id_idx" ON "identities"("provider_id");

-- CreateIndex
CREATE INDEX "identities_user_id_idx" ON "identities"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "identities_provider_provider_id_key" ON "identities"("provider", "provider_id");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
