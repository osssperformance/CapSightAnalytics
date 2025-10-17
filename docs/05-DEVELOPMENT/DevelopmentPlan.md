# CapSight Analytics - Development Plan
## 16-Week Roadmap to MVP Launch

**Version:** 1.0  
**Date:** October 16, 2025  
**Project Start:** October 21, 2025  
**MVP Launch:** February 10, 2026  
**Team Size:** 2-3 developers + 1 business lead

---

## Overview

### Project Phases

| Phase | Duration | Focus | Deliverable |
|-------|----------|-------|-------------|
| Phase 1: Foundation | Weeks 1-4 | Infrastructure + Calendar | Working calendar with 50+ events |
| Phase 2: Company Portal | Weeks 5-8 | Self-service for companies | 20 companies onboarded |
| Phase 3: User Features | Weeks 9-12 | Watchlist + Notifications | 100 beta users |
| Phase 4: Polish & Launch | Weeks 13-16 | Algorithm + Performance | Public launch |

### Resource Allocation

**Developer 1 (Full-Stack Lead):**
- Database design
- Backend APIs
- Authentication
- Edge Functions
- 40 hours/week

**Developer 2 (Frontend Focus):**
- UI components
- Calendar interface
- Company portal
- Mobile responsive
- 40 hours/week

**Developer 3 (Optional - Data/Scraping):**
- ASX scraper
- Data collection
- Government APIs
- Algorithm development
- 20-40 hours/week

**Business Lead:**
- Company outreach
- User research
- Content creation
- Support setup
- 20-30 hours/week

---

## Phase 1: Foundation (Weeks 1-4)

### Week 1: Setup & Infrastructure

**Goals:**
- Development environment ready
- Database schema created
- First page deployed

**Tasks:**

**Monday (Day 1):**
- [X] Create Supabase project (production + staging)
- [X] Initialize Next.js 15 repo with TypeScript
- [X] Set up Tailwind + shadcn/ui
- [X] Configure Vercel deployment
- [X] Set up GitHub repo + branch protection

**Tuesday (Day 2):**
- [X] Design database schema (companies, events, users, commodities)
- [ ] Create migration files
- [ ] Set up Row Level Security policies
- [ ] Create seed data (10 sample companies)

**Wednesday (Day 3):**
- [ ] Set up Supabase Auth (magic links)
- [ ] Create auth components (login, signup)
- [ ] Test authentication flow
- [ ] Deploy to Vercel staging

**Thursday (Day 4):**
- [ ] Set up Mailgun account
- [ ] Verify domain DNS records (SPF/DKIM)
- [ ] Create email templates (welcome, digest)
- [ ] Test sending emails

**Friday (Day 5):**
- [ ] Build homepage (hero + CTA)
- [ ] Build basic navigation
- [ ] Set up analytics (Vercel Analytics)
- [ ] Deploy to production
- [ ] Team demo

**Deliverable:** Working homepage with authentication

---

### Week 2: Custom Calendar Foundationn
**Monday:**
- [ ] Install calendar dependencies (@internationalized/date, react-aria, framer-motion)
- [ ] Set up headless calendar logic (date math, accessibility)
- [ ] Create basic month grid structure (no events yet)
- [ ] Implement keyboard navigation (arrow keys, tab)n

**Tuesday:**
- [ ] Build custom month view component
- [ ] Implement date cell rendering
- [ ] Add today indicator and selection staten
- [ ] Test accessibility (screen readers, keyboard)- [ ] Implement month view
- [ ] Implement week view
- [ ] Implement list view
- [ ] Add view switcher

**Wednesday:**
- [ ] Build filter component (commodities)
- [ ] Implement commodity filtering
- [ ] Add Critical Minerals toggle
- [ ] Test filter performance (<100ms)

**Thursday:**
- [ ] Create event detail modal
- [ ] Display event information
- [ ] Link to company profile (basic)
- [ ] Add share buttons

**Friday:**
- [ ] Mobile responsive testing
- [ ] Fix layout issues
- [ ] Performance optimization
- [ ] Deploy + demo

**Deliverable:** Working calendar with 50+ events

---

### Week 3: Advanced Calendar Featuresn

**Monday:**n
- [ ] Build filter panel UI (sidebar)
- [ ] Multi-dimensional filtering (commodities, event types, date range)
- [ ] Real-time filter updates (optimistic UI)
- [ ] Filter state persistence (URL params)

