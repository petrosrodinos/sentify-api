/*
  Warnings:

  - A unique constraint covering the columns `[user_uuid,provider,provider_id]` on the table `identities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "identities_provider_provider_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "identities_user_uuid_provider_provider_id_key" ON "identities"("user_uuid", "provider", "provider_id");
