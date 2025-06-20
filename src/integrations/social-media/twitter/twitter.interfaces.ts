export interface TwitterUserFollowings {
    id: string;
    name: string;
    screenName: string;
    profileImageUrl: string;
    description: string;
    isVerified: boolean;
    isProtected: boolean;
    location?: string;
    profileBannerUrl?: string;
    url?: string;
}