# RAILGUARD --- Neumorphic Light UI Design Specification

## 1. Design Direction

Transform the current **dark RAILGUARD control-room dashboard** into a
**bright, soft neumorphic intelligence dashboard** inspired by the
provided light reference.

The goal is **not to redesign the information architecture**. Keep the
existing RAILGUARD features, data, navigation, maps, alerts,
predictions, operations and reports intact while changing the visual
language from:

> Dark + neon + high-contrast control-room UI

to:

> Light + soft + tactile + trustworthy railway intelligence UI

The resulting interface should feel like a professional railway
operations product rather than a generic dashboard template.

### Core visual keywords

-   Light neumorphism
-   Soft depth
-   Off-white surfaces
-   Subtle raised cards
-   Gentle inset controls
-   Navy typography
-   Railway green as the primary semantic/action color
-   Restrained orange/red for risk
-   Large whitespace
-   Rounded but structured cards
-   Calm, operational, trustworthy
-   Data-dense without looking visually heavy

------------------------------------------------------------------------

## 2. Design Principles

### 2.1 Soft surface, not flat white

Use a very light warm/cool gray base instead of pure white.

Recommended page background:

``` text
#EEF1F4
```

Primary surface:

``` text
#F4F6F8
```

Elevated surface:

``` text
#F7F9FA
```

Avoid pure `#FFFFFF` for large cards unless used for a small internal
control.

### 2.2 Neumorphism with restraint

Every major card should feel slightly raised from the page.

Use two opposing shadows:

``` css
box-shadow:
  8px 8px 18px rgba(163, 174, 184, 0.28),
  -8px -8px 18px rgba(255, 255, 255, 0.90);
```

Do not make shadows too dark. The interface should look soft, not
embossed or blurry.

For smaller elements:

``` css
box-shadow:
  4px 4px 10px rgba(163, 174, 184, 0.22),
  -4px -4px 10px rgba(255, 255, 255, 0.85);
```

### 2.3 Use inset neumorphism for controls

Search boxes, segmented controls, filters, dropdowns and compact inputs
should appear slightly pressed into the surface.

``` css
box-shadow:
  inset 3px 3px 7px rgba(163, 174, 184, 0.20),
  inset -3px -3px 7px rgba(255, 255, 255, 0.85);
```

### 2.4 Color carries meaning

Do not use neon cyan as the dominant accent anymore.

Semantic colors:

  Meaning                   Color
  ------------------------- -----------
  Primary / railway green   `#0B8F68`
  Primary light             `#DDF3EB`
  Normal                    `#159A68`
  Watch                     `#F2A11B`
  High Risk                 `#F47A20`
  Severe                    `#D92D20`
  Informational blue        `#2878C8`
  Navy text                 `#10243E`
  Secondary text            `#5D6B7A`
  Muted text                `#7C8895`
  Divider                   `#DDE3E8`

Risk colors should be used only where risk information is being
communicated.

------------------------------------------------------------------------

# 3. Global Design Tokens

## 3.1 Typography

Preferred font:

