# CapSight Analytics - Wireframes & Design System

## Brand Colors (from logo)
- **Primary Navy**: `#2C3E50` (logo blue)
- **Accent**: `#3498DB` (lighter blue for CTAs)
- **Success**: `#27AE60` (positive metrics)
- **Warning**: `#F39C12` (caution)
- **Danger**: `#E74C3C` (negative metrics)
- **Neutral**: `#ECF0F1` (backgrounds)
- **Text Primary**: `#2C3E50`
- **Text Secondary**: `#7F8C8D`

## Typography
- **Headings**: Inter (600-700 weight)
- **Body**: Inter (400-500 weight)
- **Mono**: JetBrains Mono (for numbers/dates)

---

## Shared Components Library

### 1. Navigation Header
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] CapSight Analytics                                   │
│                                                               │
│         Calendar  Companies  Insights  Alerts     [Search]   │
│                                                    [Avatar]  │
└─────────────────────────────────────────────────────────────┘
```

**Mantine Components:**
- `Header` with `Container`
- `Group` for horizontal layout
- `Text` with gradient for logo text
- `NavLink` for navigation items
- `Spotlight` for search
- `Avatar` with `Menu` for user dropdown

**Animations:**
- Sticky header with shadow on scroll
- Underline animation on hover (slide left-to-right)
- Search icon → full search bar transition

---

### 2. Stat Card Component
```
┌──────────────────────────────┐
│ 📈 Upcoming Events           │
│                              │
│    47                        │
│    Next 7 Days               │
│                              │
│    ↑ 12% from last week      │
└──────────────────────────────┘
```

**Mantine Components:**
- `Card` with hover effect
- `Text` for title
- `Title` order 2 for number
- `Badge` for percentage change
- `Group` for layout

**Animations:**
- Number count-up on viewport entry
- Subtle lift on hover (4px translate + shadow)
- Sparkline micro-chart option

---

### 3. Company Card
```
┌────────────────────────────────────────┐
│ [Logo] Company Name           ⭐ 4.2   │
│ ASX:CODE | Mining | $450M              │
│                                        │
│ Next Event: AGM - Dec 15, 2025        │
│                                        │
│ ━━━━━━━━━━━━━━━━░░░░  75% tracked    │
│                                        │
│ [View Calendar] [Full Profile]        │
└────────────────────────────────────────┘
```

**Mantine Components:**
- `Card` with `Card.Section` for segments
- `Group` for header layout
- `Badge` for sector/market cap
- `Progress` for tracking percentage
- `Button` variants (subtle, filled)
- `Avatar` for company logo

**Animations:**
- Progress bar fill on viewport entry
- Card border glow on hover
- CTA buttons pulse subtly

---

### 4. Event Timeline Item
```
┌────────────────────────────────────────────────────┐
│ ● Dec 15, 2025                                     │
│ │                                                   │
│ │ Annual General Meeting                           │
│ │ Company Name (ASX:CODE)                         │
│ │ 10:00 AM AEDT | Melbourne Convention Centre     │
│ │                                                   │
│ │ [Add to Calendar] [View Details] [Set Reminder] │
│ │                                                   │
└────────────────────────────────────────────────────┘
```

**Mantine Components:**
- `Timeline` component
- `Timeline.Item` with custom dot
- `Text` variants for hierarchy
- `Group` for action buttons
- `Anchor` for location

**Animations:**
- Timeline line draws on scroll
- Dot pulse for upcoming events
- Slide-in from left on scroll

---

### 5. Filter Panel
```
┌──────────────────────────┐
│ Filters                  │
│                          │
│ Date Range               │
│ [○○○○○○○] Next 7 Days   │
│                          │
│ Event Type               │
│ □ AGM                    │
│ □ Results Release        │
│ □ Capital Raising        │
│ □ Investor Briefing      │
│                          │
│ Sector                   │
│ [Dropdown ▼]            │
│                          │
│ Market Cap               │
│ [Range Slider]          │
│                          │
│ [Apply] [Reset]         │
└──────────────────────────┘
```

**Mantine Components:**
- `Paper` or `Card` for container
- `SegmentedControl` for date presets
- `Checkbox.Group` for event types
- `Select` for sector
- `RangeSlider` for market cap
- `Button.Group` for actions

**Animations:**
- Smooth slide-down on open
- Filter count badge pulse when active
- Checkbox check animation

---

### 6. Data Table
```
┌────────────────────────────────────────────────────────────────┐
│ Company         │ Event          │ Date       │ Market Cap     │
├────────────────────────────────────────────────────────────────┤
│ [Logo] ABC Ltd  │ AGM            │ Dec 15     │ $450M ↑ 2.3%  │
│ ASX:ABC         │                │            │ ━━━━━━━━━░    │
│                 │                │            │               │
│ [Logo] XYZ Corp │ Results        │ Dec 18     │ $1.2B ↓ 1.1%  │
│ ASX:XYZ         │                │            │ ━━━━━━━━━░    │
└────────────────────────────────────────────────────────────────┘
```

**Mantine Components:**
- `Table` with sticky header
- `Table.Thead`, `Table.Tbody`, `Table.Tr`, `Table.Td`
- `Group` for inline elements
- `Badge` for change indicators
- `Progress` inline bar
- `Pagination` at bottom

**Animations:**
- Row hover highlight (subtle bg change)
- Sparkline charts on hover
- Sort arrow rotation
- Skeleton loading for data fetch

---

### 7. Search/Spotlight
```
┌──────────────────────────────────────┐
│ 🔍 Search companies, events...       │
└──────────────────────────────────────┘
        ↓ (when active)
