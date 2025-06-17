/*
  Warnings:

  - Added the required column `identity_uuid` to the `verification_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "verification_tokens" ADD COLUMN     "identity_uuid" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "verification_tokens_identity_uuid_idx" ON "verification_tokens"("identity_uuid");

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_identity_uuid_fkey" FOREIGN KEY ("identity_uuid") REFERENCES "identities"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
