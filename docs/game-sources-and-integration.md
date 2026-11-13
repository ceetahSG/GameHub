# Browser game sources and integration

**Purpose:** Get game code, produce a hosted build, and connect it to this Next.js project.

**Research date:** November 13, 2026. All 41 repository links below were opened during research. Builds and gameplay have not been tested here. These are sourcing candidates, not 41 cleared, production-ready imports. Check the license, asset rights, toolchain, and device support at the exact commit before publishing.

## How to read the list

| Route | Implementation |
| --- | --- |
| Static | Host entry HTML and all required scripts, styles, levels, images, and audio with their directory structure intact. |
| Build | Follow the pinned repository's build instructions; deploy generated browser output only. |
| Wrapper | Create an HTML entry that loads dependencies and initializes the game library. |
| Legacy | Repair the old runtime/toolchain before packaging; budget a separate technical spike. |

Routes are engineering recommendations, not verified build results. All routes ultimately use the same isolated iframe player.

## 41 game code sources

### Puzzle and board

| # | Game / source | Route | Specific integration work |
| --- | --- | --- | --- |
| 1 | [2048](https://github.com/gabrielecirulli/2048) | Static | Package HTML, JS, styles, and meta assets. Test swipes and saved board state. MIT upstream. |
| 2 | [Connect Four](https://github.com/kenrick95/c4) | Build | Build the browser workspace using its deployment docs; preserve AI; inspect optional server requirements. MIT upstream. |
| 3 | [Green Mahjong](https://github.com/danbeck/green-mahjong) | Static | Identify browser entry; preserve tile themes/layouts; test touch selection. |
| 4 | [Hex 2048](https://github.com/jeffhou/hex-2048) | Static | Package hex-grid assets; explain controls separately from standard 2048. |
| 5 | [Hextris](https://github.com/Hextris/hextris) | Static | Preserve audio/scripts; add lifecycle events. Current README specifies GPL-3.0-or-later, requiring appropriate source distribution/notices. |
| 6 | [Blicblock JS](https://github.com/cheshire137/blicblock-js) | Build | Inspect package scripts and asset paths; build browser target and test keyboard focus. |
| 7 | [Blockrain.js](https://github.com/Aerolab/blockrain.js) | Wrapper | Create HTML with jQuery, plugin CSS/JS, and upstream initialization; size one game container responsively. |
| 8 | [Couch 2048](https://github.com/mvasilkov/glitch2016) | Build | Identify browser output/physics dependencies; test restart after a lost round. |
| 9 | [cube-composer](https://github.com/sharkdp/cube-composer) | Build | Follow compiler requirements; deploy generated browser assets and level/tutorial data. |
| 10 | [Hexahedral](https://github.com/mminer/hexahedral) | Build | Upstream documents `npm install`, `npm run build`, then `build/index.html`; repair old dependencies and review sound credits. |
| 11 | [Orbium](https://github.com/bni/orbium) | Static | Preserve levels, graphics, audio; test touch targets and board scaling. |
| 12 | [Parity](https://github.com/abejfehr/parity) | Static | Identify playable entry and local dependencies; add clear rules/instructions. |
| 13 | [Prism](https://github.com/Zolmeister/prism) | Static | Preserve color/level logic; test readable colors at player size. |
| 14 | [Push and Fork](https://github.com/Octocarina/game-off-2012) | Legacy | Resolve jam-era dependencies; test undo/time-travel behavior and restart. |
| 15 | [Sudoku JS](https://github.com/baruchel/sudoku-js) | Static | Separate browser entry from mobile packaging; verify touch number entry. |
| 16 | [TransCube](https://github.com/jeroenverfallie/ggo13-transcube) | Build | Preserve engine/maps; verify every transformation control inside the iframe. |
| 17 | [Untrusted](https://github.com/AlexNisnevich/untrusted) | Build | Keep editor and level execution within the isolated game origin; target desktop first. |
| 18 | [JavaScript Tetris](https://github.com/jakesgordon/javascript-tetris) | Static | Package playable entry/dependencies; add touch controls if needed; review branding/assets separately. |

### Arcade, action, and platformers

| # | Game / source | Route | Specific integration work |
| --- | --- | --- | --- |
| 19 | [HTML5 Asteroids](https://github.com/dmcinnes/HTML5-Asteroids) | Static | Review old jQuery and bundled sounds; test input. MIT code upstream. |
| 20 | [Alien Invasion](https://github.com/cykod/AlienInvasion) | Static | Select the complete playable example; preserve sprites and test touch handling. |
| 21 | [ArashiJS](https://github.com/stephank/arashi-js) | Legacy | Check older browser APIs, rendering, and input before catalog inclusion. |
| 22 | [Avabranch](https://github.com/Zolmeister/avabranch) | Static | Package game entry/assets; test movement and game-over reset. |
| 23 | [Clumsy Bird](https://github.com/ellisonleao/clumsy-bird) | Build | Follow pinned melonJS workflow; preserve sprite/audio paths and user-initiated start. |
| 24 | [Coil](https://github.com/leereilly/Coil) | Static | Test mouse coordinates against the scaled canvas bounds. |
| 25 | [Crappy Bird](https://github.com/varunpant/CrappyBird) | Static | Review graphics permissions; test tap controls, score, and restart. |
| 26 | [Drakonas](https://github.com/Casmo/Drakonas) | Static | Preserve Three.js, models, and mission JSON; inspect outbound integrations. |
| 27 | [Drill Bunny](https://github.com/DreamShowAdventures/LudumDare29) | Legacy | Upstream lists Node/Grunt/Python 2-era tooling. Port the build or recover reviewed output; establish redistribution permission first. |
| 28 | [Hotfix](https://github.com/sdrdis/hotfix) | Static | Preserve upgrades/assets; test click/space input and progression. |
| 29 | [JavaScript Breakout](https://github.com/jakesgordon/javascript-breakout) | Static | Package HTML, game scripts, CSS, images, sound; test paddle input/audio activation. |
| 30 | [Onslaught! Arena](https://github.com/lostdecade/onslaught_arena) | Static | Preserve enemies/weapons/data; verify code and content permissions independently. |
| 31 | [Pappu Pakia](https://github.com/udacity/pappu-pakia) | Static | Review this fork's changes/credits; package canvas assets and test touch behavior. |
| 32 | [PolyBranch](https://github.com/gbatha/PolyBranch) | Legacy | Preserve/repair Processing.js and jQuery; clarify license before redistribution. |
| 33 | [Raging Gardens](https://github.com/kenamick/game-off-2012) | Static | Preserve assets; replace broken external references; test restart. MIT shown upstream. |
| 34 | [Save the Forest](https://github.com/softvar/save-the-forest) | Build | Inspect source/build packaging; deploy browser output and test space/tap jumping. MIT shown upstream. |
| 35 | [Alge's Escapade](https://github.com/Dave-and-Mike/game-off-2012) | Legacy | Resolve GameJs packaging; preserve maps/sprites and verify modern browser execution. |
| 36 | [JavaScript Pong](https://github.com/jakesgordon/javascript-pong) | Static | Package browser entry; verify paddle input/resizing; add touch controls if required. |

### Racing, sandbox, and longer sessions

| # | Game / source | Route | Specific integration work |
| --- | --- | --- | --- |
| 37 | [HexGL](https://github.com/BKcore/HexGL) | Static | Preserve WebGL dependencies/models/textures; test low-end GPUs. Upstream says code/resources MIT unless individually specified. |
| 38 | [JavaScript Racer](https://github.com/jakesgordon/javascript-racer) | Static | Use final racing demo; audit artwork/music; qualify mobile performance. |
| 39 | [Sandboxels](https://github.com/R74nCom/sandboxels) | Static | Review current license/hosting conditions first; preserve element definitions; avoid unreviewed remote mod loading. |
| 40 | [A Dark Room](https://github.com/doublespeakgames/adarkroom) | Static | Preserve narrative/data assets and browser saves; explain saved-progress behavior. |
| 41 | [Particle Clicker](https://github.com/particle-clicker/particle-clicker) | Static | Preserve simulation/content assets; test timers and save persistence after backgrounding. |

**First technical spike:** 2048 → Connect Four → Breakout → Pong → HexGL. This covers DOM/canvas, browser builds, audio/input, and WebGL. This order does not imply asset clearance or verified mobile support.

## Integration steps for this repository

### 1. Pin and package

Run in a separate game-import workspace:

```sh
git clone https://github.com/gabrielecirulli/2048.git
cd 2048
git checkout <reviewed-commit-sha>
git rev-parse HEAD
```

- Record source URL/SHA, license, asset credits, modifications, build command, and supported devices.
- Static games: copy required HTML/JS/CSS/assets with relative paths. For 2048 include `index.html`, `js/`, `style/`, `meta/`, favicon, and notices.
- Built games: follow actual README/package scripts with its lockfile/runtime. Do not assume `npm run build` or `dist/` exists everywhere.
- Run unfamiliar installs/build scripts in isolation without portal secrets. Test the output over HTTP, including all nested asset requests.
- A missing license, unavailable engine, or required backend must be resolved before publishing. A CDN cannot replace a multiplayer server.

### 2. Host independently

Upload approved output to an immutable URL such as:

```text
https://games.example.net/2048/<commit-sha>/index.html
```

Use your own game domain, separate from the portal's registrable domain, with HTTPS and correct MIME types. Cache immutable assets and set game-host CSP `frame-ancestors` to approved portal origins. Keep older builds for rollback. Do not host executable third-party game code in the portal's same-origin `public/` directory in production.

### 3. Register the game

Extend the display-only `Game` model in `data/games.ts` for a first local integration, then persist these fields in `games`/`game_builds` when available:

```ts
type HostedGameFields = {
  entryUrl: string;
  thumbnailUrl: string;
  sourceRepo: string;
  sourceCommit: string;
  licenseLabel: string;
  credits: string;
  controls: string;
  devices: ('desktop' | 'mobile')[];
};
```

Use actual game names/slugs, owned or licensed screenshots, and English/Bangla descriptions/instructions. Game UI localization is separate. Validate entry URLs server-side against approved game-CDN hosts.

### 4. Add the missing route and player

```text
app/[locale]/games/[slug]/page.tsx   # Published game lookup, metadata, instructions
components/GamePlayer.tsx           # Play, loading, errors, retry, fullscreen
components/FavoriteButton.tsx      # Account-backed action outside the game
```

The server route returns `notFound()` for missing/unpublished games. Inside the client player, create the iframe after Play is clicked:

```tsx
<iframe
  ref={frameRef}
  key={`${game.slug}:${game.sourceCommit}:${restartCount}`}
  src={game.entryUrl}
  title={game.title}
  className="h-full w-full border-0"
  sandbox="allow-scripts allow-same-origin"
  allow="fullscreen; autoplay"
  allowFullScreen
  referrerPolicy="no-referrer"
/>
```

`frameRef` is a React iframe ref; Restart increments `restartCount`. The sandbox combination assumes the separate game origin above. It preserves the game's storage origin without giving it the portal's origin. Embedded storage can still be blocked by browser privacy settings.

Preserve aspect ratio, handle timeout/retry, restore keyboard focus, and provide fullscreen fallback. Reloading restarts the page; clearing saved progress requires a per-game adapter. Only show working pause/mute controls.

### 5. Add lifecycle events when practical

After initialization completes, send this from game code, replacing the target with the configured portal origin:

```js
window.parent.postMessage(
  { type: 'gamehub:ready', version: 1 },
  'https://gamehub.example.com',
);
```

In a React effect, attach and clean up a listener:

```ts
const onMessage = (event: MessageEvent) => {
  if (event.origin !== new URL(game.entryUrl).origin) return;
  if (event.source !== frameRef.current?.contentWindow) return;
  const data: unknown = event.data;
  if (!data || typeof data !== 'object') return;
  if (!('type' in data) || data.type !== 'gamehub:ready') return;
  if (!('version' in data) || data.version !== 1) return;
  setStatus('ready');
};

window.addEventListener('message', onMessage);
return () => window.removeEventListener('message', onMessage);
```

Reset status on game/build/restart changes. Add separately validated start/end events for analytics. Deduplicate starts server-side; browser scores/events remain untrusted. Iframe `load` alone does not establish game readiness. Games without adapters can run with fallback UI, but cannot supply reliable lifecycle analytics.

### 6. Preview, then publish

Play a full round on the actual CDN build. Check missing assets, sound after interaction, restart, keyboard exit, fullscreen, touch, low-end performance, and storage denial. Prevent save-key collisions between games sharing the CDN origin. Verify notices/credits and approved outbound requests before publishing.

## Scraping: an optional sourcing route

Scraping is useful for discovering games and preparing draft imports. Downloading a page does not automatically produce a standalone game or grant redistribution rights.

| Source | What to collect | Next action |
| --- | --- | --- |
| Public catalog pages/sitemaps | Candidate URLs, titles, categories, developer links | Locate upstream source or a publisher's distributable build |
| GitHub metadata/API | Repository, branch, releases, license indicator | Pin a commit; inspect actual code and asset licenses |
| Permitted downloadable builds | HTML, JS, WASM, textures, audio, levels | Verify rights and SDK/backend dependencies; package and test |
| Authorized external embeds | Approved iframe URL | Check embedding permission, frame headers, tracking, and availability |

### Suggested ingestion workflow

1. Add an offline `scripts/discover-games.ts` with explicit source-host allowlists. Keep crawling outside page requests.
2. Check robots rules/terms for each source. Prefer sitemaps and official APIs; cache responses and use conditional requests.
3. Fetch permitted pages at low concurrency; parse HTML/structured data; normalize/deduplicate URLs; back off on `429` or `403`.
4. Store drafts with `sourcePage`, `title`, `developerUrl`, `sourceRepo`, `discoveredAt`, `rightsStatus`, and `importStatus`.
5. Resolve each entry to upstream code or an authorized build, then run the same package → isolate → preview → publish flow. Do not automatically publish scraped candidates.

CrazyGames' currently fetched robots rules exclude user/profile paths, search-query pages, and previews, and expose a sitemap index. Recheck before crawling. Its terms describe personal/non-commercial gameplay access, not a redistribution grant for the game catalog. Catalog discovery can lead to developers and source repositories; obtain distributable builds through their actual license or agreement.

Scraped builds can fail because of dynamically loaded assets, signed URLs, publisher SDKs, or missing backends. CORS does not enable iframe embedding: CSP `frame-ancestors` and `X-Frame-Options` govern framing. Treat blocked embeds as unavailable integrations rather than making proxy bypasses the default architecture.

## References

- Each numbered game links directly to its upstream repository.
- [Discovery index](https://github.com/michelpereira/awesome-open-source-games). Entries can be incorrect: its A Dark Room link resolved to an unrelated jam game; this guide uses doublespeakgames instead.
- [CrazyGames robots rules](https://www.crazygames.com/robots.txt) and [terms](https://www.crazygames.com/terms-and-conditions).
- [MDN iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe) and [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).
