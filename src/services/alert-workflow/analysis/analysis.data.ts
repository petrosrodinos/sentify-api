import { PostAnalysis } from "@/integrations/ai/ai.schemas";

export const TestAnalysis: PostAnalysis[] = [
    {
        title: "Tesla surges after earnings beat",
        description: "Tesla's Q2 earnings exceeded expectations, pushing the stock price up significantly in after-hours trading.",
        tickers: [
            { ticker: "TSLA", item_type: "stock" },
            { ticker: "electric vehicles", item_type: "keyword" }
        ],
        sentiment: "positive",
        severity: "high",
        popularity: 87,
        post_ids: ["1629348012340981234"],
        platform_type: "twitter",
        account_identifier: "2704294333",
        account_name: "John Doe",
        screen_name: "johndoe_invests"
    },
    {
        title: "Bitcoin drops amid market uncertainty",
        description: "BTC experienced a sharp decline due to concerns about regulatory pressure from global financial authorities.",
        tickers: [
            { ticker: "BTC", item_type: "crypto" },
            { ticker: "regulation", item_type: "keyword" }
        ],
        sentiment: "negative",
        severity: "medium",
        popularity: 75,
        post_ids: ["1629348912376127890"],
        platform_type: "twitter",
        account_identifier: "2237865246",
        account_name: "CryptoWhale",
        screen_name: "cryptowhale_"
    }
];