``` text
Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Alternative:

``` text
Manrope
```

Typography hierarchy:

``` text
Page title:       24–28px / 700
Section title:    15–17px / 700
Card title:       13–15px / 700
Primary metric:   26–34px / 700
Secondary metric: 16–20px / 700
Body:             12–14px / 400–500
Caption:          10–12px / 500
Navigation:       13–14px / 600
```

Use dark navy rather than black:

``` css
color: #10243E;
```

Secondary text:

``` css
color: #5D6B7A;
```

Never use the current dark-theme white text as the default light-theme
text.

------------------------------------------------------------------------

## 3.2 Radius

Use consistent rounded geometry:

``` text
Large cards:       18–22px
Medium cards:      14–18px
Small controls:    10–14px
Pills / status:    999px
```

The reference uses generous rounding, but avoid excessive pill-shaped
containers for everything.

------------------------------------------------------------------------

## 3.3 Spacing

Use an 8px spacing system:

``` text
4px   micro
8px   compact
12px  small
16px  default
20px  card
24px  section
32px  major section
```

The dashboard should have visible breathing room between major cards.

------------------------------------------------------------------------

# 4. Page Background

The entire application should sit on a soft light-gray canvas.

``` css
body {
  background: #EEF1F4;
  color: #10243E;
}
```

Do not use:

-   dark navy page backgrounds
-   black panels
-   neon borders
-   glowing cyan effects
-   strong gradients

The map may retain its own geographic visual styling, but its
surrounding UI must follow the light neumorphic system.

------------------------------------------------------------------------

# 5. Header / Top Navigation

Transform the current dark header into a clean light navigation bar.

## Structure

Left:

-   RAILGUARD logo
-   Railway icon
-   "ETA & DISASTER INTELLIGENCE SYSTEM"

Center:

-   Overview / Dashboard
-   Network / Live Trains
-   Predictions
-   Disasters
-   Operations
-   Reports
-   PNR Predictor if retained

Right:

-   Alert count
-   Current time
-   Date
-   User / control-room status
-   Logout/profile action

## Styling

Header should appear as a raised horizontal neumorphic surface:

``` css
background: #F4F6F8;
border-radius: 20px;
box-shadow:
  8px 8px 18px rgba(163,174,184,.25),
  -8px -8px 18px rgba(255,255,255,.9);
```

Avoid a full-width dark strip.

## Active navigation

Active navigation item:

``` text
Background: #E1F3EC
Text:       #0B8F68
Indicator:  #0B8F68
```

Use a subtle inset or raised effect.

Example:

``` css
.nav-active {
  color: #0B8F68;
  background: #E1F3EC;
  border-radius: 12px;
  box-shadow:
    inset 2px 2px 5px rgba(163,174,184,.15),
    inset -2px -2px 5px rgba(255,255,255,.75);
}
```

------------------------------------------------------------------------

# 6. Overall Dashboard Layout

Use a three-column operational dashboard.

``` text
┌─────────────────────────────────────────────────────────────┐
│                     TOP NAVIGATION                          │
├──────────────┬───────────────────────────────┬──────────────┤
│              │                               │              │
│ LIVE TRAINS  │ NETWORK / ROUTE MAP           │ ROUTE RISK   │
│              │                               │              │
│              │                               │ ALERTS       │
│              ├───────────────────────────────┤              │
│              │ SELECTED TRAIN / ETA           │ PASSENGER    │
│              │                               │ IMPACT       │
│              ├───────────────────────────────┤              │
│              │ DOWNSTREAM IMPACT / OPERATIONS │              │
│              │                               │              │
└──────────────┴───────────────────────────────┴──────────────┘
```

Recommended desktop proportions:

``` text
Left sidebar:      21–23%
Center workspace:  51–55%
Right sidebar:     23–26%
```

Do not allow the sidebars to become excessively narrow.

------------------------------------------------------------------------

# 7. Live Trains Panel

The current `LIVE TRAINS` panel should become a light neumorphic raised
card.

## Card

``` css
background: #F4F6F8;
border-radius: 20px;
padding: 16px;
box-shadow:
  8px 8px 18px rgba(163,174,184,.25),
  -8px -8px 18px rgba(255,255,255,.9);
```

## Train item

Each train should be an individual soft card.

Example:

``` text
🚆 12345                       ON TIME
NDLS → GHY
Loco: HWH WAP-7
Delay +20 min
```

Selected train:

``` text
background: #E8F6F1;
border: 1px solid rgba(11,143,104,.25);
color: #10243E;
```

High-risk train:

Use a subtle left risk rail rather than a full red card.

``` text
3–4px left border: #D92D20
```

This preserves hierarchy while keeping the dashboard calm.

------------------------------------------------------------------------

# 8. Search Field

Use a recessed neumorphic search field.

``` css
background: #EEF1F4;
border: none;
border-radius: 12px;
box-shadow:
  inset 3px 3px 7px rgba(163,174,184,.20),
  inset -3px -3px 7px rgba(255,255,255,.85);
