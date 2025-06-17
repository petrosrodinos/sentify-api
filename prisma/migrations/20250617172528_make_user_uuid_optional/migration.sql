-- DropForeignKey
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_user_uuid_fkey";

-- AlterTable
ALTER TABLE "verification_tokens" ALTER COLUMN "user_uuid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
