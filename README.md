# CheapLandBuy.com — Full Website Code

A land listing marketplace built with **Next.js 14**, **Tailwind CSS**, and **Supabase**.

---

## Pages Included

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Hero, search, listings, how it works, CTA |
| Browse Listings | `/listings` | Search + filter with sidebar |
| Listing Detail | `/listings/[id]` | Full property page + contact form |
| Sell Land | `/sell` | Landing page for sellers |
| Register | `/auth/register` | Seller sign up |
| Login | `/auth/login` | Seller sign in |
| Dashboard | `/dashboard` | Manage listings |
| Post Listing | `/dashboard/new-listing` | 3-step listing form |

---

## Setup Instructions

### Step 1 — Install Node.js
Download from https://nodejs.org (choose LTS version)

### Step 2 — Set up Supabase (free)
1. Go to https://supabase.com and create a free account
2. Create a new project
3. Go to **SQL Editor** and paste the contents of `supabase-schema.sql` — click Run
4. Go to **Storage** → Create a bucket named `listing-images`, set it to **Public**
5. Go to **Settings → API** and copy your Project URL and anon key

### Step 3 — Configure environment
```bash
cp .env.local.example .env.local
```
Open `.env.local` and fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Step 4 — Install and run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

### Step 5 — Deploy to Vercel (free)
1. Go to https://vercel.com and sign up with GitHub
2. Upload this folder to a GitHub repository
3. In Vercel, click **New Project** → import from GitHub
4. Add your environment variables (from .env.local)
5. Click **Deploy** — done in ~2 minutes

### Step 6 — Connect your GoDaddy domain
1. In Vercel: **Project Settings → Domains** → add `cheaplandbuy.com`
2. Vercel will show you DNS records to add
3. In GoDaddy: **DNS Management** → add the records Vercel shows you
4. Wait 10-30 minutes for it to propagate

---

## Adding Supabase Auth (connect the forms)

The login and register forms are built — just connect them to Supabase:

**Login (`app/auth/login/page.tsx`):**
```typescript
import { createClient } from '../../../lib/supabase';

const supabase = createClient();
const { error } = await supabase.auth.signInWithPassword({ email, password });
if (!error) router.push('/dashboard');
```

**Register (`app/auth/register/page.tsx`):**
```typescript
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: { data: { full_name: form.name } }
});
```

**Post Listing (`app/dashboard/new-listing/page.tsx`):**
```typescript
const { data: { user } } = await supabase.auth.getUser();
await supabase.from('listings').insert({
  seller_id: user.id,
  title: form.title,
  // ... rest of form fields
  status: 'pending'
});
```

---

## Project Structure

```
cheaplandbuy-com/
├── app/                    # Next.js pages
│   ├── page.tsx            # Homepage
│   ├── listings/           # Browse + detail pages
│   ├── auth/               # Login + register
│   ├── dashboard/          # Seller dashboard + post form
│   └── sell/               # Seller landing page
├── components/             # Shared UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ListingCard.tsx
│   └── SearchBar.tsx
├── lib/
│   ├── supabase.ts         # Browser Supabase client
│   ├── supabase-server.ts  # Server Supabase client
│   └── mock-listings.ts    # Sample data for dev
├── types/index.ts          # TypeScript types + constants
└── supabase-schema.sql     # Database setup (run in Supabase)
```
