import { TwitterUserFollowings } from './twitter.interfaces';

export class TwitterUtils {
    /**
     * Formats raw Twitter API user data into a standardized TwitterUserFollowings interface.
     * @param rawUsers - Array of raw user data from Twitter API response
     * @returns Array of formatted TwitterUserFollowings objects
     */
    static formatUserFollowings(payload: any): TwitterUserFollowings[] {
        const rawEntries = payload.result?.timeline?.instructions
            ?.find((instr: any) => instr.type === 'TimelineAddEntries')
            ?.entries || [];

        return rawEntries
            .filter((entry) => entry.content?.entryType === 'TimelineTimelineItem')
            .map((entry): TwitterUserFollowings => {
                const user = entry.content?.itemContent?.user_results?.result || {};
                return {
                    id: user.rest_id || '',
                    name: user.core?.name || 'Unknown',
                    screenName: user.core?.screen_name || '',
                    profileImageUrl: user.avatar?.image_url || '',
                    description: user.legacy?.description || '',
                    url: user.legacy?.url || undefined,
                };
            });
    }
}