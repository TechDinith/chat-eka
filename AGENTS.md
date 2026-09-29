# Chat Eka - Session Memory

## Project
Real-time Sinhala chatroom. Users login with username + NIC (Sri Lanka) → age/gender extracted client-side. Public chat + private messaging via Firebase Firestore.

## Session 1 - Complete Revamp (completed)

### Done
- Scanned full codebase
- Created AGENTS.md memory file
- Migrated CRA → Vite (v6.4.3)
- Updated React 18 → 19 (19.2.7)
- Updated TypeScript 4.4 → 5.x (5.9.3)
- Updated Tailwind 3 → v4 (4.3.0) via `@tailwindcss/vite` plugin
- Removed react-scripts, PostCSS, SCSS, testing libs
- Created service layer: `src/services/` (activeUsers, messages, privateMessages)
- Created custom hooks: `useAuth`, `useActiveUsers`, `useMessages`, `usePrivateMessages`
- Refactored App.tsx to use hooks (from 193→10 lines)
- Refactored LoginForm, ChatRoom, PrivateMessage with clean patterns
- Created reusable UI primitives: Button, Input, Modal
- Removed `any` types, `dangerouslySetInnerHTML`, duplicate Firebase logic
- Added loading/error state (sending state in useMessages)
- Env vars migrated from `REACT_APP_` to `VITE_` prefix
- Build verified

## Session 2 - Prebuilt Libraries & Code Cleanup (completed)

### Done
- Removed Firebase Hosting GitHub workflows (prepping for Vercel)
- Installed `@radix-ui/react-dialog`, `@radix-ui/react-slot`, `class-variance-authority`, `tailwind-merge`
- Rewrote `Button.tsx` with `cva` + `twMerge` (variant handling + class merging)
- Rewrote `Modal.tsx` with `@radix-ui/react-dialog` (focus trap, escape key, ARIA, portal)
- Removed dead `analytics` code from `firebase.config.ts`
- Added `id` field to `Message` interface for stable React keys
- Fixed `services/messages.ts` to include Firestore doc IDs in subscription
- Fixed `services/privateMessages.ts`: used `setDoc` with `{ merge: true }`, `arrayUnion` for `notifyNewMessage` (fixes duplicate sender bug), simplified `subscribeConversation`
- Fixed `services/activeUsers.ts`: used `arrayRemove` for `clearNewMessage`
- Fixed `ChatRoom.tsx`: removed `.slice().sort()` (Firestore already orders), `key={i}` → `key={m.id}`
- Fixed `PrivateMessage.tsx`: replaced `.slice()` with `[...messages]`, cleaned up
- Fixed `LoginForm.tsx`: replaced `alert()` with inline validation message
- Simplified `useAuth.ts`: single JSON key in localStorage instead of 5 separate keys
- Removed unused `nic` localStorage save

### Current Stack (after Session 3)
- Vite 6 + React 19 + TypeScript 5
- Tailwind v4 via `@tailwindcss/vite`
- Firebase Firestore
- **UI**: `@radix-ui/react-dialog`, `@radix-ui/react-slot`, `class-variance-authority`, `tailwind-merge`
- Custom hooks + service layer for state/data management

### Firestore Collections
- `activeUsers`: online users {username, age, gender, hasNewMessage?: string[]}
- `messages`: public chat {message: "user: text", timestamp}
- `privateMessages`: keyed by `docId1-docId2` sorted, {participants: string[], messages: string[]}

### NIC Auth (custom, no Firebase Auth)
- Old format: 10 digits ending with V/X → birth year from first 2 digits prefixed "19"
- New format: 12 digits → birth year from first 4 digits
- Gender: digits 2-4 < 500 → Male, else Female
- User doc created in activeUsers on login, deleted on logout
- localStorage used for session persistence (single JSON key)