```

Placeholder:

``` text
Search Train / No.
```

Search icon should use muted navy/gray.

On focus:

``` text
Border/accent: #0B8F68
```

Do not use a glowing cyan focus ring.

------------------------------------------------------------------------

# 9. Network / Hazard Map

This remains the visual centerpiece.

## Card

Use a large raised card:

``` text
NETWORK OVERVIEW
```

Top row:

-   section title
-   normal/watch/high-risk/severe legend
-   network selector

Map controls:

-   Zoom +
-   Zoom --
-   Full screen

## Map treatment

The geographic map should be lighter than the current dark version.

Recommended:

``` text
Map base: soft grayscale / pale map
Rail lines: semantic status colors
Station markers: white/soft raised chips
Selected train: green highlight
High-risk route: orange
Severe-risk route: red
```

Avoid neon cyan route lines.

### Route colors

``` text
Normal:      #159A68
Watch:       #F2A11B
High Risk:   #F47A20
Severe:      #D92D20
Information: #2878C8
```

Station labels should look like small raised neumorphic tags rather than
glowing outlined boxes.

Example:

``` css
.station-chip {
  background: #F4F6F8;
  border-radius: 10px;
  box-shadow:
    4px 4px 8px rgba(163,174,184,.25),
    -4px -4px 8px rgba(255,255,255,.85);
}
```

------------------------------------------------------------------------

# 10. Route Risk Overview

The right-side risk card should visually match the reference.

## Overall risk ring

Large circular indicator:

``` text
82%
OVERALL RISK
SEVERE
```

Use:

-   red/orange progress arc
-   light gray inactive track
-   dark navy label
-   red severe status

Do not glow.

## Hazard breakdown

Rows:

``` text
Flood             82%
Weather / Rain    38%
Cyclone           23%
Landslide         12%
```

Each row should contain:

-   small icon
-   hazard name
-   percentage
-   semantic color

Use subtle separators, not thick borders.

------------------------------------------------------------------------

# 11. Disaster Monitor / Active Alerts

Transform the current dark alert cards into soft light cards.

Each alert card:

``` text
[hazard icon] Severe Flood Warning
              Ganga Basin (Prayagraj – Varanasi)
              Valid till 12:30 PM, 24 May
                                               >
```

Risk treatment:

### Severe

``` text
background: #FFF4F3
left accent: #D92D20
```

### Watch

``` text
background: #FFF9EC
left accent: #F2A11B
```

### Informational

``` text
background: #F0F6FC
left accent: #2878C8
```

Avoid fully saturated colored backgrounds.

------------------------------------------------------------------------

# 12. Selected Train / Dynamic ETA Intelligence

This is the main intelligence card below the map.

Structure:

``` text
TRAIN 12345 — DYNAMIC ETA INTELLIGENCE        ● LIVE

NDLS → GHY

Scheduled           ETA (Predicted)          Confidence
8:30 PM             8:50 PM                 87%
                    +20 min                  HIGH
```

Use the predicted ETA as the dominant metric.

``` text
ETA: 8:50 PM
```

Primary ETA color:

``` text
#0B8F68
```

The confidence indicator should be a soft circular progress ring.

------------------------------------------------------------------------

# 13. Why Is ETA Changing?

Keep the causal explanation from the current dashboard.

Example:

``` text
Previous Delay                 +8 min
Flood Speed Restriction        +7 min
Longer Station Dwell           +5 min
Route Speed Deviation          +4 min
Signal Hold / Queue            +3 min
--------------------------------------
Total Impact                   +20 min
```

Use:

-   navy labels
-   red/orange impact values
-   thin separators
-   generous vertical spacing

This panel should feel analytical, not alarming.

------------------------------------------------------------------------

# 14. Train Metrics Strip

Below the ETA card, use a horizontal metric strip:

``` text
Next Station       Distance to Next       ETA at Next
Prayagraj Jn.      74 km                   8:57 PM

Arrival Range
8:45 PM – 9:08 PM
```

Each metric should be visually separated without heavy borders.

Use small icons with the primary green color.

------------------------------------------------------------------------

# 15. Downstream Impact

Keep the causal chain from the current design.

``` text
12345
+20 min
Current Delay

        →

12582
+14 min
Signal Queue

        →

12951
+9 min
Platform Occupation

        →