**Tuesday:**n
- [ ] Smart event clustering algorithm
- [ ] Cluster visualization on mobile
- [ ] Expand/collapse cluster animations
- [ ] Gesture support (swipe, pinch-to-zoom)

**Wednesday:**n
- [ ] Build heatmap overlay (density visualization)
- [ ] Color-code days by event densityn
- [ ] Critical Minerals heat intensit
- [ ] Toggle heatmap on/off

**Thursday:**n
- [ ] Command palette (Cmd+K)
- [ ] Quick actions (jump to date, filter, etc.)
- [ ] Keyboard shortcuts system
- [ ] Search integration

**Friday:**n
- [ ] Timeline scrubber with preview
- [ ] Drag to scrub through months
- [ ] Preview tooltip on hover
- [ ] Mobile testing + bug fixes
- [ ] Deploy + demon

**Deliverable:** Production-ready custom calendar with advanced featuresn
---

### Week 4: Data Collection

**Goals:**
- ASX scraper working
- 20 companies seeded
- 100+ events in database

**Tasks:**

**Monday:**
- [ ] Research ASX announcements endpoint
- [ ] Check robots.txt
- [ ] Build Cheerio scraper (Edge Function)
- [ ] Test scraping 10 announcements

**Tuesday:**
- [ ] Set up scrape queue table
- [ ] Create cron job (hourly)
- [ ] Parse announcement data (company, title, date, PDF)
- [ ] Store in database

**Wednesday:**
- [ ] Manual data entry: Seed 20 companies
- [ ] Research each company's commodities
- [ ] Tag Critical Minerals companies
- [ ] Add logos (from ASX/company websites)

**Thursday:**
- [ ] Scrape historical announcements (past 3 months)
- [ ] Filter for relevant events (drilling, assays, JORC)
- [ ] Clean up event titles
- [ ] Verify data accuracy

**Friday:**
- [ ] Set up monitoring (Sentry)
- [ ] Test scraper error handling
- [ ] Document scraper process
- [ ] Deploy + demo

**Deliverable:** 20 companies, 100+ events, working scraper

**Milestone Review:**
- ✅ Calendar functional
- ✅ Filtering works
- ✅ 20 companies live
- ✅ 100+ events
- ✅ Scraper running
- ✅ Foundation complete

---

## Phase 2: Company Portal (Weeks 5-8)

### Week 5: Authentication & Dashboard

**Goals:**
- Company admin can log in
- Dashboard shows their events
- Basic navigation

**Tasks:**

**Monday:**
- [ ] Create company admin role in database
- [ ] Set up RLS policies (admins see only their data)
- [ ] Build login page for companies
- [ ] Test authentication flow

**Tuesday:**
- [ ] Create dashboard layout
- [ ] Display upcoming events (their company only)
- [ ] Show event counts (total, this month)
- [ ] Add quick action buttons

**Wednesday:**
- [ ] Build sidebar navigation
- [ ] Create profile page route
- [ ] Create events page route
- [ ] Create documents page route

**Thursday:**
- [ ] Display event list (table view)
- [ ] Add filters (draft, published, date)
- [ ] Add search (by title)
- [ ] Pagination (20 per page)

**Friday:**
- [ ] Mobile responsive dashboard
- [ ] Fix bugs
- [ ] Test with 2 companies
- [ ] Deploy + demo

**Deliverable:** Company admin dashboard

---

### Week 6: Event Creation

**Goals:**
- Companies can create events
- Form validation works
- Draft/publish workflow

**Tasks:**

**Monday:**
- [ ] Build event creation form
- [ ] Add form fields (type, title, date, location, description)
- [ ] Implement date picker
- [ ] Add commodity selection

**Tuesday:**
- [ ] Build results data section (optional)
- [ ] Add dynamic fields (grade, width, depth, hole ID)
- [ ] Implement add/remove field buttons
- [ ] Validate number inputs

**Wednesday:**
- [ ] Build document upload component
- [ ] Integrate Supabase Storage
- [ ] Validate file types (PDF only)
- [ ] Show upload progress

**Thursday:**
- [ ] Implement draft/publish toggle
- [ ] Add preview modal
- [ ] Create publish confirmation
- [ ] Send email on publish (to admin + company)

**Friday:**
- [ ] Form validation (required fields)
- [ ] Error handling
- [ ] Success messages
- [ ] Test end-to-end
- [ ] Deploy + demo

