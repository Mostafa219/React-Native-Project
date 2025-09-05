## Movie App (React Native + Expo)

An Expo React Native application for browsing movies from The Movie Database (TMDB). It features a modern dark UI, trending and recommended sections, powerful search with filters, detailed movie pages, and local favorites powered by AsyncStorage.

### Features
- Trending and recommended movie carousels on `Home`
- Search with filters: year and language
- Movie details: overview, genres, cast, videos, recommendations, and similar titles
- Add/remove favorites stored locally (`AsyncStorage`)
- Custom bottom tab bar and splash screen
- Works with Expo Go (Android/iOS) and web

### Tech Stack
- React Native 0.79, React 19
- Expo 53 (Splash Screen, StatusBar, Updates)
- React Navigation (stack + bottom tabs)
- AsyncStorage for local persistence
- TMDB v3 API

---

### Getting Started

#### Prerequisites
- Node.js 18+ and npm
- Expo CLI: `npm i -g expo`
- TMDB account and API Read Access Token (v4)

#### 1) Install dependencies
```bash
npm install
```

#### 2) Configure environment variables
This app expects the TMDB token from an Expo public env var used in `src/api/themoviedbApi.js`:

```js
Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN}`
```

Set it using one of the options below:

- Expo CLI (recommended during development)
```bash
expo start --clear --tunnel --config app.json --env.EXPO_PUBLIC_TMDB_ACCESS_TOKEN="<YOUR_TMDB_V4_READ_TOKEN>"
```

- .env file (with Expo): create `.env` in the project root
```env
EXPO_PUBLIC_TMDB_ACCESS_TOKEN=<YOUR_TMDB_V4_READ_TOKEN>
```
Then start normally (Expo will inline public vars).

- Windows PowerShell (current session)
```powershell
$env:EXPO_PUBLIC_TMDB_ACCESS_TOKEN="<YOUR_TMDB_V4_READ_TOKEN>"; npm run start
```

Where to get the token:
- TMDB settings → API → API Read Access Token (v4)

#### 3) Run the app
```bash
npm run start       # start Metro + Expo
npm run android     # open on Android (device/emulator)
npm run ios         # open on iOS (simulator)
npm run web         # open in the browser
```

> If the splash screen persists, wait a second: the app calls `SplashScreen.hideAsync()` once the navigation container is ready.

---

### Project Structure
```
React-Native-Project/
  App.js                 # Navigation, splash handling, custom tab bar
  index.js               # Expo root registration
  app.json               # Expo app config (name, icons, splash, EAS project ID)
  eas.json               # EAS configuration
  assets/                # App icons, splash images, posters
  src/
    api/
      themoviedbApi.js  # TMDB API client using public env var
      assests.js        # Helpers (e.g., preventSearchWords)
    components/         # UI components (cards, details, lists)
    lib/
      favorites/
        utilitys.js     # AsyncStorage favorites CRUD
    screens/
      home/Home.js
      search/Search.js
      favorites/Favorites.js
      MovieDetails/MovieDetails.js
      splash/splash.js
```

### Navigation
- Stack: `Splash` → `MainTabs` → `MovieDetails`
- Tabs: `Home`, `Search`, `Favourite`

---

### Environment & Builds
- Public env var: `EXPO_PUBLIC_TMDB_ACCESS_TOKEN` must be available at build and runtime.
- EAS project is configured in `app.json` (`extra.eas.projectId`) and `eas.json`.
- Android package: `com.abdelmonem_marei.movieapp`.

For EAS builds, set the env var in your EAS project (Dashboard or `eas.json` secret) and run:
```bash
eas build --platform android
eas build --platform ios
```

---

### Troubleshooting
- Empty results when searching: ensure the token is valid and the env var is set.
- 401/403 from TMDB: check you are using the v4 Read Access Token and it has not expired.
- Web build issues with native modules: prefer running on a device/emulator for full functionality.
- Long splash screen: Metro bundler may be starting up; subsequent runs will be faster.

---

### License
This project is for educational/demo purposes. Add your license of choice if distributing.