+2 More
Trains Affected
Next 2–3 Hours
```

Cards should be small raised neumorphic surfaces.

The arrow can use muted navy.

Risk progression should use semantic orange/red only when required.

------------------------------------------------------------------------

# 16. Operational Recommendation

This section should look actionable but not overly colorful.

Example:

``` text
OPERATIONAL RECOMMENDATION

Platform reassignment at Prayagraj Jn.
can recover ~18 minutes.

[ Simulate Scenario ]   [ View Impact ]
```

Primary action:

``` text
background: #0B8F68;
color: #FFFFFF;
border-radius: 10–12px;
```

Secondary action:

``` text
background: #F4F6F8;
color: #10243E;
box-shadow:
  4px 4px 8px rgba(163,174,184,.22),
  -4px -4px 8px rgba(255,255,255,.8);
```

Pressed state should use an inset shadow.

------------------------------------------------------------------------

# 17. Passenger Impact

Use a raised card with compact statistics.

``` text
PASSENGER IMPACT (EST.)

TOTAL PASSENGERS       VULNERABLE
1,126                   128
```

Then:

``` text
Food       1,126
Water      2,252 L
Medical    25
Shelter    1,200
```

Use icons and semantic colors sparingly.

The vulnerable count may use red:

``` text
#D92D20
```

The card should remain mostly neutral.

------------------------------------------------------------------------

# 18. Buttons

### Primary button

``` css
background: #0B8F68;
color: white;
border: none;
border-radius: 11px;
box-shadow:
  4px 4px 10px rgba(163,174,184,.25),
  -4px -4px 10px rgba(255,255,255,.7);
```

### Secondary button

``` css
background: #F4F6F8;
color: #10243E;
border: none;
border-radius: 11px;
box-shadow:
  4px 4px 10px rgba(163,174,184,.22),
  -4px -4px 10px rgba(255,255,255,.85);
```

### Pressed button

``` css
box-shadow:
  inset 3px 3px 7px rgba(163,174,184,.22),
  inset -3px -3px 7px rgba(255,255,255,.8);
```

Avoid gradients and neon glows.

------------------------------------------------------------------------

# 19. Status Pills

Use small soft pills.

### On Time

``` text
background: #DDF3EB
color: #087A59
```

### Delayed

``` text
background: #FFF3D6
color: #A96700
```

### High Risk

``` text
background: #FDE8DF
color: #C94E17
```

### Severe

``` text
background: #FCE4E2
color: #B42318
```

Pills should never dominate the card.

------------------------------------------------------------------------

# 20. Icons

Use a consistent outlined icon family.

Preferred:

``` text
Lucide
```

or the existing icon library if already installed.

Icon style:

-   16--20px in cards
-   20--24px in section headings
-   stroke width around 1.8--2
-   dark navy for neutral icons
-   semantic color for status icons

Do not mix emoji icons with professional SVG icons in the production UI.

------------------------------------------------------------------------

# 21. System Feed

The bottom feed should become a light horizontal raised strip.

Example:

``` text
SYSTEM FEED

● 10:01 PM  Flood alert issued for Ganga Basin
● 09:59 PM  Train 12401 delay increased by 15 min
● 09:58 PM  Heavy rainfall in Prayagraj
● 09:55 PM  Speed restriction updated: 45 km/h
```

Use tiny semantic status dots.

Keep source information aligned to the right:

``` text
Data Sources: IMD · CWC · Indian Railways · IRCTC
```

------------------------------------------------------------------------

# 22. Shadows and Depth Rules

Use only three depth levels.

## Level 1 --- Major card

``` css
box-shadow:
  10px 10px 22px rgba(163,174,184,.25),
  -10px -10px 22px rgba(255,255,255,.92);
```

## Level 2 --- Inner card

``` css
box-shadow:
  5px 5px 12px rgba(163,174,184,.20),
  -5px -5px 12px rgba(255,255,255,.82);
```

## Level 3 --- Inset control

``` css
box-shadow:
  inset 3px 3px 7px rgba(163,174,184,.18),
  inset -3px -3px 7px rgba(255,255,255,.82);
