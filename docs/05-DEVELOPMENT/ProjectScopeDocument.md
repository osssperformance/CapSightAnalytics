# CapSight Analytics - Project Scope Document
## Keeping the Project on Track

**Version:** 1.0  
**Date:** October 16, 2025  
**Status:** Draft for Approval  
**Project Duration:** 16 weeks to MVP launch

---

## Executive Summary

**What We're Building:**
A calendar-first platform for ASX commodities investors to track exploration events, company announcements, and receive algorithm-driven recommendations.

**Core Value Proposition:**
- Never miss another drilling result announcement
- Know when directors are buying their own stock
- Get alerted to Critical Minerals opportunities
- Algorithm spots patterns humans miss

**Success Criteria:**
- 50 paying companies by Month 6
- 1,000 active investors by Month 6
- Platform uptime >99.5%
- Algorithm accuracy >65%

---

## Project Scope

### IN SCOPE (We WILL Build This)

#### Phase 1: MVP (Weeks 1-8)

**1. Public Calendar (Core Feature)**
- ✅ Month/week/list calendar views
- ✅ Filter by commodity (Gold, Lithium, Copper, etc.)
- ✅ Filter by Critical Minerals (⭐ subset)
- ✅ Filter by event type (Drilling, Assay, JORC)
- ✅ Filter by date range
- ✅ Event detail pages (full information)
- ✅ Real-time updates (no refresh needed)
- ✅ Mobile-responsive design

**2. Company Profiles (Public)**
- ✅ Basic info (ASX code, market cap, commodities)
- ✅ Critical Minerals badges (⭐)
- ✅ Upcoming events list
- ✅ About section
- ✅ Contact information
- ✅ Share price chart (basic)
- ❌ Management team (Phase 2)
- ❌ Project portfolio (Phase 2)

**3. Company Portal (For Companies)**
- ✅ Event creation form
- ✅ Event editing/deletion
- ✅ Draft/publish workflow
- ✅ Document upload (PDFs)
- ✅ Basic profile editing
- ✅ Dashboard (upcoming events list)
- ❌ Advanced analytics (Phase 3)
- ❌ Multiple admin users (Phase 2)

**4. User Features (Investors)**
- ✅ Magic link authentication
- ✅ Watchlist (up to 10 companies)
- ✅ Email notifications (daily digest)
- ✅ Basic preferences (timezone, notification frequency)
- ❌ Premium features (Phase 2)
- ❌ API access (Phase 3)

**5. Data Collection**
- ✅ Company data submitted directly by 100 invited companies (primary source)
- ✅ Manual company onboarding (first 20 companies)
- ✅ ASX announcements scraper (secondary/fallback for non-participating companies)
- ✅ Basic share price data (Yahoo Finance)
- ❌ Director trades scraping (Phase 2)
- ❌ Social sentiment (Phase 3)

**6. Infrastructure**
- ✅ Supabase database + auth
- ✅ Next.js frontend (Vercel)
- ✅ Edge Functions (basic)
- ✅ Email system (Mailgun)
- ✅ File storage (Supabase)
- ✅ Cron jobs (pg_cron)

#### Phase 2: Enhanced Features (Weeks 9-12)

**1. Algorithm V1**
- ✅ Basic scoring system
- ✅ Pre-calculated scores (6-hour refresh)
- ✅ Historical performance tracking
- ✅ Insider buying signals
- ✅ Simple recommendations
- ❌ Machine learning (Phase 3)
- ❌ Sentiment analysis (Phase 3)

**2. Advanced Company Profiles**
- ✅ Management team section
- ✅ Project portfolio with maps
- ✅ Document library
- ✅ Historical events archive
- ✅ Government funding tracker (Critical Minerals)

