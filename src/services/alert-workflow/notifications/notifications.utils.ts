import { PostAnalysis } from '@/integrations/ai/ai.schemas';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsUtils {
    formatTweetText(data: PostAnalysis): string {
        const { title, description, tickers, platform_type, account_name, screen_name, sentiment, severity, popularity } = data;

        const tickerSymbols = tickers.map(ticker => ticker.ticker).join(', ');
        const sentimentEmoji = this.getSentimentEmoji(sentiment);
        const severityEmoji = this.getSeverityEmoji(severity);

        let tweetText = `${sentimentEmoji} ${title}\n\n`;
        tweetText += `${description}\n\n`;
        tweetText += `👤 @${account_name}\n`;
        tweetText += `📈 Sentiment: ${sentiment} ${sentimentEmoji}\n`;
        tweetText += `⚠️ Severity: ${severity} ${severityEmoji}\n`;

        return tweetText;
    }

    getSentimentEmoji(sentiment: string): string {
        switch (sentiment.toLowerCase()) {
            case 'positive':
                return '📈';
            case 'negative':
                return '📉';
            case 'neutral':
                return '➡️';
            default:
                return '📊';
        }
    }

    getSeverityEmoji(severity: string): string {
        switch (severity.toLowerCase()) {
            case 'high':
                return '🔴';
            case 'medium':
                return '🟡';
            case 'low':
                return '🟢';
            default:
                return '⚪';
        }
    }
} 