# Panda Weather

Vue 3 weather dashboard powered by [OpenWeatherMap](https://openweathermap.org/).

## Features

- Current weather cards and up to **5** city blocks
- **Geocoding autocomplete** when adding a city
- **Day / 5-day (week)** forecast with hourly and daily Chart.js graphs
- **Day / Night** display for the current day (night data from forecast)
- **Favourites** tab with localStorage persistence (max 5)
- Default city resolved by **IP geolocation**
- **EN / UK** interface and API responses (`lang` parameter)
- Custom confirm modals (no UI component libraries)
- Responsive layout (container up to 1200px, mobile-friendly cards)

## Architecture

```
src/
  api/           HTTP clients (weather, geocoding, geo IP)
  services/      Business orchestration
  utils/mappers/ API → view models
  store/         Pinia (weather, locale, confirm)
  composables/   Reusable UI logic
  components/    Presentational Vue components
  pages/         Route views
  i18n/          Translations
```

## Setup

```sh
npm install
cp .env.example .env
# Add VITE_OPENWEATHER_API_KEY and VITE_GEO_API_KEY
npm run dev
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build with type check
- `npm run lint` — ESLint + oxlint
