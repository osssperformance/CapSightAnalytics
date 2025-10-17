# CapSight Analytics

ASX Commodities Event Calendar - Never miss another drilling result, assay, or JORC update.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Mailgun credentials

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📋 Project Status

**Phase 1, Day 1: Complete!** ✅

- ✅ Next.js 15 initialized with TypeScript
- ✅ Tailwind CSS configured
- ✅ Custom calendar dependencies installed
- ✅ Project structure created
- ✅ Environment variables configured

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 15.0.3 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Database:** Supabase (PostgreSQL)
- **Email:** Mailgun

### Calendar (Custom Built)
- **Date Logic:** @internationalized/date
- **Accessibility:** react-aria
- **Animations:** Framer Motion
- **Gestures:** @use-gesture/react
- **Virtualization:** @tanstack/react-virtual

### State & Data
- **Server State:** @tanstack/react-query
- **Client State:** Zustand
- **Forms:** react-hook-form + Zod

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router
│   ├── (public)/           # Public routes (calendar, companies)
│   ├── (auth)/             # Auth routes (dashboard, watchlist)
│   ├── (company)/          # Company portal
│   ├── (admin)/            # Admin dashboard
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── calendar/           # Custom calendar components
│   └── shared/             # Shared components
└── lib/                    # Utilities
    ├── supabase/           # Supabase client
    ├── hooks/              # Custom hooks
    └── utils/              # Helper functions
```

## 🎯 Next Steps

1. **Configure Supabase:**
   - Create project at https://supabase.com
   - Copy URL and keys to `.env.local`
   - Run database migrations

2. **Configure Mailgun:**
   - Set up account at https://mailgun.com
   - Verify domain
   - Copy API key to `.env.local`

3. **Deploy to Vercel:**
   - Connect GitHub repository
   - Add environment variables
   - Deploy

## 📚 Documentation

- [CLAUDESPEC.md](CLAUDESPEC.md) - Project specifications
- [docs/](docs/) - Comprehensive documentation
  - [Technical Spec](docs/05-DEVELOPMENT/TECHNICALSPEC.md)
  - [Development Plan](docs/05-DEVELOPMENT/DevelopmentPlan.md)
  - [Custom Calendar Decision](docs/02-ARCHITECTURE/TechnicalDecision-CustomCalendar.md)

## 🧪 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 📝 License

Private project - All rights reserved

## 🤝 Team

See [CLAUDESPEC.md](CLAUDESPEC.md) for team structure and resources.

---

**Built with ❤️ for ASX commodities investors**
