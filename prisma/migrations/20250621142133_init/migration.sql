-- AddForeignKey
ALTER TABLE "notification_channels" ADD CONSTRAINT "notification_channels_identity_id_fkey" FOREIGN KEY ("identity_id") REFERENCES "identities"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