┌──────────────────────────────────────┐
│ 🔍 bhp                               │
├──────────────────────────────────────┤
│ Companies                            │
│ [Logo] BHP Group Limited             │
│ ASX:BHP | Mining | $180B             │
│                                      │
│ Upcoming Events                      │
│ AGM - BHP Group - Dec 15            │
│ Results - BHP Group - Jan 20        │
└──────────────────────────────────────┘
```

**Mantine Components:**
- `Spotlight` component (Cmd+K)
- `Text` for search input
- `Stack` for results groups
- `UnstyledButton` for result items
- `Divider` between sections

**Animations:**
- Fade-in backdrop blur
- Slide-down search panel
- Staggered result appearance
- Highlight on keyboard navigation

---

### 8. Alert/Notification Badge
```
┌──────────────────────────────┐
│ 🔔 3                         │
│    ↓                         │
│    New Results Release       │
│    BHP Group - Tomorrow      │
│    ─────────────────         │
│    AGM Reminder              │
│    ABC Ltd - In 2 hours      │
│    ─────────────────         │
│    Price Alert               │
│    XYZ Corp +5%              │
└──────────────────────────────┘
```

**Mantine Components:**
- `Indicator` for badge count
- `Menu` for dropdown
- `Notification` style items
- `Divider` between items
- `ScrollArea` if many items

**Animations:**
- Badge pulse for new items
- Smooth dropdown expand
- Slide-in new notifications
- Mark as read fade-out

---

## Page Layouts

---

## 1. Landing Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      [Navigation Header]                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                        HERO SECTION                              │
│                                                                   │
│          Track Every ASX Corporate Event                         │
│          That Matters                                            │
│                                                                   │
│          Never miss critical investor events, AGMs,              │
│          results releases, and capital raisings.                 │
│                                                                   │
│          [Start Free Trial] [View Demo]                         │
│                                                                   │
│          [Animated Chart Visualization - subtle movement]        │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                     STATS SECTION                                │
│                                                                   │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│   │ 2,500+      │  │ 15,000+     │  │ 99.9%       │           │
│   │ Companies   │  │ Events      │  │ Accuracy    │           │
│   │ Tracked     │  │ Annually    │  │ Rate        │           │
│   └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                    FEATURES SECTION                              │
│                                                                   │
│   Comprehensive Event Coverage                                   │
│   ┌───────────────────────────────────────────────┐             │
│   │  📅 AGMs & EGMs                               │             │
│   │  📊 Results Releases (Half Year, Full Year)   │             │
│   │  💰 Capital Raisings & Placements             │             │
│   │  🎤 Investor Briefings & Roadshows            │             │
│   │  📢 Market Announcements                      │             │
│   └───────────────────────────────────────────────┘             │
│                                                                   │
│   Advanced Filtering & Search                                    │
│   [Screenshot/Demo of Calendar Interface]                        │
│                                                                   │
│   Custom Alerts & Notifications                                  │
│   [Screenshot/Demo of Alert System]                              │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                   TESTIMONIALS (Optional)                        │
│                                                                   │
│   "CapSight saves me hours every week..."                       │
│   - Fund Manager, Sydney                                        │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                     CTA SECTION                                  │
│                                                                   │
│          Start Tracking Events Today                            │
│          [Start Free Trial]                                     │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                       [Footer]                                   │
│   About | Contact | Terms | Privacy | API                       │
│   © 2025 CapSight Analytics                                     │
└─────────────────────────────────────────────────────────────────┘
```

