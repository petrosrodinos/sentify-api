/*
  Warnings:

  - Changed the type of `type` on the `verification_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "verification_tokens" DROP COLUMN "type",
ADD COLUMN     "type" "Provider" NOT NULL;

-- DropEnum
DROP TYPE "VerificationType";
