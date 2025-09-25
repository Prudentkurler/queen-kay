# Queen-Kay — ecommerce-frontend

A Next.js + TypeScript frontend for the Queen-Kay e-commerce project. This repository contains the UI, styles, and client-side logic used to build and run the storefront.

## Table of contents
- Project overview
- Requirements
- Installation
- Scripts
- Project structure
- Tech stack
- Development notes
- Contributing
- License

## Project overview
This project is a Next.js (App Router) frontend scaffolded with `create-next-app`. It includes TypeScript, Tailwind CSS, and common frontend libraries used for building a modern e-commerce UI.

Use this repo to develop, preview, and deploy the storefront. The app implements pages and components under `src/app` and shared utilities inside `src/lib`.

## Requirements
- Node.js 18+ (recommended) or compatible LTS
- npm, yarn, or pnpm (npm commands shown below)

Note: The project uses the version ranges in `package.json`. Ensure your package manager can install the listed versions.

## Installation
1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser at `http://localhost:3000`.

## Scripts
- `npm run dev` — start Next.js development server
- `npm run build` — produce an optimized production build
- `npm run start` — start the production server after build
- `npm run lint` — run ESLint (configured via `eslint-config-next`)

## Project structure (important files)
- `src/app/layout.tsx` — application layout (shared UI wrapper)
- `src/app/page.tsx` — home page entry
- `src/lib` — shared utilities and helper functions
- `src/app/globals.css` — global Tailwind/CSS styles
- `next.config.ts` — Next.js configuration
- `tsconfig.json` — TypeScript configuration
- `package.json` — scripts and dependencies

## Tech stack and libraries
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS for styling
- `react-hook-form` + `zod` for forms and validation
- `zustand` for lightweight state management
- `framer-motion` for animations
- `lucide-react` for icons
- Utility libraries: `clsx`, `class-variance-authority`, `tailwind-merge`

## Development notes
- Image assets referenced by `next/image` are stored in the `public` folder. When adding images, place them in `public` and reference via `/your-image.png`.
- Tailwind is configured in the project (see `src/app/globals.css`). Update the Tailwind config or add utilities as needed.
- Keep UI components small and reusable. Place shared components in a `src/components` directory if you add them.
- For forms prefer `react-hook-form` and validate with `zod` + `@hookform/resolvers`.

## Environment & secrets
If the frontend needs to call APIs or use keys, configure environment variables in a `.env.local` file at the project root. Example:

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Do not commit `.env.local` to version control.

## Building and deploying
- Build locally: `npm run build`
- Start locally (after build): `npm run start`

This project is ready for deployment on Vercel or any platform that supports Next.js. Follow Next.js deployment docs for platform-specific steps.

## Contributing
- Create feature branches from `main` and open pull requests with a clear description of changes.
- Run linting before committing. Add tests where appropriate.

## License
Add a license file (for example `LICENSE`) or update this README with your chosen license. If this is private, keep the repo private.


If you want, I can also add a short `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, or a `LICENSE` file.