**Mantine Components:**
- `Container` with size="lg" for content width
- `Stack` for vertical sections
- `Title` order 1 for hero headline
- `Text` size="xl" for subheading
- `Button.Group` for CTAs
- `SimpleGrid` cols={3} for stats
- `Grid` for features layout
- `Card` for feature items
- `Image` for screenshots

**Animations:**
- Hero text fade-in + slide up
- Stat numbers count-up on scroll
- Feature cards stagger on scroll
- Subtle parallax on hero image
- CTA button hover lift

---

## 2. Calendar Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      [Navigation Header]                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Calendar                                              [⚙️ View] │
│  ───────                                                         │
│                                                                   │
│  [Filters Panel - Left Side]          [Calendar View - Right]   │
│                                                                   │
│  ┌──────────────────────┐             ┌─────────────────────┐  │
│  │ Date Range           │             │  December 2025      │  │
│  │ ○ Next 7 Days       │             │  ← Today   Month → │  │
│  │ ○ Next 30 Days      │             │                     │  │
│  │ ○ Custom            │             │ S M T W T F S       │  │
│  │                     │             │ 1 2 3 4 5 6 7       │  │
│  │ Event Type          │             │ 8 9 •• •• •• 13 14  │  │
│  │ ☑ AGM (24)          │             │ ●● 16 17 18 19 20  │  │
│  │ ☑ Results (18)      │             │ 21 22 23 24 25 26  │  │
│  │ □ Capital (8)       │             │ 27 28 29 30 31     │  │
│  │ ☑ Briefing (12)     │             └─────────────────────┘  │
│  │                     │                                        │
│  │ Sector              │             TODAY'S EVENTS (8)         │
│  │ [All Sectors ▼]    │             ─────────────────         │
│  │                     │                                        │
│  │ Market Cap          │             ┌─ Timeline View ─────┐  │
│  │ [═══●═══════]       │             │                      │  │
│  │ $10M - $10B         │             │ ● 09:00 AM          │  │
│  │                     │             │ │ AGM - ABC Ltd     │  │
│  │ Following Only      │             │ │ ASX:ABC           │  │
│  │ □ Show only my      │             │ │ Melbourne         │  │
│  │   followed          │             │ │ [Details] [→]     │  │
│  │   companies         │             │ │                   │  │
│  │                     │             │ ● 11:00 AM          │  │
│  │ [Apply Filters]     │             │ │ Results - XYZ     │  │
│  │ [Reset]             │             │ │ ASX:XYZ           │  │
│  └──────────────────────┘             │ │ Webcast           │  │
│                                        │ │ [Details] [→]     │  │
│                                        │ │                   │  │
│                                        │ ● 02:00 PM          │  │
│                                        │   ...               │  │
│                                        └─────────────────────┘  │
│                                                                   │
│  UPCOMING EVENTS                                                 │
│  ────────────────                                                │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Dec 16, 2025                                           │    │
│  │ ────────────────────────────────────────────────────── │    │
│  │ [Logo] BHP Group Limited           AGM                 │    │
│  │ ASX:BHP | Mining | $180B           10:00 AM AEDT      │    │
│  │ [⭐ Following] [📅] [🔔] [View Details]                │    │
│  │                                                         │    │
│  │ [Logo] Woodside Energy              Results Release     │    │
│  │ ASX:WDS | Energy | $45B            Pre-Market          │    │
│  │ [⭐ Follow] [📅] [🔔] [View Details]                   │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ Dec 17, 2025                                           │    │
│  │ ────────────────────────────────────────────────────── │    │
│  │ ...more events...                                       │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│                        [Load More]                               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Two-column layout: 25% filters | 75% content
- `Grid` with `Grid.Col` span={3} and span={9}
- Filters sticky on scroll
- Calendar + Timeline view toggle

