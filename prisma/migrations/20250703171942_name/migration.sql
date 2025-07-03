-- AlterEnum
ALTER TYPE "AuthProvider" ADD VALUE 'telegram';

-- AlterTable
ALTER TABLE "verification_tokens" ALTER COLUMN "state" DROP NOT NULL;
