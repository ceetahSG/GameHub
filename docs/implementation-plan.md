# GameHub implementation plan

**Goal:** A production browser-game portal modeled on CrazyGames, with instant play, discovery, accounts, saved favorites, and self-hosted games.

**Build order:** Foundation → catalog → one playable game → discovery UI → accounts → favorites/history → publishing → launch.

## Starting point

Already built: Next.js 14/React 18/TypeScript/Tailwind homepage, English/Bangla routing, themes, reusable cards, and 10 mock games.

Missing: game player, category/search/login pages, real catalog, database, authentication, persistent favorites, publishing tools, and production operations. Ratings and play counts are currently mock values.

CrazyGames is the product reference, replacing the earlier GitHub reference. Its public site shows searchable game discovery, curated collections, new games, and leaderboards. This plan defines a launch-sized implementation of that experience; multiplayer, premium subscriptions, competitive leaderboards, cloud game saves, and public developer submissions follow launch.

## Recommended architecture

| Responsibility | Recommendation |
| --- | --- |
| Portal | Keep Next.js App Router, Tailwind, and `next-intl`; deploy on Vercel |
| Accounts/data | Supabase Auth and PostgreSQL with row-level security |
| Game hosting | Cloudflare R2 behind a cached custom domain, on a separate registrable domain from the portal |
| Search | PostgreSQL indexed title/tag search initially; add a search service when justified |
| Publishing | Staff-only catalog editor and reviewed CI game uploads |

These are proposed implementation choices, not existing integrations. Portal requests read catalog/account data; the browser downloads game files directly from the game CDN. Never bundle game engines into the homepage.

## 1. Stabilize the foundation

- Upgrade Next.js and related packages to a supported, patched release; adapt middleware and `next-intl` together.
- Keep one package manager/lockfile. Add explicit lint, typecheck, build, and browser-test commands to CI.
- Create separate development, staging, and production environments, with an `.env.example` containing names only.
- Define spacing, card sizes, typography, focus states, breakpoints, and player aspect ratios before expanding the UI.

**Done when:** A clean checkout passes CI and deploys to staging in both locales.

## 2. Replace mock data with a real catalog

Create migrations for:

| Table | Essential fields/constraints |
| --- | --- |
| `games` | ID, unique slug, title, category, tags, thumbnail, controls, device support, publication status/date |
| `game_translations` | Game ID + locale unique; description and instructions |
| `game_builds` | Game ID, immutable version, entry URL, source repo/commit, license, credits, checksum |
| `profiles` | Auth user ID, display name, role |
| `favorites` | User ID + game ID unique |
| `play_sessions` | Session ID, optional user ID, game ID, start/last-active times |
| `ratings` | User ID + game ID unique, constrained rating value |

- Add an active build reference to each game. Only published games and approved builds appear publicly.
- Put database access in `lib/games.ts`; replace imports from `data/games.ts` in the homepage and future routes.
- Start real counters at zero. Keep editorial featured ordering separate from measured popularity.

**Done when:** Editing a published database record updates the catalog without editing React components.

## 3. Ship one complete playable game first

Use **2048** as the first integration. Follow the recipe below before importing a larger catalog.

- Add `app/[locale]/games/[slug]/page.tsx` and client component `components/GamePlayer.tsx`.
- Show thumbnail and Play button first; create the iframe after the user clicks.
- Build the player states: idle, loading, ready, timeout/error, retry, and unsupported device.
- Include fullscreen, restart, controls, attribution, favorite action, and related games. Offer mute only for games with a working audio adapter.
- Keep surrounding controls usable by keyboard; focus the game after Play and provide a way back to portal controls.

**Done when:** A user can open, play, restart, and exit the game on desktop and a touch device without broken assets or portal navigation.

## 4. Build discovery and the CrazyGames-style browsing experience