**Mantine Components:**
- `Grid` for layout
- `Paper` for filter panel
- `SegmentedControl` for date presets
- `Checkbox.Group` for event types
- `Select` for sector
- `RangeSlider` for market cap
- `Switch` for following only
- `DatePicker` or `Calendar` component
- `Timeline` for event list
- `Card` for event items
- `Badge` for event counts
- `ActionIcon` for quick actions

**Animations:**
- Calendar dots grow on hover (show event count)
- Timeline slide-in on scroll
- Event cards slide-up on hover
- Filter badge count pulse when changed
- Smooth date transitions
- Event card expand for details

**View Options:**
- Calendar + List (default)
- List only (full width)
- Calendar only
- Timeline view

---

## 3. Company Profile Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      [Navigation Header]                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ← Back to Companies                                             │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ [Logo] BHP Group Limited                     ⭐ Following   │ │
│  │ ASX:BHP                                      [Unfollow]     │ │
│  │                                                              │ │
│  │ Mining | Melbourne, Australia | www.bhp.com                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ Market Cap  │  │ Next Event  │  │ Events/Year │            │
│  │ $180B       │  │ AGM         │  │ 24          │            │
│  │ ↑ 2.3%      │  │ Dec 16      │  │ ━━━━━━━░    │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                   │
│  [Overview] [Events] [Documents] [Analytics]                    │
│  ═══════════════════════════════════════════════                │
│                                                                   │
│  OVERVIEW                                                        │
│  ────────                                                        │
│                                                                   │
│  About                                                           │
│  BHP is a world-leading resources company, extracting and       │
│  processing minerals, oil and gas with operations in Australia  │
│  and worldwide. Our products are sold globally...               │
│                                                                   │
│  Key Information                                                 │
│  ┌──────────────────────────────────────────────┐              │
│  │ ASX Code:        BHP                         │              │
│  │ GICS Sector:     Materials                   │              │
│  │ Industry:        Metals & Mining             │              │
│  │ Founded:         1885                        │              │
│  │ Employees:       ~80,000                     │              │
│  │ Website:         bhp.com                     │              │
│  └──────────────────────────────────────────────┘              │
│                                                                   │
│  UPCOMING EVENTS                                                 │
│  ────────────────                                                │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ ● Dec 16, 2025 | 10:00 AM AEDT                        │    │
│  │ │ Annual General Meeting                              │    │
│  │ │ Melbourne Convention Centre                         │    │
│  │ │ Expected attendees: 500+                            │    │
│  │ │                                                      │    │
│  │ │ Key Topics:                                         │    │
│  │ │ • Board elections                                   │    │
│  │ │ • Climate strategy update                           │    │
│  │ │ • Remuneration report                               │    │
│  │ │                                                      │    │
│  │ │ [Add to Calendar] [Set Reminder] [View Details]    │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ ● Jan 20, 2026 | Pre-Market                           │    │
│  │ │ Half Year Results Release                           │    │
│  │ │ Webcast + Q&A                                       │    │
│  │ │ ...                                                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  EVENT HISTORY                                                   │
│  ─────────────                                                   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 2024                                          [View All] │  │
│  │                                                           │  │
│  │ [Chart showing events over time - sparkline style]       │  │
│  │                                                           │  │
│  │ • AGM - Nov 14, 2024                                     │  │
│  │ • FY Results - Aug 27, 2024                              │  │
│  │ • HY Results - Feb 20, 2024                              │  │
│  │ ...                                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Hero section with company header
- Stats bar with key metrics
- Tabbed navigation for content sections
- Two-column layout: 70% main | 30% sidebar

