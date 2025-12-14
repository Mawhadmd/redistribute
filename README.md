# Redistribute.io - Next.js Migration

Successfully migrated from Create React App to Next.js 15 (App Router).

## ✅ Migration Complete

All CRA features migrated including:

- **Landing Pages**: Home, Pricing, About, Contact, Small Business, Content Creators
- **Auth**: Login, Register
- **Dashboard**: Overview + 7 dashboard pages (protected routes)
- **Shopping**: Product catalog with filtering
- **Policies**: Terms & Privacy Policy

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables** - Create `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
   NEXT_PUBLIC_ADMIN_MASTER_PASSWORD=your_admin_password
   ```

3. **Run development server:**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## 🔑 Key Changes from CRA

- **Routing**: File-based (App Router) instead of React Router
- **Links**: `<Link href="/path">` instead of `<Link to="/path">`
- **Navigation**: `useRouter()` from `next/navigation` instead of `useNavigate()`
- **Client Components**: Add `"use client"` directive for hooks/browser APIs
- **Environment**: `NEXT_PUBLIC_*` instead of `REACT_APP_*`
- **Images**: Use `/image.webp` for static files or `<Image>` component

## 📦 Tech Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS (Montserrat font)
- Supabase (auth & database)
- Lucide React (icons)
- Zod (validation)

## 📁 Structure

```
app/
├── components/      # Shared UI components
├── lib/            # Supabase client & utilities
├── dashboard/      # Protected dashboard (coming soon overlay)
├── login/register/ # Auth pages
└── [pages]/        # Public routes
public/             # Static assets (images, videos)
```

## 📝 Notes

- Dashboard has "Coming soon" overlay (remove from `app/dashboard/layout.tsx`)
- Configure Supabase tables: `users`, `ShopItems`
- Shopping cart is demo only (no checkout)

## 🐛 Troubleshooting

- **Build errors?** Delete `.next` folder and rebuild
- **Supabase errors?** Check environment variables
- **Styling issues?** Verify Tailwind config

---

**Migrated:** December 14, 2025 | **Original:** D:\desktop\web project\react-project\Frontend
