export interface TwitterUser {
    id: string;
    name: string;
    screen_name: string;
    profile_image_url: string;
    description: string;
    url?: string;
}

export interface FormattedTweet {
    id: string;
    full_text: string;
    created_at: string;
    retweet_count: number;
    reply_count: number;
    like_count: number;
    bookmark_count: number;
    view_count: string;
    user: {
        screen_name: string;
        name: string;
        profile_image_url: string;
    };
    hashtags: string[];
    urls: string[];
    user_mentions: string[];
    card?: {
        title?: string;
        description?: string;
        domain?: string;
        imageUrl?: string;
    };
}