**Mantine Components:**
- `Breadcrumbs` for navigation
- `Group` for company header
- `Avatar` size="xl" for logo
- `Badge` for status/following
- `Button` for follow/unfollow
- `SimpleGrid` for stat cards
- `Tabs` for content sections
- `Text` for description
- `Table` for key info
- `Timeline` for events
- `Card` for event details
- `LineChart` or `AreaChart` for history

**Animations:**
- Logo fade-in
- Stats count-up
- Tab underline slide
- Event timeline draw-in
- Hover expansion on event cards
- Chart line draw animation

**Tabs:**
1. **Overview** - About, key info, upcoming events
2. **Events** - Full event calendar for this company
3. **Documents** - AGM materials, presentations, reports
4. **Analytics** - Event attendance trends, announcement analysis

---

## 4. Companies Directory Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      [Navigation Header]                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Companies                                    [⚙️ View] [⬇️ CSV] │
│  ──────────                                                      │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 🔍 Search companies...                                 │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
│  [Filters]                                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Sector: [All ▼] Market Cap: [All ▼] Following: [All ▼]  │  │
│  │                                                           │  │
│  │ 2,487 companies | 128 following                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  FEATURED / MOST ACTIVE                                         │
│  ────────────────────                                           │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ [Logo] BHP  │  │ [Logo] CBA  │  │ [Logo] RIO  │            │
│  │ ASX:BHP     │  │ ASX:CBA     │  │ ASX:RIO     │            │
│  │ $180B       │  │ $165B       │  │ $150B       │            │
│  │ 8 events    │  │ 6 events    │  │ 7 events    │            │
│  │ [⭐ Follow] │  │ [⭐ Follow] │  │ [⭐ Follow] │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                   │
│  ALL COMPANIES                                                   │
│  ──────────────                                                  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Company ↕ | Sector ↕ | Market Cap ↕ | Events ↕ | Actions  │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │ [Logo] BHP Group                                           │ │
│  │ ASX:BHP                                                    │ │
│  │ Mining | $180B | 8 upcoming | [⭐ Following] [View]       │ │
│  │                                                             │ │
│  │ [Logo] Commonwealth Bank                                   │ │
│  │ ASX:CBA                                                    │ │
│  │ Financials | $165B | 6 upcoming | [⭐ Follow] [View]      │ │
│  │                                                             │ │
│  │ [Logo] Rio Tinto                                           │ │
│  │ ASX:RIO                                                    │ │
│  │ Mining | $150B | 7 upcoming | [⭐ Follow] [View]          │ │
│  │                                                             │ │
│  │ ...more companies...                                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│                    [Page 1 of 124] [→]                          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Search bar prominent at top
- Filter chips below search
- Featured carousel (optional)
- Sortable data table
- Pagination at bottom

**Mantine Components:**
- `TextInput` with icon for search
- `Group` for filter chips
- `Select` dropdowns for filters
- `Carousel` for featured (optional)
- `Card` for featured items
- `Table` with sort for all companies
- `Avatar` for company logos
- `Badge` for status
- `Button` for actions
- `Pagination`

**Animations:**
- Search results slide-in
- Table row highlight on hover
- Sort arrow rotation
- Featured cards auto-slide
- Follow button state change
- Skeleton loading for data

**View Options:**
- Table view (default)
- Grid view (cards)
- Compact list view

---

