# About the Founder — Personal Brand Profile

## Who I Am

- **Name:** Frida (fridalantonyo)
- **Age:** 24
- **Background:** Tech, AI, entrepreneurship
- **Current move:** Relocating to Bangkok in ~2 weeks to build out the founder + travel content lifestyle full-time

## Personality & Vibe

- Energetic, fun, and genuinely enjoys life — not performatively, actually
- Serious about outcomes: social media growth, business results, brand equity
- Balances levity with substance — can go from a meme to a pitch deck in the same day
- Not afraid to push boundaries with content for reach/views, but always anchored in something real or informational
- Ambitious but not pretentious — likes to build in public and be relatable

## Content Style

- **Fun content:** Lifestyle, travel, personality-driven, behind-the-scenes of the founder life, Bangkok/nomad vibes
- **Business content:** AI, automation, SaaS, entrepreneurship, lessons learned, founder takes
- **Edge content:** Willing to go provocative or contrarian for views — but grounded in a real point or insight
- **Informational content:** Always wants to teach something or share something genuinely useful
- Mix of polished and raw — not everything needs to be perfectly produced

## Goals

- Build a strong, consistent personal brand across Instagram, X (Twitter), TikTok, and YouTube
- Grow NexFlowAI as a business alongside the personal brand — they reinforce each other
- Document the Bangkok/founder/travel lifestyle in a way that attracts an audience who wants to follow the journey
- Make content that converts: followers → community → customers

## Social Media Accounts

- **Instagram:** @fridalantonyo (or confirm handle)
- **X (Twitter):** @fridalantonyo (or confirm handle)
- **TikTok:** @fridalantonyo (or confirm handle)
- **YouTube:** (confirm channel name/handle)

> Note: To give Claude direct API access to post, read analytics, or manage content on these platforms, provide the relevant API keys/tokens in environment variables or a `.env.local` file (never commit credentials). See the Social Media Access section below.

## Social Media Access Setup

To enable Claude to interact with social media accounts programmatically:

### Instagram / Meta
- Requires a **Meta Developer App** with Instagram Basic Display API or Instagram Graph API access
- Needed: `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`

### X (Twitter)
- Requires a **Twitter Developer App** (Free tier works for basic read; Elevated/Pro for posting)
- Needed: `TWITTER_API_KEY`, `TWITTER_API_SECRET`, `TWITTER_ACCESS_TOKEN`, `TWITTER_ACCESS_TOKEN_SECRET`, `TWITTER_BEARER_TOKEN`

### TikTok
- Requires a **TikTok for Developers** account and an approved app
- Needed: `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_ACCESS_TOKEN`

### YouTube / Google
- Requires a **Google Cloud project** with YouTube Data API v3 enabled
- Needed: `YOUTUBE_API_KEY` or OAuth2 credentials (`YOUTUBE_CLIENT_ID`, `YOUTUBE_CLIENT_SECRET`, `YOUTUBE_REFRESH_TOKEN`)

Once credentials are available, add them to `.env.local` and Claude can help build integrations for scheduling, analytics, cross-posting, and more.

## Working With Me

- Keep things sharp and punchy — no fluff, no filler
- Match the energy to the context: hype for content ideas, grounded for business decisions
- I want options, not just one answer — give me 2-3 takes when relevant
- Push back if something is a bad idea, but back it up
- When in doubt: fun + informative + slightly edgy wins
