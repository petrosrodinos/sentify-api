export interface TwitterUser {
    id: string;
    name: string;
    screen_name: string;
    profile_image_url: string;
    description: string;
    url?: string;
    verified?: boolean;
}

export interface FormattedTweet {
    id?: string;
    full_text: string;
    platform_type?: string;
    created_at?: string;
    retweet_count?: number;
    reply_count?: number;
    like_count?: number;
    view_count?: number;
    user: {
        screen_name: string;
        name: string;
        user_id?: string;
    };
    urls?: string[];
}

export interface RapidApiTwitterEndpoints {
    USER_BY_USERNAME: string;
    USER_FOLLOWINGS: string;
    USER_TWEETS: string;
    USER_SEARCH: string;
}

export interface PostTweet {
    text: string;
    media_ids?: string[];
}

export interface UploadMedia {
    file: Buffer;
    mime_type: string;
}
