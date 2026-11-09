# Personal App Launcher

A minimalist static personal application launcher for GitHub Pages. Showcases public open-source applications and tools with dynamic squircle icons, category filtering, instant search, and light/dark theme support.

## Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + glassmorphism & squircle design
- **Icons:** Lucide React + custom SVG squircles
- **Deployment:** GitHub Pages via GitHub Actions

---

## How to Add New Applications

Edit `public/apps.json`. The launcher UI dynamically renders all entries from this file.

### Schema

```json
[
  {
    "name": "Application Name",
    "description": "Short application summary (1-2 sentences)",
    "url": "https://example.com",
    "icon": "icons/app-icon.png",
    "category": "Utilities",
    "featured": true
  }
]
```

### Field Definitions

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Display name of the application. |
| `description` | `string` | Short description shown on the tile. |
| `url` | `string` | Target URL opened in a new tab when clicked. |
| `icon` | `string` | Path relative to `public/` (e.g., `icons/my-app.png` or `icons/my-app.svg`). |
| `category` | `string` | Grouping tag (e.g., `Utilities`, `Developer Tools`, `Mobile`). |
| `featured` | `boolean` | When `true`, shows a gold star badge in the corner. |

### Adding an App Icon

1. Place your 1:1 square icon (`.png`, `.svg`, or `.webp`) in `public/icons/`.
2. Reference it in `public/apps.json` as `icons/<filename>`.
3. The launcher automatically clips the icon to a continuous squircle with responsive dimensions and elevation shadow.

---

## Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Run production build & type check
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which automatically builds and publishes the production bundle to GitHub Pages (`https://jinkun1998.github.io/`).