### Hosting
- Deployed on Vercel
- Vite auto-detected via `vercel.json` (build: `npm run build`, output: `dist/`)
- **Required**: Add these env vars to Vercel dashboard (Project Settings → Environment Variables):
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_FIREBASE_MEASUREMENT_ID`

## Session 3 - Modern UI/UX Overhaul (completed)

### Done
- **Glassmorphism design**: Replaced opaque overlays with `backdrop-blur-xl`, semi-transparent panels (`bg-white/5`, `bg-white/10`), subtle `border-white/10` borders
- **Frosted glass cards**: Login form and chat panels use `rounded-2xl`, `shadow-2xl`, `backdrop-blur-xl` for a premium glass aesthetic
- **Chat bubbles**: Messages displayed as styled bubbles; own messages right-aligned with indigo→purple gradient, others left-aligned with `bg-white/10` + sender avatar
- **User avatars**: Colored circles with initials (8-color palette, hashed from username); shown in sidebar and next to received messages
- **Online indicators**: Green dot (`bg-emerald-400`) next to each user; animated red pulse dot for new message notifications
- **Gradient button**: New `gradient` variant on Button (`from-indigo-500 to-purple-600`)
- **Modern Input**: Glass-styled input with focus ring (`ring-2 ring-indigo-400/50`), proper placeholder opacity
- **Custom scrollbar**: Thin translucent scrollbar via CSS
- **Button polish**: `active:scale-95` press effect, `transition-all duration-200` for smooth hover/active states
- **Layout refinements**: Centered max-width container, consistent spacing, better typography hierarchy
- **Dark gradient background**: Replaced background image with deep indigo/navy gradient (`#0f0a1a` → `#0a0a12`)
- **Responsive layout**: Sidebar hidden on mobile with hamburger overlay; PM panel slides in as overlay below lg breakpoint
- **Age/gender visible**: Shown alongside username in sidebar (was hidden in tooltip only)
- **Removed unused `setUser` prop** from ChatRoom
- **Created `vercel.json`** for Vercel deployment

### Code Philosophy
- **Short, efficient, not noisy, reusable, humane code**
- Prefer prebuilt libraries over reinventing: radix-ui primitives, class-variance-authority, tailwind-merge
- Use Firestore native helpers (`arrayUnion`, `arrayRemove`, `setDoc` with merge) over manual arrays
- Use stable Firestore doc IDs as React keys (never `key={i}`)
- No dead code — remove unused exports/initializations
- Inline trivial wrappers, deduplicate patterns

### Decision Log
- Using `@tailwindcss/vite` plugin for Tailwind v4 (no PostCSS needed)
- Using radix-ui primitives + class-variance-authority + tailwind-merge for components
- All Firebase operations extracted to services/
- Custom hooks for real-time subscriptions

## Session 4 - SEO & Google Indexing (completed)

### Competitive Research
- **srilankanchat.com** is the real threat: 30 sitemap URLs (12 static + 18 blog posts)
- **lankafriends.com**: separate landing page per search intent (`/chatroom`, `/chat`, `/group-chat`)
- **onlanka.com/chat**: keyword-stuffed title, "launched 2004", cited in Sri Lanka Grade 11 ICT textbook
- **kaputa.com**: ranks on domain age alone
- Shared tactics: many indexable pages, keyword-variant titles, long body text, internal links, authority claims

### Done
- Created `public/sitemap.xml` (was 404) — now 7 URLs
- `public/robots.txt` — added `Sitemap:` directive
- `index.html` — canonical, OG + Twitter cards, `og:locale:alternate`, bilingual description, `<noscript>` bilingual content
- `public/manifest.json` — replaced CRA defaults with Chat Eka branding
- Created `src/hooks/useSeo.ts` — per-route `document.title` + meta description (creates tags if missing)
- Created `src/content/pages.ts` — bilingual content data for 6 pages, keyword variants embedded
- Created `src/components/PageShell.tsx` — header/footer layout for internal linking
- Created `src/components/ContentPage.tsx` — renders any page from content data
- Created `src/components/AboutSection.tsx` — bilingual feature block + long-tail keyword variants on login screen
- `src/App.tsx` — added `react-router-dom` v7 routing; `/` = chat, 6 content routes, `*` fallback
- `vercel.json` — added SPA catch-all rewrite + immutable asset caching

### Keyword Strategy
Target long-tail variants surfaced by competitor analysis, embedded in Sinhala + English:
`lanka chat online`, `sinhala chat`, `chat srilanka`, `lanka online chat`, `sinhala chat room`,
`sinhala group chat`, `sri lanka friends chat online free`, `lanka friends`, `sri lanka chat`,
`chat eka`, `චැට් එක`, `සිංහල චැට්`

### Routes
| Route | Priority |
|---|---|
| `/` | 1.0 |
| `/about` | 0.8 |
| `/help` | 0.7 |
| `/community-guidelines` | 0.6 |
| `/safety-guide` | 0.6 |
| `/privacy` | 0.3 |
| `/terms` | 0.3 |

### Important Notes
- **Vercel serves static files before applying rewrites**, so `/(.*)` → `/index.html` is safe; a negative-lookahead regex is NOT supported and breaks deploys
- Pages are **client-rendered only** (no prerender). Google renders JS but it's slower and less reliable. Prerendering is the recommended next step — content is already data-driven in `src/content/pages.ts` to make this easy
- `lang="si"` set on `<html>`; page is bilingual so no `hreflang` (only valid for separate URLs per language)
- Domain stays `chat-eka.vercel.app` (user decision)