**Deliverable:** Working event creation form

---

### Week 7: Profile Editor & Documents

**Goals:**
- Companies can edit their profile
- Document library functional
- Logo upload works

**Tasks:**

**Monday:**
- [ ] Build profile editor form
- [ ] Fields: description, website, contact email
- [ ] Logo upload component
- [ ] Image validation (max 2MB, PNG/JPG)

**Tuesday:**
- [ ] Add commodities selection (checkboxes)
- [ ] Critical Minerals auto-detection
- [ ] Save profile changes
- [ ] Show success message

**Wednesday:**
- [ ] Build document library page
- [ ] Display uploaded documents (list view)
- [ ] Add upload button
- [ ] Show file metadata (size, upload date)

**Thursday:**
- [ ] Implement document tagging (link to events)
- [ ] Public/private toggle
- [ ] Delete functionality
- [ ] Download count tracking

**Friday:**
- [ ] Test complete workflow (signup → profile → event → document)
- [ ] Fix bugs
- [ ] Mobile testing
- [ ] Deploy + demo

**Deliverable:** Complete company portal

---

### Week 8: Onboarding & Testing

**Goals:**
- 20 companies onboarded
- Beta testing complete
- Bugs fixed

**Tasks:**

**Monday:**
- [ ] Create onboarding checklist
- [ ] Build welcome email (instructions)
- [ ] Create video tutorial (Loom, 5 min)
- [ ] Write help documentation

**Tuesday - Thursday:**
- [ ] Reach out to 20 target companies
- [ ] Send invite links
- [ ] Schedule onboarding calls
- [ ] Help companies create first event

**Friday:**
- [ ] Collect feedback from companies
- [ ] Fix critical bugs
- [ ] Improve UX based on feedback
- [ ] Prepare for Phase 3

**Deliverable:** 20 companies onboarded, portal tested

**Milestone Review:**
- ✅ Company portal functional
- ✅ 20 companies onboarded
- ✅ Companies can create events independently
- ✅ 200+ events in database
- ✅ Zero critical bugs

---

## Phase 3: User Features (Weeks 9-12)

### Week 9: Watchlist

**Goals:**
- Users can create watchlist
- Watchlist displays correctly
- Calendar filters by watchlist

**Tasks:**

**Monday:**
- [ ] Create watchlist table
- [ ] Build "Add to Watchlist" button
- [ ] Implement add/remove logic
- [ ] Show watchlist count

**Tuesday:**
- [ ] Build watchlist page
- [ ] Display watched companies (cards)
- [ ] Add remove buttons
- [ ] Empty state (no companies)

**Wednesday:**
- [ ] Add watchlist filter to calendar
- [ ] Toggle "My Watchlist Only"
- [ ] Test filtering performance
- [ ] Show watchlist indicator on event cards

**Thursday:**
- [ ] Build company search/add modal
- [ ] Autocomplete search
- [ ] Display search results
- [ ] Add from search

**Friday:**
- [ ] Watchlist limit (10 for free, unlimited for premium)
- [ ] Upgrade prompt
- [ ] Mobile testing
- [ ] Deploy + demo

**Deliverable:** Functional watchlist

---

### Week 10: Email Notifications

**Goals:**
- Daily digest sends at 9am
- Users can manage preferences
- Email looks good on all clients

**Tasks:**

**Monday:**
- [ ] Create notification_preferences column
- [ ] Build preferences page
- [ ] Checkboxes: daily digest, event alerts, real-time
- [ ] Save preferences

**Tuesday:**
- [ ] Build daily digest email template (React Email)
- [ ] Fetch user's watchlist events (today + next 7 days)
- [ ] Generate personalized email
- [ ] Test rendering

**Wednesday:**
- [ ] Create Edge Function: send-daily-digest
- [ ] Batch users (100 at a time)
- [ ] Send via Mailgun
- [ ] Handle errors (log failures)

**Thursday:**
- [ ] Set up cron job (9am AEST daily)
- [ ] Test cron trigger
- [ ] Monitor first sends
- [ ] Check deliverability (Gmail, Outlook)

**Friday:**
- [ ] Build unsubscribe page
- [ ] Token-based unsubscribe
- [ ] Update preferences
- [ ] Test unsubscribe flow
- [ ] Deploy + demo

**Deliverable:** Daily digest emails working

---

### Week 11: Calendar Export & Search

