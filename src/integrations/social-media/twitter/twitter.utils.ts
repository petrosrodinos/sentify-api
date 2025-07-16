
import { PlatformType } from '@prisma/client';
import { FormattedTweet, TwitterUser } from './twitter.interfaces';
import { Injectable } from '@nestjs/common';
import { TwitterQueryType } from '@/modules/twitter/dto/twitter-query.schema';

@Injectable()
export class TwitterUtils {

    formatUserFollowings(payload: any): TwitterUser[] {
        const users: TwitterUser[] = [];

        // Check if the payload has the expected structure
        if (!payload?.result?.timeline?.instructions) {
            console.warn("Payload does not contain expected timeline instructions.");
            return [];
        }

        // Find the instruction that contains the 'entries' (TimelineAddEntries type)
        const addEntriesInstruction = payload.result.timeline.instructions.find(
            (instruction: any) => instruction.type === 'TimelineAddEntries'
        );

        if (!addEntriesInstruction || !Array.isArray(addEntriesInstruction.entries)) {
            console.warn("Could not find TimelineAddEntries instruction or its entries.");
            return [];
        }

        // Iterate through each entry in the 'entries' array
        for (const entry of addEntriesInstruction.entries) {
            const userResult = entry?.content?.itemContent?.user_results?.result;

            if (userResult) {
                const legacy = userResult.legacy;
                const core = userResult.core; // Access the new 'core' object
                const avatar = userResult.avatar; // Access the new 'avatar' object

                let userURL: string | undefined = undefined;
                // Check if URL entities exist in legacy and have at least one URL
                if (legacy?.entities?.url?.urls && legacy.entities.url.urls.length > 0) {
                    userURL = legacy.entities.url.urls[0].expanded_url;
                }

                // Extract profile image URL from 'avatar' or fallback to legacy
                const profileImageUrl = avatar?.image_url || legacy?.profile_image_url_https || legacy?.profile_image_url || '';

                // Extract screen name from 'core' or fallback to legacy
                const screenName = core?.screen_name || legacy?.screen_name || '';

                // Extract name from 'core' or fallback to legacy
                const name = core?.name || legacy?.name || 'Unknown';

                users.push({
                    id: userResult.rest_id || userResult.id || '', // Use rest_id primarily, fallback to id
                    name: name,
                    screen_name: screenName,
                    profile_image_url: profileImageUrl,
                    description: legacy?.description || '', // Description still seems to be in legacy
                    url: userURL,
                });
            } else {
                console.warn("Skipping entry due to missing userResult data:", entry);
            }
        }

        return users;
    }

    formatUserTweets(data: any, query: TwitterQueryType): FormattedTweet[] {
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
                            view_count: views?.count || '0',
                            platform_type: PlatformType.twitter,
                            user: {
                                screen_name: user?.screen_name || 'N/A',
                                name: user?.name || 'N/A',
                                // profile_image_url: user?.profile_image_url_https || '',
                                user_id: data.user_id,
                            }
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
                        }

                        formattedTweets.push(formattedTweet);
                    }
                }
            }
        }

        if (query.count_from_latest) {
            const sortedTweets = formattedTweets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            return sortedTweets.slice(0, +query.count_from_latest);
        }

        if (query.sort === 'true') {
            formattedTweets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }

        if (query.latest_only === 'true') {
            const sortedTweets = formattedTweets.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            return [sortedTweets[0]];
        }

        return formattedTweets;
    }

    formatUserByUsername(rawResponse: any): TwitterUser | null {
        if (!rawResponse?.result?.data?.user?.result) {
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

    formatTwitterUsers(jsonData: any): TwitterUser[] {
        const twitterUsers: TwitterUser[] = [];

        if (jsonData && jsonData.result && Array.isArray(jsonData.result.users)) {
            for (const rawUser of jsonData.result.users) {
                twitterUsers.push({
                    id: rawUser.id_str,
                    name: rawUser.name,
                    screen_name: rawUser.screen_name,
                    profile_image_url: rawUser.profile_image_url,
                    description: rawUser.location || '',
                    url: undefined
                });
            }
        }

        return twitterUsers;
    }

}