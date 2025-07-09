-- CreateEnum
CREATE TYPE "AuthRole" AS ENUM ('admin', 'user', 'support', 'super_admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "AuthRole" NOT NULL DEFAULT 'user';
