# Scent Stories

A responsive React + Vite perfume discovery storefront. It uses local sample data rather than a database, and the demo account is saved in the browser.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Pages

| Route | Page |
| --- | --- |
| `/` and `/dashboard` | Home page, featured fragrances, and brand introduction |
| `/collection` | Fragrance collection with scent-family filters and add-to-bag controls |
| `/scent-finder` | Mood-based scent finder |
| `/journal` | Scent Stories journal |
| `/profile` | Demo account profile |
| `/login` | Demo sign-in |
| `/register` | Create a demo account |
| `/admin/login` | Separate demo admin sign-in |
| `/admin/dashboard` | Role-gated catalog and journal overview |

The original `/courses`, `/grades`, and `/announcements` URLs redirect to their new perfume-site URLs. The routes preserve every page from the original university project, reimagined for the fragrance brand. Sign-in is intentionally simulated: forms require a complete email address and a password of at least six characters, but credentials are not checked against a real account. Profile details are saved in `localStorage`; passwords are not saved. The shopping bag is held in page memory and resets when the page is refreshed. There is no database, checkout, or real payment processing.

The separate admin demo sign-in is `admin@scentstories.com` with password `admin123`. Its dashboard reports only metrics derived from the local product catalog and journal sample data; there are no real sales, visitor, or customer analytics. Authentication and role checks run entirely in the browser and can be bypassed, so this demo must not be used to protect real admin data. A production admin area needs server-side authentication, authorization, and a trusted data source.

## Where things live

- `src/App.jsx` declares the routes and wraps the app in the account provider.
- `src/components/Layout.jsx` contains the shared header, navigation, footer, and shopping bag.
- `src/components/ProductCard.jsx` renders a reusable fragrance card. Its add button calls the shared bag handler provided by the layout.
- `src/context/AuthProvider.jsx` shares demo account state across pages and persists it in browser `localStorage`; `authContext.js` provides the matching hook.
- `src/utils/formValidation.js` contains the shared email-format and minimum-password-length rules used by sign-in and registration.
- `src/data/products.json` is the editable fragrance catalog; each object supplies the details used by the collection, home, finder, and bag.
- `src/data/stories.js` holds the journal articles.
- `src/pages/` contains one React component per route: `Home.jsx`, `Collection.jsx`, `ScentFinder.jsx`, `Journal.jsx`, `Profile.jsx`, `Login.jsx`, and `Register.jsx`.
- The collection page filters the catalog, and the scent finder matches a selected mood with its scent family.
- `src/index.css` defines the shared visual system and responsive layouts.

To add a perfume, add an object to `src/data/products.json`. The collection and finder build their options from that same list, so they update without a separate database or duplicate catalog.