**Goals:**
- Users can export .ics files
- Search works across companies/events
- Filters are fast

**Tasks:**

**Monday:**
- [ ] Implement .ics file generation
- [ ] Single event export
- [ ] Test import to Google Calendar, Outlook, Apple Calendar
- [ ] Download button

**Tuesday:**
- [ ] Build webcal:// subscription feed
- [ ] Filter by user's watchlist
- [ ] Generate unique user URLs
- [ ] Test auto-sync

**Wednesday:**
- [ ] Implement full-text search (Postgres)
- [ ] Search across companies + events
- [ ] Build search UI (header)
- [ ] Display results (companies + events)

**Thursday:**
- [ ] Add advanced filters (multi-select commodities)
- [ ] Date range picker
- [ ] Event type multi-select
- [ ] Combine filters (AND logic)

**Friday:**
- [ ] Performance testing (100ms target)
- [ ] Add search analytics (track queries)
- [ ] Mobile search UI
- [ ] Deploy + demo

**Deliverable:** Export + Search features

---

### Week 12: Critical Minerals Hub

**Goals:**
- Dedicated Critical Minerals pages
- Government funding tracker
- SEO optimized

**Tasks:**

**Monday:**
- [ ] Create critical_minerals reference table
- [ ] Seed data (25 minerals with descriptions)
- [ ] Build Critical Minerals hub page (/critical-minerals)
- [ ] List all minerals with counts

**Tuesday:**
- [ ] Create commodity-specific pages (/critical-minerals/lithium)
- [ ] Display companies by mineral
- [ ] Show use cases, demand drivers
- [ ] Government priority badge

**Wednesday:**
- [ ] Build government_incentives table
- [ ] Manual data entry (known grants/loans)
- [ ] Display on company profiles
- [ ] Link to official announcements

**Thursday:**
- [ ] Add meta tags for all Critical Minerals pages
- [ ] Structured data (JSON-LD)
- [ ] Generate sitemap
- [ ] Submit to Google Search Console

**Friday:**
- [ ] Write content for top 5 minerals (Lithium, REE, Nickel, Copper, Graphite)
- [ ] Add images (stock photos)
- [ ] Internal linking
- [ ] Deploy + demo

**Deliverable:** Critical Minerals hub live

**Milestone Review:**
- ✅ Watchlist functional
- ✅ Email notifications working
- ✅ Calendar export working
- ✅ Search functional
- ✅ Critical Minerals hub live
- ✅ 50+ companies onboarded
- ✅ 500+ events in database

---

## Phase 4: Polish & Launch (Weeks 13-16)

### Week 13: Algorithm V1

**Goals:**
- Basic scoring algorithm
- Recommendations page
- Transparency (show reasoning)

**Tasks:**

**Monday:**
- [ ] Define scoring formula
- [ ] Factors: event frequency, insider buying, share price momentum, Critical Minerals
- [ ] Write algorithm function (PL/pgSQL or Edge Function)

**Tuesday:**
- [ ] Backtest on historical data (3 months)
- [ ] Measure accuracy (% positive price movement)
- [ ] Adjust weights
- [ ] Target: >65% accuracy

**Wednesday:**
- [ ] Create recommendation_scores table
- [ ] Set up cron job (recalculate every 6 hours)
- [ ] Pre-calculate scores for all companies
- [ ] Index for fast queries

**Thursday:**
- [ ] Build recommendations page
- [ ] Display top 10 companies (highest scores)
- [ ] Show reasoning (breakdown by factor)
- [ ] Add disclaimers ("not financial advice")

**Friday:**
- [ ] Add "Recommended" badge to company cards
- [ ] Test algorithm performance
- [ ] Manual review (sanity check recommendations)
- [ ] Deploy + demo

**Deliverable:** Algorithm V1 live

---

### Week 14: PWA & Performance

**Goals:**
- PWA installable
- Offline mode works
- Performance optimized

**Tasks:**

**Monday:**
- [ ] Create manifest.json
- [ ] Add PWA icons (512x512, 192x192)
- [ ] Set up service worker
- [ ] Test install prompt (Chrome, Safari)

**Tuesday:**
- [ ] Implement offline mode
- [ ] Cache calendar data
- [ ] Cache company profiles
- [ ] Show "Offline" indicator

**Wednesday:**
- [ ] Performance audit (Lighthouse)
- [ ] Optimize images (next/image)
- [ ] Code splitting (dynamic imports)
- [ ] Reduce bundle size

