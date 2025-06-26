import { FormattedTweet, TwitterUser } from './twitter.interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TwitterUtils {

    formatUserFollowings(payload: any): TwitterUser[] {
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
                    screen_name: user.core?.screen_name || '',
                    profile_image_url: user.avatar?.image_url || '',
                    description: user.legacy?.description || '',
                    url: user.legacy?.url || undefined,
                };
            });
    }

    formatUserTweets(data: any): FormattedTweet[] {
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
                            full_text: tweetLegacy?.full_text || '',
                            created_at: tweetLegacy?.created_at || '',
                            retweet_count: tweetLegacy?.retweet_count || 0,
                            reply_count: tweetLegacy?.reply_count || 0,
                            like_count: tweetLegacy?.favorite_count || 0,
                            bookmark_count: tweetLegacy?.bookmark_count || 0,
                            view_count: views?.count || '0',
                            user: {
                                screen_name: user?.screen_name || 'N/A',
                                name: user?.name || 'N/A',
                                profile_image_url: user?.profile_image_url_https || '',
                            },
                            hashtags:
                                tweetLegacy?.entities?.hashtags?.map((tag: any) => tag.text) ||
                                [],
                            urls:
                                tweetLegacy?.entities?.urls?.map((url: any) => url.expanded_url) ||
                                [],
                            user_mentions:
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

    formatFollowings(rawResponse: any): TwitterUser[] {
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
                screen_name: userLegacy.screen_name || 'N/A',
                profile_image_url: userLegacy.profile_image_url_https || userLegacy.profile_image_url || '',
                description: userLegacy.description || '',
                url: userLegacy.url || undefined, // url is optional, set to undefined if not present
            };
            formattedFollowings.push(formattedUser);
        }


        return formattedFollowings;
    }

    formatUserByUsername(rawResponse: any): TwitterUser | null {
        if (!rawResponse?.result.data.user.result) {
            return null;
        }

        const user = rawResponse.result.data.user.result;
        const legacy = user.legacy;

        if (!legacy) {
            return null;
        }

        return {
            id: user.rest_id || '',
            name: user?.core?.name || '',
            screen_name: user?.core?.screen_name || '',
            profile_image_url: user?.avatar?.image_url || null,
            description: user?.legacy?.description || '',
            url: legacy.url || undefined,
        };
    }

}