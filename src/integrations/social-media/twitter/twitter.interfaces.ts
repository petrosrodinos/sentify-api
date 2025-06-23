export interface TwitterUser {
    id: string;
    name: string;
    screenName: string;
    profile_image_url: string;
    description: string;
    url?: string;
}

export interface FormattedTweet {
    id: string;
    fullText: string;
    createdAt: string;
    retweetCount: number;
    replyCount: number;
    likeCount: number;
    bookmarkCount: number;
    viewCount: string;
    user: {
        screenName: string;
        name: string;
        profileImageUrl: string;
    };
    hashtags: string[];
    urls: string[];
    userMentions: string[];
    card?: {
        title?: string;
        description?: string;
        domain?: string;
        imageUrl?: string;
    };
}
