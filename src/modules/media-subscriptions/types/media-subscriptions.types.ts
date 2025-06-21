import { MediaPlatformType } from "../enums/media-subscriptions.enums";

export type MediaSubscriptionQuery = {
    id?: number;
    user_uuid?: string;
    platform_type?: MediaPlatformType;
    account_identifier?: string;
    notifications_enabled?: boolean;
};