**Thursday:**
- [ ] Database query optimization
- [ ] Add indexes (commonly filtered fields)
- [ ] Test with 1000+ events
- [ ] Measure response times

**Friday:**
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Mobile testing (iOS, Android)
- [ ] Fix bugs
- [ ] Deploy + demo

**Deliverable:** PWA + Performance optimized

---

### Week 15: Analytics & Admin Tools

**Goals:**
- Admin dashboard functional
- Analytics tracking everything
- Monitoring in place

**Tasks:**

**Monday:**
- [ ] Set up PostHog (user analytics)
- [ ] Track key events (page views, filter usage, watchlist adds)
- [ ] Create custom events
- [ ] Test tracking

**Tuesday:**
- [ ] Build admin dashboard
- [ ] Display user metrics (signups, DAU, retention)
- [ ] Display company metrics (events published, documents uploaded)
- [ ] Platform health (uptime, errors)

**Wednesday:**
- [ ] Create company approval workflow
- [ ] Pending applications table
- [ ] Approve/reject buttons
- [ ] Send email on approval

**Thursday:**
- [ ] Build content moderation page
- [ ] Display flagged events/documents
- [ ] Unpublish button
- [ ] Ban user button

**Friday:**
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure Sentry alerts (Slack)
- [ ] Create runbook (common issues)
- [ ] Deploy + demo

**Deliverable:** Admin tools + Monitoring

---

### Week 16: Launch Preparation

**Goals:**
- Beta testing complete
- All bugs fixed
- Marketing ready

**Tasks:**

**Monday:**
- [ ] Recruit 50 beta testers
- [ ] Send beta invites
- [ ] Create feedback form (Typeform)
- [ ] Monitor usage

**Tuesday:**
- [ ] Fix critical bugs from beta
- [ ] Improve UX based on feedback
- [ ] Polish UI (final touches)
- [ ] Test on 10+ devices

**Wednesday:**
- [ ] Write Terms of Service
- [ ] Write Privacy Policy
- [ ] Add cookie consent banner
- [ ] Legal review (if budget allows)

**Thursday:**
- [ ] Create marketing website (separate from app)
- [ ] Write copy (homepage, features, pricing)
- [ ] Add screenshots/demos
- [ ] SEO optimization

**Friday:**
- [ ] Final smoke tests (every feature)
- [ ] Deploy to production
- [ ] Monitor for 24 hours
- [ ] Soft launch (announce to small group)

**Weekend:**
- [ ] Public launch announcement
- [ ] Post on LinkedIn, Twitter
- [ ] Email to company mailing list
- [ ] Monitor closely

**Deliverable:** 🚀 MVP LAUNCHED!

**Launch Checklist:**
- ✅ 50 companies onboarded
- ✅ 500+ events in database
- ✅ 100+ beta users signed up
- ✅ Zero critical bugs
- ✅ Performance targets met (<2s load)
- ✅ Email system working (>40% open rate)
- ✅ Algorithm live (>65% accuracy)
- ✅ PWA installable
- ✅ Monitoring in place
- ✅ Legal docs complete

---

## Post-Launch (Weeks 17-20)

### Immediate Priorities (Week 17-18)

**Monday-Friday:**
- [ ] Monitor performance metrics
- [ ] Fix bugs (prioritize by severity)
- [ ] Respond to support tickets (<24 hours)
- [ ] Collect user feedback
- [ ] Iterate on UX

**Week 18:**
- [ ] Analyze user behavior (PostHog)
- [ ] Identify drop-off points
- [ ] A/B test key pages
- [ ] Optimize conversion funnels

### Growth Phase (Week 19-20)

**Focus:**
- [ ] Company outreach (target 100 companies)
- [ ] Content marketing (blog posts)
- [ ] SEO optimization (backlinks)
- [ ] Email marketing (newsletter)

**Features to Consider:**
- [ ] SMS alerts (Twilio)
- [ ] Premium tier (unlimited watchlist)
- [ ] Advanced filters
- [ ] Management team profiles
- [ ] Project portfolio maps

---

## Resource Planning

### Budget (16 Weeks)

**Development Costs:**
- Developer 1: $80/hour × 40 hours/week × 16 weeks = $51,200
- Developer 2: $80/hour × 40 hours/week × 16 weeks = $51,200
- Developer 3: $60/hour × 30 hours/week × 8 weeks = $14,400
- **Total Dev:** $116,800

