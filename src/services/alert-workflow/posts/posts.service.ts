import { Injectable } from '@nestjs/common';
import { TwitterIntegrationService } from '@/integrations/social-media/twitter/twitter.service';
import { MediaSubscription } from '@prisma/client';
import { FormattedTweet } from '@/integrations/social-media/twitter/twitter.interfaces';
import { TestPosts } from './posts.data';

@Injectable()
export class PostsService {
    constructor(private readonly twitterIntegrationService: TwitterIntegrationService) { }

    async getPosts(media_subscriptions: Record<string, MediaSubscription[]>): Promise<{
        twitter: FormattedTweet[];
    }> {
        try {
            const twitterPosts = await this.getTwitterPosts(media_subscriptions.twitter);

            return {
                twitter: twitterPosts,
            };

        } catch (error) {
            return {
                twitter: [],
            }
        }
    }

    async getTwitterPosts(media_subscriptions: MediaSubscription[]) {

        try {

            return TestPosts as FormattedTweet[];

            const twitterPostsPromises: Promise<FormattedTweet[]>[] = [];

            for (const media_subscription of media_subscriptions) {
                const twitterUserPosts = this.twitterIntegrationService.getUserTweets(media_subscription.account_identifier, { latest_only: 'true' });
                twitterPostsPromises.push(twitterUserPosts);
            }

            let posts: FormattedTweet[] = await Promise.all(twitterPostsPromises).then(posts => posts.flat());

            const formattedPosts = posts.map((post) => {
                return {
                    id: post.id,
                    full_text: post.full_text,
                    user: post.user,
                    platform_type: post.platform_type,
                    reply_count: post.reply_count,
                    like_count: post.like_count,
                    view_count: post.view_count,
                }

            })

            return formattedPosts;
        } catch (error) {
            return [];
        }
    }
}