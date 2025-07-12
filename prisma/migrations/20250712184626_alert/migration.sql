-- AddForeignKey
ALTER TABLE "user_alerts" ADD CONSTRAINT "user_alerts_alert_uuid_fkey" FOREIGN KEY ("alert_uuid") REFERENCES "alerts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