- Evolve `Navbar`, `GameCard`, and the homepage into a compact search/header, desktop category rail, mobile category drawer, and thumbnail-led game grid.
- Replace emoji artwork with optimized screenshots. Give cards consistent ratios and reserve image dimensions to avoid layout shifts.
- Add `/category/[slug]`, `/search?q=...`, `/new`, and `/trending` under `app/[locale]`.
- Add pagination, filters for device/category, useful empty states, and shareable search URLs. Use curated featured rows and category-based related games first.
- Sort new games by publication date. Calculate trending from deduplicated recent play sessions rather than lifetime mock counts.
- Translate all new portal strings into English/Bangla. Game content needs its own language-support metadata.

**Done when:** Every discovery link resolves, searches return published games, and the UI works from narrow mobile screens to desktop.

## 5. Add production accounts

- Implement `/login`, `/signup`, `/auth/callback`, password reset, and `/account` with Supabase Auth; start with email/password and Google sign-in.
- Use the current Supabase SSR cookie/session pattern and verify identity on the server for protected mutations.
- Add email verification, production email delivery, redirect allowlists, logout, account deletion, and clear auth error states.
- Enforce row-level security: users access their own private rows; published catalog reads are public; catalog writes require a server-verified staff role.
- Keep privileged service credentials server-only. Rate-limit authentication and mutation endpoints.

**Done when:** Login survives refresh, reset works, and one user cannot access another user's favorites or change their own staff role.

## 6. Connect favorites, history, ratings, and analytics

- Extract the inert heart button from `GameCard.tsx` into `FavoriteButton.tsx`; use optimistic updates with rollback on failure.
- Add `/favorites` and a recently played section. Store guest history locally; persist signed-in history and merge it on login without duplicates.
- Count a play after a validated ready/start event, with session deduplication and rate limits. A page visit or iframe load alone is not a play.
- Track player load failures, time to ready, game starts, and repeat plays. Collect only the events needed for these metrics.
- Add one editable rating per signed-in user and compute the displayed aggregate from real records.

**Done when:** Favorites sync across devices, history is private, and reloads do not inflate play counts.

## 7. Make publishing repeatable

- Add protected `/admin/games` for metadata, preview, publish/unpublish, and active-build selection.
- Run game builds in isolated CI without portal production secrets. Upload only reviewed output, never arbitrary archives straight into production.
- Publish immutable directories such as `/2048/<commit>/index.html`; keep the previous build available for rollback.
- Save source commit, license notices, asset credits, modifications, and smoke-test results for every release.
- Cache immutable assets; keep catalog publication changes immediately invalidatable. Restrict CDN framing to the portal using CSP `frame-ancestors`.

**Done when:** Staff can preview, publish, and roll back a game without redeploying the portal.

## 8. Pass the production launch gate

- Seed a recommended 10–20 reviewed games, showing device restrictions explicitly. Quality-check every title instead of bulk importing repositories.
- Test browse → play → sign up → favorite → reload → second-device favorite access, plus reset/delete-account flows.
- Test Chrome, Firefox, Safari, Android Chrome, and iOS Safari; verify touch, keyboard, audio activation, fullscreen fallback, slow loads, and blocked storage.
- Add locale metadata, canonical URLs, sitemap, social previews, and descriptive game pages. Keep private/admin pages out of indexing.
- Finish About, Contact, Privacy, Terms, and game credits. Remove dead developer-dashboard links until that feature exists.
- Configure error monitoring, uptime checks, database backups with a restore rehearsal, deployment rollback, and bandwidth alerts.
- Reserve stable ad slots, but enable ads only after consent behavior and game pause/resume integration work. Ads must not cover controls.

**Done when:** CI and the end-to-end flows pass on staging, rollback/restore are verified, and no mock catalog metrics remain.

## Where to get open-source browser games

See [Game sources and integration](./game-sources-and-integration.md) for 41 repositories, per-game packaging notes, player code, and an optional scraping-to-draft ingestion workflow.

Upstream repositories checked on November 13, 2026. These are integration candidates, not tested production-ready packages. Verify the exact pinned revision and all image/audio/font licenses before publishing.

