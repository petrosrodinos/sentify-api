/*
  Warnings:

  - The `tickers` column on the `alerts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "alerts" DROP COLUMN "tickers",
ADD COLUMN     "tickers" TEXT[];
