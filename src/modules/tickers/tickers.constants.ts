import { TickerDetails } from "src/integrations/market-data/tickers/tickers.interface";

export const TestStockTickers: TickerDetails[] = [
    {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        market: 'stock',
    },
    {
        ticker: 'GOOG',
        name: 'Alphabet Inc.',
        market: 'stock',
    },
    {
        ticker: 'MSFT',
        name: 'Microsoft Corporation',
        market: 'stock',
    },
    {
        ticker: 'AMZN',
        name: 'Amazon.com Inc.',
        market: 'stock',
    },
    {
        ticker: 'TSLA',
        name: 'Tesla Inc.',
        market: 'stock',
    },
    {
        ticker: 'NVDA',
        name: 'NVIDIA Corporation',
        market: 'stock',
    },
    {
        ticker: 'META',
        name: 'Meta Platforms Inc.',
        market: 'stock',
    },
    {
        ticker: 'NFLX',
        name: 'Netflix Inc.',
        market: 'stock',
    },
]

export const TestCryptoTickers: TickerDetails[] = [
    {
        ticker: 'BTC',
        name: 'Bitcoin',
        market: 'crypto',
    },
    {
        ticker: 'ETH',
        name: 'Ethereum',
        market: 'crypto',
    },
    {
        ticker: 'XRP',
        name: 'Ripple',
        market: 'crypto',
    },
    {
        ticker: 'SOL',
        name: 'Solana',
        market: 'crypto',
    },
    {
        ticker: 'DOGE',
        name: 'Dogecoin',
        market: 'crypto',
    },
    {
        ticker: 'XLM',
        name: 'Stellar',
        market: 'crypto',
    },
    {
        ticker: 'ADA',
        name: 'Cardano',
        market: 'crypto',
    },
    {
        ticker: 'DOT',
        name: 'Polkadot',
        market: 'crypto',
    },
    {
        ticker: 'LINK',
        name: 'Chainlink',
        market: 'crypto',
    },

]           