| Repository | Fit | Integration notes |
| --- | --- | --- |
| [2048](https://github.com/gabrielecirulli/2048) | First import; puzzle; MIT | Static `index.html`, JS, styles, and assets; keyboard/swipe support. Preserve license and attribution. |
| [HTML5 Asteroids](https://github.com/dmcinnes/HTML5-Asteroids) | Arcade/action; MIT code | Static canvas game; audit bundled sounds and old dependencies separately; test touch controls. |
| [JavaScript Racer](https://github.com/jakesgordon/javascript-racer) | Racing; MIT code | Use the final demo entry page; review image/music rights separately. Upstream has old mobile-performance caveats, so qualify devices yourself. |
| [Hextris](https://github.com/Hextris/hextris) | Puzzle; GPL-3.0-or-later per current README | Additional distribution/source obligations; retain notices and provide corresponding source as required. Do not rely on lists describing it as MIT. |
| [Awesome Open Source Games](https://github.com/michelpereira/awesome-open-source-games) | Discovery list | Filter for HTML5/JavaScript/WebGL. Each linked game has its own license and hosting requirements. |


## Integration plan: GitHub → hosted game → GameHub

### A. Pin and prepare the game

Example commands run in a separate game-import workspace:

```sh
git clone https://github.com/gabrielecirulli/2048.git
cd 2048
git checkout <reviewed-commit-sha>
git rev-parse HEAD
```

1. Review `LICENSE.txt`, asset notices, scripts, outbound requests, and dependencies.
2. For 2048, package `index.html`, `js/`, `style/`, `meta/`, favicon, and license/credits. For bundled projects, use their documented build output instead.
3. Replace obsolete external dependencies where needed. Make asset URLs relative to the entry directory and remove unrelated tracking only where permitted.
4. Test the exact hosted directory over HTTP, including nested asset requests and local save behavior. Upload to a versioned game-CDN path.

### B. Register the approved build

Create a `games` record with slug `2048`, actual screenshot, category `puzzle`, controls, supported devices, and localized instructions. Create a linked `game_builds` record containing the pinned commit, MIT notice, and deployed entry URL. Publish only after preview passes.

### C. Embed it in the existing Next.js game page

Example markup inside `GamePlayer.tsx`, after the user presses Play:

```tsx
<iframe
  ref={frameRef}
  src={approvedBuild.entryUrl}
  title={game.title}
  className="h-full w-full border-0"
  sandbox="allow-scripts allow-same-origin"
  allow="fullscreen; autoplay"
  allowFullScreen
  referrerPolicy="no-referrer"
/>
```

`frameRef` is a React iframe ref; `approvedBuild` comes from the published server-side catalog, never a user-supplied URL. Use an explicit approved-host allowlist.

**Isolation requirement:** The game URL must be on the separate game origin, without portal cookies or credentials. `allow-same-origin` preserves the game's origin for features such as local storage; paired with scripts, it must not be used for game code hosted on the portal's own origin. Browser privacy settings can still block embedded storage, so handle that gracefully. Add permissions such as pointer lock only to titles that require them.

### D. Add a tiny optional game adapter

Patch games you control to send `gamehub:ready`, `gamehub:started`, and `gamehub:ended` events with `window.parent.postMessage(payload, portalOrigin)`. Send ready only after required assets load. Accept parent pause/mute commands only if implemented by that game.

In the portal, check **all three** before handling a message:

```ts
if (event.origin !== new URL(approvedBuild.entryUrl).origin) return;
if (event.source !== frameRef.current?.contentWindow) return;
if (!isGameHubEvent(event.data)) return;
```

Implement `isGameHubEvent` as an allowlisted runtime schema with bounded fields. Use exact target origins, clean up listeners on unmount, and reset ready/session state when the build changes. Games without adapters can still run, but iframe `load` cannot prove successful gameplay. Never trust client-reported scores for competitive leaderboards.

## After launch, in order

1. Improve recommendations using actual play and return rates.
2. Add cloud saves through per-game adapters and versioned save schemas.
3. Add leaderboards with game-specific score validation.
4. Add reviewed developer submissions and publishing documentation.
5. Treat multiplayer, social features, and premium plans as separate product projects.

## Sources

- [CrazyGames product reference](https://www.crazygames.com/)
- [Supabase Next.js SSR authentication](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [MDN iframe sandbox and permissions](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [MDN postMessage origin validation](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- Game source and license references are linked in the repository table above.
