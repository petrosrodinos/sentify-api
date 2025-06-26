import { ApiProperty } from '@nestjs/swagger';

export class TwitterUser {
    @ApiProperty({
        description: 'Twitter user ID',
        example: '1234567890'
    })
    id: string;

    @ApiProperty({
        description: 'Display name of the Twitter user',
        example: 'John Doe'
    })
    name: string;

    @ApiProperty({
        description: 'Twitter username (without @)',
        example: 'johndoe'
    })
    screen_name: string;

    @ApiProperty({
        description: 'URL to the user\'s profile image',
        example: 'https://pbs.twimg.com/profile_images/1234567890/avatar.jpg'
    })
    profile_image_url: string;

    @ApiProperty({
        description: 'User bio/description',
        example: 'Software developer and tech enthusiast'
    })
    description: string;

    @ApiProperty({
        description: 'User\'s website URL',
        example: 'https://johndoe.com',
        required: false
    })
    url?: string;
} 