**3. Enhanced User Features**
- ✅ Unlimited watchlist (premium)
- ✅ Advanced filters (combine multiple)
- ✅ Calendar export (.ics)
- ✅ Subscribe to calendar feed (webcal://)
- ✅ SMS alerts (optional, Twilio)

**4. Critical Minerals Features**
- ✅ Dedicated Critical Minerals hub
- ✅ Government funding tracker
- ✅ Commodity-specific landing pages
- ✅ Critical Minerals badge system

#### Phase 3: Scale & Optimize (Weeks 13-16)

**1. PWA Enhancements**
- ✅ Offline mode
- ✅ Push notifications
- ✅ Install prompts
- ✅ Service worker caching

**2. Analytics & Monitoring**
- ✅ User analytics (PostHog)
- ✅ Error tracking (Sentry)
- ✅ Performance monitoring
- ✅ Usage dashboards

**3. SEO & Content**
- ✅ Commodity landing pages
- ✅ Critical Minerals content
- ✅ Blog setup
- ✅ Meta tags + structured data

**4. Admin Tools**
- ✅ Company approval workflow
- ✅ Content moderation dashboard
- ✅ Analytics dashboard
- ✅ Support ticket system (basic)

---

### OUT OF SCOPE (We Will NOT Build This)

#### Definitely Not in MVP

**Features We're Deferring:**
- ❌ **Social features** (comments, forums, chat)
- ❌ **Mobile native apps** (iOS, Android) - PWA only
- ❌ **Advanced charting** (TradingView-level)
- ❌ **Portfolio tracking** (users track their holdings)
- ❌ **Trading integration** (buy/sell within platform)
- ❌ **Broker integration** (CommSec, Commsec Pocket, etc.)
- ❌ **Video content** (interviews, webinars)
- ❌ **Podcasts** (audio content)
- ❌ **Community voting** (upvote/downvote companies)
- ❌ **Gamification** (badges, leaderboards)
- ❌ **Referral program** (invite friends)
- ❌ **White-label solution** (rebrand for others)
- ❌ **International markets** (ASX only)
- ❌ **Crypto/tokens** (no blockchain integration)

**Data We're NOT Collecting:**
- ❌ **Drilling assay data** (grades, widths, depths) - Too complex for MVP
- ❌ **JORC resource calculations** (users can see PDFs)
- ❌ **Financial modeling** (NPV, IRR, DCF)
- ❌ **Broker research reports** (legal/licensing issues)
- ❌ **Real-time share prices** (15-20 min delay is fine)
- ❌ **Options chain data**
- ❌ **Short interest data**

**Advanced Features:**
- ❌ **Machine learning** (Phase 4+)
- ❌ **AI chatbot** (Phase 4+)
- ❌ **Custom alerts** (complex conditions)
- ❌ **Backtesting tool** (for algorithms)
- ❌ **Excel/CSV export** (basic only)
- ❌ **API for third parties** (Phase 4+)
- ❌ **Zapier integration**
- ❌ **Slack/Discord bots**

#### Why These Are Out of Scope

**Reason 1: Complexity**
- Each feature adds 2-4 weeks development
- Each feature adds ongoing maintenance
- Focus on doing ONE thing exceptionally well

**Reason 2: Legal/Compliance**
- Trading = financial services license required
- Research reports = licensing fees
- Financial advice = regulatory nightmare

**Reason 3: Distraction**
- Social features require moderation (time sink)
- Portfolio tracking shifts focus from discovery to monitoring
- We're a research tool, not a broker

**Reason 4: Market Validation**
- Build core first, validate demand
- Add features users actually request
- Don't build what we THINK they want

---

## Core Feature Definitions

### 1. Calendar (The Heart of the Platform)n
n
**Must Have:**n
- Custom-built from scratch (not react-big-calendar)n
- Display 1,000+ events smoothlyn
- Multiple views (month, week, day, list, heatmap)n
- Fast filtering (<100ms response)n
- Mobile-responsive with gesture supportn
- Real-time updates via Supabase subscriptionsn
- Keyboard shortcuts (power users)n
- Command palette (Cmd+K)n
- Export to personal calendar (.ics, webcal://)n
n
**Unique Features (Competitive Moat):**n
- Smart event clustering (3+ events → "3 Lithium Events")n
- Predictive highlighting (AI importance scoring)n
- Density heatmap overlay (visualize busy periods)n
- Timeline scrubber with live previewn
- Collaborative watching (Supabase Presence)n
- Gesture navigation (swipe months, pinch zoom)n
n
**Won't Have (Initially):**n
- Drag-and-drop event editing (company portal only)n
- Recurring events (not relevant for mining)n
- Color customization (preset colors only)n
- Private events (all public)n
- Multi-calendar overlay (future: watchlist as separate layer)n
n
**Success Metrics:**n
- Page load <2sn
- Filter response <100msn
- Smooth 60fps animationsn
- 90%+ of users use filtersn
- 60%+ return weeklyn
- <5% bounce rate on calendar pagen
n
**Development Timeline:**n
- Week 1: Foundation (headless logic, basic grid)n
- Week 2: Event rendering (cards, modals, views)n
- Week 3: Advanced features (filters, clustering, heatmap)n
- Week 4: Mobile (gestures, responsive)n
- Week 5: Delight (animations, command palette)n
- Week 6: Performance (virtualization, prefetching)n
- Week 7: Polish (edge cases, loading states)n
- Week 8: User testing + refinementn
n
**Total: 8 weeks strategic investment in core product**n- Page load <2s
- Filter response <100ms
- 80%+ of users use filters
- 50%+ return weekly

---

### 2. Company Portal

**Must Have:**
- Easy event creation (<3 minutes)
- Draft/publish workflow
- Document upload (PDF, max 50MB)
- Preview before publishing
- Email confirmation on publish

**Won't Have:**
- Rich text editor (plain text + formatting)
- Image galleries (PDFs only)
- Video embeds (too expensive)
- Collaboration features (single admin)
- Version history (just edit)

**Success Metrics:**
- 90%+ events published within 24 hours
- <5% event deletions (quality)
- <1% support tickets per event

---

### 3. Algorithm (Recommendation Engine)

**Must Have (Phase 2):**
- Score based on historical data
- Insider buying signals
- Event frequency scoring
- Critical Minerals bonus
- Show reasoning (transparency)

**Won't Have:**
- Machine learning (Phase 4+)
- Social sentiment (Phase 3)
- Real-time recalculation (6-hour refresh)
- Backtesting tool (internal only)
- User feedback loop (Phase 4+)

**Success Metrics:**
- >65% accuracy (positive price movement)
- >50% users view recommendations
- <10% false positives (high confidence only)

---

### 4. Email Notifications

**Must Have:**
- Daily digest (9am AEST)
- Event alerts (watchlist companies)
- Unsubscribe link
- Mobile-responsive
- Plain text alternative

**Won't Have:**
- Real-time alerts (<1 hour delay)
- Custom timing (9am only)
- Rich HTML templates (simple only)
- A/B testing (Phase 3)
- Personalized recommendations (Phase 3)

**Success Metrics:**
- >40% open rate
- <5% bounce rate
- <1% unsubscribe rate
- <2% spam complaints

---

## Technical Constraints & Boundaries

### Performance Requirements

**Page Load Times:**
- Homepage: <2 seconds
- Calendar: <2 seconds
- Company profile: <1.5 seconds
- Event detail: <1 second

**API Response Times:**
- Filter operations: <100ms
- Database queries: <50ms
- Search: <200ms

**Uptime:**
- Target: 99.5% (3.65 hours downtime/month)
- Maintenance windows: Sunday 2-4am AEST

### Scalability Limits (MVP)

**Users:**
- Target: 1,000 active users
- Max supported: 5,000 users
- Beyond 5k: Database upgrade required

**Companies:**
- Target: 50 paying companies
- Max supported: 200 companies
- Beyond 200: Scraper optimization needed

**Events:**
- Target: 500 events/month
- Max supported: 2,000 events/month
- Storage: 100GB (3 years of PDFs)

### Browser Support

**Supported:**
- ✅ Chrome/Edge (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 10+)

**Not Supported:**
- ❌ Internet Explorer
- ❌ Opera Mini
- ❌ UC Browser
- ❌ Old Android (<10)

### Data Retention

**Keep Forever:**
- Company profiles
- Published events
- User accounts (unless deleted)

**Keep 2 Years:**
- Event PDFs (archive to cold storage)
- Email logs
- Analytics data

**Keep 30 Days:**
- Error logs
- Performance metrics
- Scraper logs

### Security Boundaries

**What We Protect:**
- User passwords (hashed)
- API keys (encrypted in vault)
- Payment information (Stripe only, never stored)
- Company data (RLS policies)

**What Users Must Protect:**
- Their email accounts (magic links)
- Their devices (no 2FA initially)
- Their API tokens (if Phase 3+)

---

## User Roles & Permissions

### 1. Public (Anonymous)
- ✅ View calendar
- ✅ View company profiles
- ✅ View event details
- ✅ View Critical Minerals hub
- ❌ No watchlist
- ❌ No email alerts
- ❌ Cannot export calendar

### 2. Investor (Free Account)
- ✅ Everything public can do
- ✅ Watchlist (up to 10 companies)
- ✅ Email digest (daily)
- ✅ Basic filters
- ✅ Export .ics (single events)
- ❌ No calendar feed subscription
- ❌ No SMS alerts
- ❌ No algorithm recommendations

### 3. Investor (Premium - $29/month)
- ✅ Everything free can do
- ✅ Unlimited watchlist
- ✅ Advanced filters (combine multiple)
- ✅ Calendar feed subscription (webcal://)
- ✅ Algorithm recommendations
- ✅ SMS alerts (optional)
- ✅ Priority support
- ❌ No API access (Phase 3+)

### 4. Company Admin
- ✅ View their own company profile
- ✅ Create/edit/delete events
- ✅ Upload documents
- ✅ Edit company profile
- ✅ View analytics (basic)
- ❌ Cannot see other companies' data
- ❌ Cannot edit published events (after 1 hour)

### 5. Platform Admin
- ✅ Full read access (everything)
- ✅ Approve/reject companies
- ✅ Moderate content
- ✅ View all analytics
- ✅ User management
- ❌ Cannot edit company events (read-only)

---

## Content Guidelines

### What Companies Can Post

**Allowed Event Types:**
- Drilling results
- Assay results
- JORC resource updates
- Production updates
- Feasibility studies
- Permits & approvals
- Capital raises
- Quarterly reports
- AGM/EGM dates

**Allowed Documents:**
- ASX announcements (PDF)
- Drilling plans (PDF)
- Assay certificates (PDF)
- Resource statements (PDF)
- Presentations (PDF)
- Annual reports (PDF)

**Content Rules:**
- Must be factual (no hype)
- Must link to ASX announcement (if price sensitive)
- Must be relevant to exploration/mining
- English only
- No profanity
- No spam

### What's Prohibited

**Banned Content:**
- Pump & dump schemes
- Financial advice
- Stock recommendations (platform only)
- Spam/advertising
- Copyrighted material (without permission)
- Personal attacks
- Political content (unless directly mining-related)

**Banned Documents:**
- Executables (.exe, .dmg)
- Compressed files (.zip, .rar) - unless justified
- Images (upload to PDF first)
- Videos (too expensive to host)

---

## Integration Points

### External Services We Use

**Required (MVP):**
- Supabase (database, auth, storage)
- Vercel (hosting)
- Mailgun (email)
- Yahoo Finance API (share prices)
- ASX website (announcements)

**Optional (Phase 2+):**
- Twilio (SMS alerts)
- Stripe (payments)
- Geoscience Australia API (Critical Minerals data)

**Monitoring (Phase 3):**
- Sentry (error tracking)
- PostHog (analytics)
- Vercel Analytics (performance)

### Data We DON'T Integrate

**No Access To:**
- Trading platforms (CommSec, etc.)
- Banking APIs
- Broker research systems
- Bloomberg/Morningstar (too expensive)
- Social media direct APIs (scraping only)

---

## Success Criteria

### Launch Readiness (Week 8)

**Must Have:**
- ✅ 20 companies onboarded
- ✅ 100+ events in calendar
- ✅ Calendar loads <2s
- ✅ Zero critical bugs
- ✅ Mobile responsive (all pages)
- ✅ Email system working
- ✅ Terms of service + privacy policy
- ✅ 10 beta testers signed up

**Nice to Have:**
- 🟡 50 companies onboarded
- 🟡 500+ events in calendar
- 🟡 Company portal tested by 5 companies
- 🟡 50 beta testers signed up

### Month 3 (Post-Launch)

**Targets:**
- 20 paying companies ($20k MRR)
- 500 registered investors
- 100 daily active users
- 20 events published per week
- <5 support tickets per week
- 99% uptime

### Month 6 (Growth)

**Targets:**
- 50 paying companies ($50k MRR)
- 1,000 registered investors
- 300 daily active users
- 50 events published per week
- Algorithm live (>65% accuracy)
- 10 premium investor subscriptions

---

## Risk Management

### High-Risk Items

**1. ASX Blocks Scraping**
- **Probability:** Low (reduced - primary data from 100 invited companies)
- **Impact:** Medium (reduced - companies submit directly)
- **Mitigation:** Company-first data strategy (100 invites), ASX scraping as fallback only, official data feed ($500/month) if needed
- **Owner:** Technical Lead
- **Note:** Legal review still required for any scraping activities

**2. Companies Don't Sign Up**
- **Probability:** Medium
- **Impact:** Critical
- **Mitigation:** Pilot program, free trial, direct outreach
- **Owner:** Business Lead

**3. Algorithm Inaccurate**
- **Probability:** Low
- **Impact:** High
- **Mitigation:** Backtest first, show confidence scores, transparency
- **Owner:** Technical Lead

**4. Legal Issues**
- **Probability:** Low
- **Impact:** Critical
- **Mitigation:** Lawyer review, clear disclaimers, no advice
- **Owner:** Business Lead

### Medium-Risk Items

**5. Email Deliverability**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** SPF/DKIM, warm-up, monitor bounce rate
- **Owner:** Technical Lead

**6. Performance Issues**
- **Probability:** Low
- **Impact:** Medium
- **Mitigation:** Load testing, CDN, database optimization
- **Owner:** Technical Lead

**7. Competitor Launches Similar**
- **Probability:** Medium
- **Impact:** Medium
- **Mitigation:** Speed to market, network effects, algorithm advantage
- **Owner:** Business Lead

---

## Change Management

### How to Handle Scope Changes

**Process:**
1. Request submitted (email, Notion, meeting)
2. Evaluate impact (time, cost, risk)
3. Prioritize (critical, nice-to-have, reject)
4. Update scope doc + timeline
5. Communicate to team

**Approval Required For:**
- Adding new features
- Removing planned features
- Changing timeline by >1 week
- Budget changes >$1,000
- Technology stack changes

**No Approval Needed For:**
- UI/UX tweaks
- Bug fixes
- Performance optimizations
- Content changes
- Minor feature enhancements

### Feature Request Template

```
Feature: [Name]
Requested By: [Name]
Date: [Date]
Priority: [Critical / High / Medium / Low]

Problem: [What problem does this solve?]
Users Affected: [How many users / companies?]
Workaround: [Can they work around it?]
Estimated Effort: [Hours / Days / Weeks]
Dependencies: [What else needs to change?]
Decision: [Approved / Deferred / Rejected]
Reason: [Why?]
```

---

## Definition of Done

### For Features

**A feature is DONE when:**
- ✅ Code is written and committed
- ✅ Unit tests written (if applicable)
- ✅ Tested on desktop (Chrome, Safari)
- ✅ Tested on mobile (iOS, Android)
- ✅ No critical bugs
- ✅ Deployed to staging
- ✅ Reviewed by at least one other person
- ✅ Documentation updated (if needed)
- ✅ Analytics tracking added
- ✅ Deployed to production

### For MVP Launch

**MVP is DONE when:**
- ✅ All Phase 1 features complete
- ✅ 20 companies onboarded
- ✅ 100+ events in calendar
- ✅ Beta tested by 10 users
- ✅ Zero critical bugs
- ✅ Performance targets met
- ✅ Legal docs signed off
- ✅ Monitoring in place
- ✅ Support system ready
- ✅ Marketing site live

---

## Communication Plan

### Weekly Standups (15 minutes)
- What shipped last week?
- What's shipping this week?
- Any blockers?

### Bi-Weekly Reviews (30 minutes)
- Demo completed features
- Review metrics
- Discuss priorities
- Adjust timeline if needed

### Monthly Planning (1 hour)
- Review progress vs goals
- Plan next month
- Budget review
- Risk assessment

### Launch Preparation (Week 7)
- Daily standups
- Bug triage
- Performance testing
- Content review
- Support training

---

## Appendix: Key Decisions

### Technology Stack
- **Frontend:** Next.js 15 + TypeScript
- **Backend:** Supabase (Postgres + Edge Functions)
- **Hosting:** Vercel
- **Email:** Resend
- **Approved:** October 16, 2025

### Pricing Model
- **Companies:** $500-2,000/month or 0.1-0.5% equity
- **Investors Free:** Watchlist (10 companies), daily digest
- **Investors Premium:** $29/month (unlimited watchlist, algorithm)
- **Approved:** October 16, 2025

### Critical Minerals Focus
- **Decision:** Make Critical Minerals a core differentiator
- **Rationale:** Government focus, supply chain security, EV transition
- **Implementation:** Dedicated filters, badges, landing pages
- **Approved:** October 16, 2025

---

**Document Owner:** Project Lead  
**Last Updated:** October 16, 2025  
**Next Review:** November 16, 2025 (Monthly)  

**Sign-off:**
- [ ] Business Lead
- [ ] Technical Lead
- [ ] Legal Review (if required)