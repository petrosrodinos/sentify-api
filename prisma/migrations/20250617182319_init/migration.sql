-- AlterTable
ALTER TABLE "identities" ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "refresh_token" TEXT,
ALTER COLUMN "provider_id" DROP NOT NULL;
