# Cindy & Fausto — Wedding Portal

A full-stack wedding guest management portal built with Next.js 14, Supabase, and Tailwind CSS. Features OTP-based guest authentication, QR code check-in, and a staff dashboard for event operations.

**Live Demo:** [wedding-checkin.vercel.app](https://wedding-checkin.vercel.app)

---

## Overview

This project was built for a real wedding in Luanda, Angola. The couple needed a way for guests to look up their table assignments and for staff to check guests in at the venue using QR codes. The design prioritizes speed and clarity on mobile devices, since staff would be using phones in a busy event space.

---

## Features

- **Guest Lookup** — 6-digit OTP code entry to view table assignment and companion info
- **QR Check-in** — Camera-based QR scanning with jsQR, 0.25 scale for performance, manual fallback
- **Staff Dashboard** — Password auth, guest list with search, individual and companion check-in
- **Design System** — Custom tokens in globals.css, Cinzel + Josefin Sans typography,

---

## Tech Stack

- **Next.js 14** (App Router, React Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Button, Input, Card, Dialog, Sheet, Sonner)
- **Supabase** (PostgreSQL, Auth)
- **jsQR** (QR code detection)

---

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Landing page
│   ├── guest/              # Guest lookup + OTP
│   ├── staff/              # Staff login
│   ├── checkin/            # Check-in dashboard
│   ├── layout.tsx          # Root layout with fonts + Toaster
│   └── globals.css         # Design system tokens
├── components/
│   ├── landing/Welcome.tsx
│   ├── auth/GuestLookup.tsx
│   ├── auth/StaffLogin.tsx
│   ├── dashboard/CheckInInterface.tsx
│   └── QRScanner.tsx
├── lib/supabase/           # Browser + server client factories
└── types/                  # Shared TypeScript interfaces
```

---

## Architecture Decisions

**Server Components for initial data fetch.** The check-in page fetches guest data server-side so staff see content immediately on spotty venue WiFi.

**Supabase SSR with factory pattern.** `createClient()` from `@supabase/ssr` returns a fresh browser client per component. A singleton would leak sessions across requests.

**Single-tap check-in.** No confirmation dialogs. Speed is the primary UX metric for event staff. Undo is the safety net, not the confirm. This reduces 100 check-ins from 200 taps to 100 taps.

**Custom SVG botanical accents.** No stock photos. Privacy for the couple, and it demonstrates asset creation beyond consuming imagery.

**Anti-slop frontend discipline.** 150ms transitions only. No bounce, no parallax, no decorative animation. Transform and opacity only. One accent color. No green check icons. No em-dashes.

---

## What I Learned

**State management in async effects.** The QR scanner bug was a stale closure from an unstable `onScan` callback passed to a child `useEffect`. Wrapping it in `useCallback` with empty deps fixed duplicate scan loops.

**Conditional render vs. prop-driven visibility.** Wrapping the scanner in a Sheet kept the component mounted with an active camera stream. Switching to `{isActive && <QRScanner />}` ensures full unmount and cleanup.

**Design system discipline.** Defining tokens is easy. Using them consistently across every component is hard. This project taught me to audit every file for hardcoded values before shipping.

---

## Local Setup

```bash
git clone https://github.com/ArayAguiar/wedding-checkin-app.git
cd wedding-checkin-app
npm install

# Create .env.local:
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

npm run dev
```

---

## Built By

Aray Aguiar — Frontend developer, aiming for full-stack.

---

## License

MIT
