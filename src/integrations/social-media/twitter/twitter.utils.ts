import { FormattedTweet, TwitterUser } from './twitter.interfaces';

export class TwitterUtils {

    static formatUserFollowings(payload: any): TwitterUser[] {
        const rawEntries = payload.result?.timeline?.instructions
            ?.find((instr: any) => instr.type === 'TimelineAddEntries')
            ?.entries || [];

        return rawEntries
            .filter((entry) => entry.content?.entryType === 'TimelineTimelineItem')
            .map((entry): TwitterUser => {
                const user = entry.content?.itemContent?.user_results?.result || {};
                return {
                    id: user.rest_id || '',
                    name: user.core?.name || 'Unknown',
                    screenName: user.core?.screen_name || '',
                    profile_image_url: user.avatar?.image_url || '',
                    description: user.legacy?.description || '',
                    url: user.legacy?.url || undefined,
                };
            });
    }

    static formatTweetsResponse(data: any): FormattedTweet[] {
        const formattedTweets: FormattedTweet[] = [];

        if (
            !data ||
            !data.result ||
            !data.result.timeline ||
            !data.result.timeline.instructions
        ) {
            return formattedTweets;
        }

        for (const instruction of data.result.timeline.instructions) {
            if (instruction.type === 'TimelineAddEntries' && instruction.entries) {
                for (const entry of instruction.entries) {
                    let tweetData;

                    // Handle direct tweet entries
                    if (
                        entry.content &&
                        entry.content.itemContent &&
                        entry.content.itemContent.tweet_results &&
                        entry.content.itemContent.tweet_results.result
                    ) {
                        tweetData = entry.content.itemContent.tweet_results.result;
                    }
                    // Handle conversation module entries (where tweets are nested under 'items')
                    else if (
                        entry.content &&
                        entry.content.entryType === 'TimelineTimelineModule' &&
                        entry.content.items
                    ) {
                        for (const item of entry.content.items) {
                            if (
                                item.item &&
                                item.item.itemContent &&
                                item.item.itemContent.tweet_results &&
                                item.item.itemContent.tweet_results.result
                            ) {
                                tweetData = item.item.itemContent.tweet_results.result;
                                // Once we find a tweet in a module, format it and break from this inner loop
                                break;
                            }
                        }
                    }

                    if (tweetData) {
                        const user = tweetData.core?.user_results?.result?.legacy;
                        const tweetLegacy = tweetData.legacy;
                        const views = tweetData.views;
                        const card = tweetData.card;

                        const formattedTweet: FormattedTweet = {
                            id: tweetData.rest_id,
                            fullText: tweetLegacy?.full_text || '',
                            createdAt: tweetLegacy?.created_at || '',
                            retweetCount: tweetLegacy?.retweet_count || 0,
                            replyCount: tweetLegacy?.reply_count || 0,
                            likeCount: tweetLegacy?.favorite_count || 0,
                            bookmarkCount: tweetLegacy?.bookmark_count || 0,
                            viewCount: views?.count || '0',
                            user: {
                                screenName: user?.screen_name || 'N/A',
                                name: user?.name || 'N/A',
                                profileImageUrl: user?.profile_image_url_https || '',
                            },
                            hashtags:
                                tweetLegacy?.entities?.hashtags?.map((tag: any) => tag.text) ||
                                [],
                            urls:
                                tweetLegacy?.entities?.urls?.map((url: any) => url.expanded_url) ||
                                [],
                            userMentions:
                                tweetLegacy?.entities?.user_mentions?.map(
                                    (mention: any) => mention.screen_name,
                                ) || [],
                        };

                        // Process card data if available
                        if (card && card.legacy && card.legacy.binding_values) {
                            const cardData: { [key: string]: any } = {};
                            card.legacy.binding_values.forEach((bv: any) => {
                                if (bv.value?.string_value) {
                                    cardData[bv.key] = bv.value.string_value;
                                } else if (bv.value?.image_value) {
                                    cardData[bv.key] = bv.value.image_value.url;
                                }
                            });

                            formattedTweet.card = {
                                title: cardData.title,
                                description: cardData.description,
                                domain: cardData.domain,
                                imageUrl: cardData.photo_image_full_size_original || cardData.thumbnail_image_original || cardData.summary_photo_image_original,
                            };
                        }

                        formattedTweets.push(formattedTweet);
                    }
                }
            }
        }

        return formattedTweets;
    }

    static formatFollowingsResponse(rawResponse: any): TwitterUser[] {
        const formattedFollowings: TwitterUser[] = [];

        let usersArray: any[] = [];

        // Common paths for user arrays in Twitter API responses
        if (rawResponse && rawResponse.users) {
            usersArray = rawResponse.users;
        } else if (rawResponse && rawResponse.result && rawResponse.result.users) {
            usersArray = rawResponse.result.users;
        } else {
            // If no users array is found, return empty
            return formattedFollowings;
        }

        for (const user of usersArray) {
            // Accessing 'legacy' for more detailed user info, common in v2 API responses
            const userLegacy = user.legacy || user; // Fallback to user itself if 'legacy' not found

            const formattedUser: TwitterUser = {
                id: user.id_str || user.id?.toString() || '', // Use id_str, fallback to id converted to string
                name: userLegacy.name || 'N/A',
                screenName: userLegacy.screen_name || 'N/A',
                profile_image_url: userLegacy.profile_image_url_https || userLegacy.profile_image_url || '',
                description: userLegacy.description || '',
                url: userLegacy.url || undefined, // url is optional, set to undefined if not present
            };
            formattedFollowings.push(formattedUser);
        }

        return formattedFollowings;
    }

}