## 5. Insights/Analytics Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      [Navigation Header]                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Insights                                                        │
│  ────────                                                        │
│                                                                   │
│  MARKET OVERVIEW                                                 │
│  ────────────────                                                │
│                                                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │ This Week   │  │ Next Week   │  │ This Month  │            │
│  │ 47 Events   │  │ 52 Events   │  │ 203 Events  │            │
│  │ ↑ 12%       │  │ ↓ 3%        │  │ ↑ 8%        │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│                                                                   │
│  EVENT DISTRIBUTION BY TYPE                                      │
│  ────────────────────────────────                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  [Donut Chart]                                           │  │
│  │                                                           │  │
│  │  AGM: 35%                                                │  │
│  │  Results: 30%                                            │  │
│  │  Briefings: 20%                                          │  │
│  │  Capital: 15%                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  EVENTS CALENDAR HEATMAP                                         │
│  ────────────────────────                                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │       S  M  T  W  T  F  S                                │  │
│  │ Dec   ░  ░  ██ ░  ░  ██ ░   (color intensity = count)   │  │
│  │ Jan   ░  ██ ░  ░  ██ ░  ░                               │  │
│  │ Feb   ██ ░  ░  ░  ░  ██ ░                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  SECTOR BREAKDOWN                                                │
│  ─────────────────                                               │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Mining        ━━━━━━━━━━░░░░░░░░░░  45 events (22%)    │  │
│  │ Financials    ━━━━━━━░░░░░░░░░░░░░  32 events (16%)    │  │
│  │ Healthcare    ━━━━━░░░░░░░░░░░░░░░  24 events (12%)    │  │
│  │ Technology    ━━━░░░░░░░░░░░░░░░░░  18 events (9%)     │  │
│  │ ...                                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  TOP EVENTS THIS WEEK                                            │
│  ─────────────────────                                           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │ 1. BHP Group - Annual General Meeting                  │    │
│  │    Dec 16 | Expected attendees: 500+ | [View]         │    │
│  │                                                         │    │
│  │ 2. Commonwealth Bank - Results Release                 │    │
│  │    Dec 17 | Analyst consensus: Beat | [View]          │    │
│  │                                                         │    │
│  │ 3. ...                                                  │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Layout:**
- Dashboard-style with multiple chart widgets
- Two/three column grid for charts
- Cards for each insight section

**Mantine Components:**
- `SimpleGrid` for layout
- `Card` for each section
- `RingProgress` or `DonutChart` for distribution
- `HeatMap` (custom or library)
- `Progress` for sector breakdown
- `List` for top events
- `BarChart`, `LineChart`, `AreaChart` from Mantine Charts

**Animations:**
- Stats count-up on load
- Chart draw-in animations
- Heatmap cells fade-in
- Progress bars fill
- Hover tooltips on charts

---

## 6. Settings/Profile Page

