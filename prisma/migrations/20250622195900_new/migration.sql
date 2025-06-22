/*
  Warnings:

  - Made the column `uuid` on table `notification_channels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "notification_channels" ALTER COLUMN "uuid" SET NOT NULL;
