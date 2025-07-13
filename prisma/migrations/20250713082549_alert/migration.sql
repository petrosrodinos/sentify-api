/*
  Warnings:

  - You are about to drop the column `identity_uuid` on the `verification_tokens` table. All the data in the column will be lost.
  - Changed the type of `tickers` on the `alerts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "TrackedItemType" ADD VALUE 'commodity';

-- AlterTable
ALTER TABLE "alerts" DROP COLUMN "tickers",
ADD COLUMN     "tickers" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "identity_uuid";