**Infrastructure (16 weeks):**
- Supabase Pro: $25/month × 4 = $100 (paid tier from start)
- Vercel Pro: $20/month × 4 = $80 (paid tier from start)
- Mailgun: $35/month × 3 = $105 (Foundation tier from Week 10)
- Domain: $2/month × 4 = $8
- Tools (Sentry, PostHog): Free tiers
- **Total Infrastructure:** ~$293

**Miscellaneous:**
- Legal review (Terms/Privacy): $1,000
- Stock photos: $100
- Marketing website: $500
- **Total Misc:** $1,600

**Grand Total:** ~$118,693

### Time Allocation by Role

**Full-Stack Lead (640 hours):**
- Backend APIs: 200 hours
- Database design: 80 hours
- Authentication: 60 hours
- Edge Functions: 100 hours
- Integration: 100 hours
- Bug fixes: 100 hours

**Frontend Developer (640 hours):**
- Calendar UI: 120 hours
- Company portal: 160 hours
- User features: 120 hours
- Mobile responsive: 80 hours
- PWA: 60 hours
- Polish: 100 hours

**Data Engineer (240 hours):**
- Scraper: 60 hours
- Data collection: 80 hours
- Algorithm: 60 hours
- Government APIs: 40 hours

**Business Lead (400 hours):**
- Company outreach: 160 hours
- Content creation: 80 hours
- User research: 60 hours
- Support setup: 40 hours
- Marketing: 60 hours

---

## Risk Mitigation

### Technical Risks

**1. ASX Blocks Scraping**
- **Week 4 decision point:** If blocked, pivot to manual entry + official feed ($500/month)
- **Fallback:** Companies enter their own events (already building this)

**2. Performance Issues**
- **Week 14 decision point:** If slow, upgrade Supabase tier ($25 → $599/month)
- **Mitigation:** Load testing in Week 13

**3. Email Deliverability**
- **Week 10 decision point:** If bounce rate >5%, investigate domain reputation
- **Mitigation:** Warm-up sending (gradual volume increase)

### Business Risks

**4. Companies Don't Sign Up**
- **Week 8 decision point:** If <10 companies, re-evaluate pricing/value prop
- **Mitigation:** Free trial for first 20 companies

**5. Users Don't Engage**
- **Week 12 decision point:** If <50 beta users, improve onboarding
- **Mitigation:** User interviews in Week 11

---

## Success Metrics (Post-Launch)

### Week 17 Targets
- 50 companies onboarded
- 500 registered users
- 100 daily active users
- 50 events published per week
- 99% uptime

### Week 20 Targets
- 75 companies onboarded
- 1,000 registered users
- 200 daily active users
- 100 events published per week
- 5 premium subscriptions

### Month 6 Targets
- 100 companies ($100k MRR)
- 2,000 registered users
- 500 daily active users
- Algorithm >70% accuracy
- 50 premium subscriptions ($1,450 MRR)

---

## Communication Rhythm

### Daily (During Development)
- Quick Slack check-in (5 min)
- Blockers shared immediately
- PR reviews within 4 hours

### Weekly (Fridays)
- Demo day (30 min)
- Show completed features
- Celebrate wins
- Plan next week

### Bi-Weekly
- Progress review (30 min)
- Budget check
- Timeline adjustments
- Risk assessment

### Launch Week (Week 16)
- Daily standups (15 min)
- Bug triage (morning)
- Deployment checks (evening)
- War room (Slack channel)

---

## Appendix: Key Deliverables

### Week 4 Demo
- Calendar with 100+ events
- Basic filtering (commodity, date)
- 20 company profiles
- Scraper running hourly

### Week 8 Demo
- Company portal (event creation)
- 20 companies onboarded
- 200+ events in database
- Document uploads working

### Week 12 Demo
- Watchlist functional
- Email notifications working
- Critical Minerals hub
- 500+ events in database

### Week 16 Demo
- Algorithm recommendations
- PWA installable
- Admin dashboard
- 🚀 PUBLIC LAUNCH

---

**Document Owner:** Technical Lead  
**Last Updated:** October 16, 2025  
**Next Review:** Weekly (every Friday)

**Sign-off:**
- [ ] Technical Lead (commits to timeline)
- [ ] Business Lead (commits to outreach)
- [ ] Team Agreement (realistic, achievable)