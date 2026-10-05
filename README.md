# الذهب العُماني — Omani Gold Price Dashboard

A single-page **Angular** application styled with **Tailwind CSS** (Arabic, RTL) that shows gold prices in Oman,
calculates the value of a given weight of gold, and displays a 30-day price history as a chart and a table.

> Prices are static (no API / backend), but based on real research: see **Data and sources** below.

## Features

- Today's price for each karat: **18K, 21K, 22K, 24K** (one reusable `price-card` component)
- **Gold calculator**: choose a karat + weight in grams → estimated total value (with empty state and input validation)
- **30-day trend chart** (SVG polyline), switchable between karats, with current / highest / lowest cards
  and a current / previous / change row
- **Price history table** for the last 30 days (striped rows, horizontal scroll on small screens)
- Sticky header with smooth-scroll navigation links and a mobile menu
- Responsive on desktop, tablet and mobile

### Design

- Dark, modern "pitch deck" style: large light typography, rounded bordered cards and a blue glow.
- Cards (price cards and summary cards) turn blue on hover and fade back when the pointer leaves.
- Compact hero, small footer (credits + "Back to top" button).
- Smooth trend curve with gradient area and a hover tooltip (move the mouse / finger over the chart).
- No emojis: all icons are inline SVG (`app-icon`), and the logo is an SVG gold coin with a golden glow.
- Colors are defined once as CSS variables in `src/styles.css` (light and dark values), so components never repeat theme classes.

### Bonus features

- **Dark / light mode**: toggle in the header. Dark is the default; the choice is remembered.
- **Arabic (RTL) / English (LTR)**: toggle in the header. Switches texts, page direction, dates and gradients,
  and is remembered.
- **Loading states**: animated skeletons for the price cards, trend section and history table
  (the loading time is simulated, see `LOADING_DELAY_MS` in `gold-data.ts`), a fade-in when content appears,
  an animated empty state in the calculator, and a fade when the chart karat changes.
  Animations are disabled for users who prefer reduced motion.

## Requirements

- [Node.js](https://nodejs.org/) 20.19+ (or 22+)
- A package manager: **pnpm** (used by this project), or npm

## Install and run

```bash
# 1. Install dependencies
pnpm install        # or: npm install

# 2. Start the dev server
pnpm start          # or: npm start

# 3. Open http://localhost:4200
```

## Other commands

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm build`     | Production build into `dist/`        |
| `pnpm test`      | Run unit tests (Vitest)              |

## Project structure

```
public/
  logo.svg                     Site logo (gold coin)
src/app/
  components/
    brand/                     Logo + site name (header & footer)
    theme-toggle/              Light / dark mode button
    language-toggle/           Arabic / English button
    skeleton/                  Loading placeholder block
    icon/                      SVG icon set
    section-title/             Reusable section heading
    header/                    Sticky header, navigation, mobile menu
    hero/                      Gradient banner + info bar
    prices/                    "Today's prices" section
    price-card/                Reusable card for one karat
    calculator/                Gold calculator
    trend/                     30-day chart + stats
    history/                   30-day price table
    footer/                    Credits + back to top
  data/
    gold-data.ts               Sample data (24K series, karats, purity ratios)
    nav-links.ts               Navigation sections
    translations.ts            Arabic and English texts
  services/
    gold-data.service.ts       Single source of truth for all prices + loading state
    language.service.ts        Current language, direction and text lookup
    theme.service.ts           Current theme (light / dark)
```

### Data and sources

The prices were researched on **4 October 2026** (24K = 51.20 OMR per gram) and stored as static data:

- Today's prices: [goldrateoman.com](https://goldrateoman.com/) (24K 51.20, 22K 46.93, 21K 44.80, 18K 38.40 OMR/g),
  cross-checked with exchange-rates.org (24K 51.20) and goldpricez.com (24K 51.28).
- 30-day range published by goldrateoman.com: start/high 54.78, low 51.01, latest 51.20 (24K).
- Daily prices of 23-30 September 2026: policybazaar.com.

The sources do not provide a downloadable daily history, so the days in between are an **approximation shaped to match
those published figures**. These are international-spot based reference rates; jewellery shops add making charges
and margin. The data lives in `src/app/data/gold-data.ts` (with these notes next to it).

### How the data works

`gold-data.ts` stores one 30-day sample series for 24K gold. `GoldDataService` derives the other karats from it
(karat ÷ 24), so today's prices, the calculator, the chart and the history table always show the **same numbers**.

## Tech stack

Angular 21 (standalone components, signals) · Tailwind CSS 4 · TypeScript · Vitest · Readex Pro font (Google Fonts)