```
┌─────────────────────────────────────────────────────────────────┐
│                      [Navigation Header]                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Settings                                                        │
│  ────────                                                        │
│                                                                   │
│  [Profile] [Notifications] [Preferences] [Billing] [API]        │
│  ═══════════════════════════════════════════════                │
│                                                                   │
│  PROFILE                                                         │
│  ───────                                                         │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [Avatar]                                                  │  │
│  │                                                           │  │
│  │ Name                                                      │  │
│  │ [John Smith...........................]                   │  │
│  │                                                           │  │
│  │ Email                                                     │  │
│  │ [john@example.com...................]                    │  │
│  │                                                           │  │
│  │ Company (Optional)                                        │  │
│  │ [ABC Investments...................]                     │  │
│  │                                                           │  │
│  │ [Update Profile]                                         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│  NOTIFICATION PREFERENCES                                        │
│  ────────────────────────                                        │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Email Notifications                                       │  │
│  │ ☑ Event reminders                                        │  │
│  │ ☑ Daily digest                                           │  │
│  │ ☑ Weekly summary                                         │  │
│  │ □ Marketing emails                                       │  │
│  │                                                           │  │
│  │ Reminder Timing                                           │  │
│  │ [1 day before ▼]                                         │  │
│  │                                                           │  │
│  │ Push Notifications (Mobile)                               │  │
│  │ ☑ Event starting soon                                    │  │
│  │ ☑ New events from followed companies                    │  │
│  │                                                           │  │
│  │ [Save Preferences]                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

**Mantine Components:**
- `Tabs` for settings sections
- `Card` for form sections
- `Avatar` with upload
- `TextInput` for fields
- `Checkbox` for preferences
- `Select` for dropdowns
- `Switch` for toggles
- `Button` for save actions

**Animations:**
- Tab slide transition
- Form field focus highlight
- Save success checkmark
- Avatar upload preview

---

## Additional Shared Components

### 9. Empty State
```
┌──────────────────────────────┐
│                              │
│      [Icon/Illustration]     │
│                              │
│   No events found            │
│   Try adjusting your filters │
│                              │
│   [Clear Filters]            │
│                              │
└──────────────────────────────┘
```

### 10. Loading Skeletons
```
┌──────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░          │
│ ░░░░░░░░░░░░                │
│                              │
│ ░░░░░░░░░░░░░░░░░░          │
│ ░░░░░░░░░░░░                │
└──────────────────────────────┘
```

### 11. Modal/Drawer for Event Details
```
┌──────────────────────────────────────┐
│ Event Details                    [×] │
├──────────────────────────────────────┤
│                                      │
│ [Logo] BHP Group Limited             │
│ Annual General Meeting               │
│                                      │
│ 📅 December 16, 2025                │
│ 🕐 10:00 AM - 12:00 PM AEDT         │
│ 📍 Melbourne Convention Centre       │
│                                      │
│ Description                          │
│ The 2025 AGM will cover...         │
│                                      │
│ Agenda                               │
│ • Board elections                   │
│ • Financial results                 │
│ • Q&A session                       │
│                                      │
│ [Add to Calendar] [Set Reminder]    │
│ [View Company Profile]              │
│                                      │
└──────────────────────────────────────┘
```

---

## Animation Principles

1. **Subtle & Professional** - Never distracting
2. **Performance** - Use CSS transforms, not properties that trigger reflow
3. **Purpose** - Every animation guides attention or provides feedback
4. **Consistency** - Same easing and duration across similar elements

**Standard Timings:**
- Micro-interactions: 150ms
- Component transitions: 250ms
- Page transitions: 300ms
- Data loading: Skeleton → fade-in (400ms)

**Easing:**
- Default: `cubic-bezier(0.4, 0.0, 0.2, 1)`
- Bounce: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

---

## Responsive Breakpoints (Mantine)

- `xs`: 0-575px (mobile)
- `sm`: 576-767px (mobile landscape)
- `md`: 768-991px (tablet)
- `lg`: 992-1199px (desktop)
- `xl`: 1200px+ (large desktop)

**Mobile Considerations:**
- Hamburger menu for navigation
- Bottom navigation bar (optional)
- Swipe gestures for calendar
- Pull-to-refresh for lists
- Simplified filter drawer (slide from bottom)

---

## Key Design Decisions

1. **Navy as primary** - Trust, professionalism, finance
2. **White/light backgrounds** - Clean, readable, data-forward
3. **Generous whitespace** - Let content breathe
4. **Typography hierarchy** - Clear headers, readable body text
5. **Data visualization** - Charts and progress bars for quick insights
6. **Microinteractions** - Feedback on all user actions
7. **Consistent card style** - All content in cards with subtle shadows
8. **Icon system** - Lucide or Tabler icons (Mantine default)

---

## Technical Stack Summary

**Framework:** Next.js 14+ (App Router)
**UI Library:** Mantine v7
**Styling:** CSS Modules / Tailwind (optional)
**Charts:** Mantine Charts (@mantine/charts) - built on Recharts
**Animations:** Framer Motion (optional) or CSS
**Icons:** Tabler Icons (@tabler/icons-react)
**Calendar:** Mantine DatePicker or custom with date-fns
**State:** React Query for data, Zustand for UI state
**Forms:** Mantine Form (@mantine/form)

---

## Next Steps

1. Create Figma mockups from these wireframes
2. Build design system in Storybook
3. Implement shared components first
4. Build pages iteratively
5. Add animations after core functionality
6. Test responsiveness across devices
7. Performance optimization (lazy loading, code splitting)
8. Accessibility audit (WCAG 2.1 AA compliance)

---

*These wireframes prioritize clarity and professionalism while allowing for personality through subtle animations and data visualization. The design should feel modern but not trendy, ensuring longevity.*