```

Do not stack multiple large shadows on one element.

------------------------------------------------------------------------

# 23. Borders

Neumorphism should rely primarily on light/dark shadow contrast.

Use borders only when necessary for:

-   selected states
-   risk states
-   focus states
-   map boundaries
-   accessibility

Preferred border:

``` css
border: 1px solid rgba(255,255,255,.65);
```

Selected primary:

``` css
border: 1px solid rgba(11,143,104,.30);
```

Avoid the current bright cyan 1--2px borders around large panels.

------------------------------------------------------------------------

# 24. Responsive Behavior

## Desktop ≥ 1280px

Use the full three-column dashboard.

``` text
Sidebar | Main | Sidebar
```

## Tablet 768--1279px

Use:

``` text
Main + collapsible side panels
```

Prioritize:

1.  Map
2.  Selected train ETA
3.  Route risk
4.  Active trains
5.  Alerts
6.  Passenger impact

## Mobile \< 768px

Use a single-column stack:

``` text
Header
↓
Selected Train / ETA
↓
Route Risk
↓
Network Map
↓
Live Trains
↓
Alerts
↓
Downstream Impact
↓
Passenger Impact
↓
Operational Recommendation
```

Navigation should become a horizontally scrollable or compact menu.

------------------------------------------------------------------------

# 25. Accessibility

Neumorphism must not reduce usability.

Requirements:

-   Text contrast must remain readable.
-   Do not communicate risk by color alone.
-   Every status should include text.
-   Focus states must be visible.
-   Interactive elements need at least approximately 40--44px touch
    targets.
-   Map controls must remain clearly distinguishable.
-   Avoid extremely low-contrast gray text.
-   Red/green status must be accompanied by labels such as `ON TIME`,
    `DELAYED`, `HIGH RISK`.

------------------------------------------------------------------------

# 26. Motion

Use subtle motion only.

Recommended:

``` text
Card hover:       120–180ms
Button press:     80–120ms
Panel transition: 180–240ms
Map updates:      smooth but restrained
```

Example:

``` css
transition:
  transform 160ms ease,
  box-shadow 160ms ease,
  background 160ms ease;
```

Avoid:

-   neon pulsing
-   constant glowing
-   excessive bouncing
-   animated gradients

Critical alerts may use a very subtle attention indicator, but the
dashboard should remain calm.

------------------------------------------------------------------------

# 27. Light Theme Color Map

Replace the current dark theme approximately as follows:

  Current dark UI          New light UI
  ------------------------ ----------------------
  `#080B14` / near black   `#EEF1F4`
  `#0D1322`                `#F4F6F8`
  `#111827`                `#F7F9FA`
  Cyan neon                Railway green
  Cyan glow                Soft green accent
  White text               Navy text
  Gray-white text          Slate gray
  Neon orange              Soft semantic orange
  Neon red                 Soft semantic red
  Glowing borders          Soft shadows
  Dark inset panels        Light inset panels

------------------------------------------------------------------------

# 28. What Must NOT Change

The visual transformation must not remove or weaken existing
functionality.

Keep:

-   Live train data
-   Train search
-   Train selection
-   ETA prediction
-   Confidence score
-   Route/hazard map
-   Disaster monitoring
-   Route risk
-   Active alerts
-   Passenger impact
-   Downstream delay propagation
-   Operational recommendations
-   Scenario simulation
-   Reports
-   PNR predictor, if implemented
-   Data-source attribution
-   Real-time/system feed

This is a **visual transformation**, not a feature reduction.

------------------------------------------------------------------------

# 29. Implementation Strategy

Refactor the existing dark theme rather than rebuilding the dashboard
from scratch.

## Step 1 --- Global theme

Create a centralized light-theme token file.

Suggested CSS variables:

``` css
:root {
  --bg: #EEF1F4;
  --surface: #F4F6F8;
  --surface-raised: #F7F9FA;
  --text: #10243E;
  --text-secondary: #5D6B7A;
  --text-muted: #7C8895;
  --primary: #0B8F68;
  --primary-soft: #DDF3EB;

  --normal: #159A68;
  --watch: #F2A11B;
  --high-risk: #F47A20;
  --severe: #D92D20;
  --info: #2878C8;

  --divider: #DDE3E8;

  --shadow-raised:
    8px 8px 18px rgba(163,174,184,.25),
    -8px -8px 18px rgba(255,255,255,.90);

  --shadow-soft:
    4px 4px 10px rgba(163,174,184,.22),
    -4px -4px 10px rgba(255,255,255,.85);

  --shadow-inset:
    inset 3px 3px 7px rgba(163,174,184,.18),
    inset -3px -3px 7px rgba(255,255,255,.82);

  --radius-lg: 20px;
  --radius-md: 14px;
  --radius-sm: 10px;
}
```

## Step 2 --- Replace global dark surfaces

Replace dark background and panel classes first.

Do not individually patch every component before establishing the token
system.

## Step 3 --- Update navigation

Convert the dark header/nav to the raised light header.

## Step 4 --- Update cards

Apply the three-level shadow system consistently.

## Step 5 --- Update semantic states

Replace neon cyan/orange/red states with the semantic palette.

## Step 6 --- Update map

Preserve map functionality while changing the surrounding controls and
route styling.

## Step 7 --- Update selected train intelligence

Make the predicted ETA the visual focal point.

## Step 8 --- Polish interactions

Add soft hover, focus and pressed states.

------------------------------------------------------------------------

# 30. Component Naming Suggestions

If the project uses reusable components, align them with the following
structure:

``` text
Dashboard
├── TopNavigation
├── LiveTrainsPanel
│   ├── TrainSearch
│   └── TrainCard
├── NetworkOverview
│   ├── RiskLegend
│   ├── NetworkSelector
│   ├── RailwayMap
│   └── MapControls
├── RouteRiskOverview
│   ├── RiskRing
│   └── HazardBreakdown
├── DisasterMonitor
│   └── AlertCard
├── SelectedTrainIntelligence
│   ├── EtaSummary
│   ├── ConfidenceRing
│   └── EtaChangeReasons
├── TrainMetrics
├── DownstreamImpact
├── OperationalRecommendation
├── PassengerImpact
└── SystemFeed
```

Keep components data-driven so the visual refactor does not duplicate
railway logic.

------------------------------------------------------------------------

# 31. Visual Acceptance Checklist

The transformed dashboard is ready when:

-   [ ] The overall page is light and soft rather than dark.
-   [ ] Major cards use restrained neumorphic depth.
-   [ ] No large neon cyan borders remain.
-   [ ] No dark navy dashboard panels remain except where specifically
    required by map content.
-   [ ] Primary UI accent is railway green.
-   [ ] Risk colors remain semantically meaningful.
-   [ ] Navigation looks raised and tactile.
-   [ ] Search/filter controls look inset.
-   [ ] Live train cards match the neumorphic visual language.
-   [ ] The map remains the main visual centerpiece.
-   [ ] Map routes use semantic railway risk colors.
-   [ ] Risk overview uses a clear circular risk indicator.
-   [ ] Alerts are readable and differentiated without overwhelming
    color.
-   [ ] ETA prediction is the strongest metric in the selected-train
    area.
-   [ ] Operational actions remain visually prominent.
-   [ ] Passenger impact remains easy to scan.
-   [ ] The bottom system feed remains visible.
-   [ ] Typography is dark navy/slate rather than white.
-   [ ] Shadows are soft and never glow.
-   [ ] Responsive layouts remain usable.
-   [ ] Accessibility is preserved.

------------------------------------------------------------------------

# 32. Target Visual Personality

The final RAILGUARD dashboard should communicate:

**Trustworthy** --- suitable for railway operations.

**Intelligent** --- prediction and risk information feel data-driven.

**Calm under pressure** --- even severe alerts do not make the entire UI
visually alarming.

**Modern** --- polished, spacious and contemporary.

**Operational** --- information hierarchy remains more important than
decoration.

**Tactile** --- cards and controls feel physically raised or pressed
through subtle neumorphic shadows.

The key rule is:

> **Use neumorphism to create hierarchy and tactility, not decoration.**

The finished dashboard should look like a refined railway intelligence
command platform that has been transformed from the current dark
control-room UI into the provided bright, professional RAILGUARD visual
direction.
