import { ApiProperty } from '@nestjs/swagger';

export class TwitterTweet {
    @ApiProperty({
        description: 'Tweet ID',
        example: '1234567890123456789'
    })
    id: string;

    @ApiProperty({
        description: 'Full text content of the tweet',
        example: 'Just published a new blog post about #NestJS and #TypeScript! Check it out 🚀'
    })
    full_text: string;

    @ApiProperty({
        description: 'Tweet creation timestamp',
        example: '2024-01-01T12:00:00.000Z'
    })
    created_at: string;

    @ApiProperty({
        description: 'Number of retweets',
        example: 42
    })
    retweet_count: number;

    @ApiProperty({
        description: 'Number of replies',
        example: 15
    })
    reply_count: number;

    @ApiProperty({
        description: 'Number of likes',
        example: 128
    })
    like_count: number;

    @ApiProperty({
        description: 'Number of bookmarks',
        example: 8
    })
    bookmark_count: number;

    @ApiProperty({
        description: 'Number of views',
        example: '1.2K'
    })
    view_count: string;

    @ApiProperty({
        description: 'User information',
        type: 'object',
        properties: {
            screen_name: { type: 'string', example: 'johndoe' },
            name: { type: 'string', example: 'John Doe' },
            profile_image_url: { type: 'string', example: 'https://pbs.twimg.com/profile_images/1234567890/avatar.jpg' }
        }
    })
    user: {
        screen_name: string;
        name: string;
        profile_image_url: string;
    };

    @ApiProperty({
        description: 'Array of hashtags found in the tweet',
        example: ['NestJS', 'TypeScript', 'WebDevelopment'],
        type: [String]
    })
    hashtags: string[];

    @ApiProperty({
        description: 'Array of URLs found in the tweet',
        example: ['https://example.com/blog-post'],
        type: [String]
    })
    urls: string[];

    @ApiProperty({
        description: 'Array of user mentions in the tweet',
        example: ['@techguru', '@webdev'],
        type: [String]
    })
    user_mentions: string[];

    @ApiProperty({
        description: 'Card information for linked content',
        type: 'object',
        properties: {
            title: { type: 'string', example: 'My Blog Post Title' },
            description: { type: 'string', example: 'A brief description of the linked content' },
            domain: { type: 'string', example: 'example.com' },
            imageUrl: { type: 'string', example: 'https://example.com/image.jpg' }
        }
    })
    card?: {
        title?: string;
        description?: string;
        domain?: string;
        imageUrl?: string;
    };
} 