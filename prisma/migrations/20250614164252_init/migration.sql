/*
  Warnings:

  - You are about to drop the column `user_id` on the `identities` table. All the data in the column will be lost.
  - Added the required column `user_uuid` to the `identities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "identities" DROP CONSTRAINT "identities_user_id_fkey";

-- DropIndex
DROP INDEX "identities_user_id_idx";

-- AlterTable
ALTER TABLE "identities" DROP COLUMN "user_id",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "identities_user_uuid_idx" ON "identities"("user_uuid");

-- AddForeignKey
ALTER TABLE "identities" ADD CONSTRAINT "identities_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
