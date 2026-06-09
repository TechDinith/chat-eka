# Chat Eka - Session Memory

## Project
Real-time Sinhala chatroom. Users login with username + NIC (Sri Lanka) → age/gender extracted client-side. Public chat + private messaging via Firebase Firestore.

## Session 1 - Complete Revamp (in progress)

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
- Build verified (~3s Vite build)

### Current Stack (after revamp)
- Vite 6 + React 19 + TypeScript 5
- Tailwind v4 (no PostCSS/SCSS)
- Firebase Firestore (Firebase Hosting → Vercel at end)
- No routing (conditional render sufficient for 2 views)
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
- localStorage used for session persistence

### Hosting
- Currently Firebase Hosting (chateka site)
- Will migrate to Vercel at end

### Decision Log
- Using `@tailwindcss/vite` plugin for Tailwind v4 (no PostCSS needed)
- Using radix-ui primitives + shadcn/ui for components
- react-router-dom v6 for routing
- All Firebase operations extracted to services/
- Custom hooks for real-time subscriptions
