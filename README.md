# QueenKay Importation - Ecommerce Frontend

A modern, responsive ecommerce frontend built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components. Features a complete shopping experience with cart management, checkout flow, and product browsing.

## Features

- 🛍️ **Complete Shopping Experience**: Browse products, add to cart, checkout
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🛒 **Persistent Cart**: Cart state persists across sessions using Zustand
- 🔍 **Search & Filter**: Advanced product search and filtering
- ✨ **Smooth Animations**: Framer Motion for delightful interactions
- 🧪 **Type Safe**: Full TypeScript coverage
- 🧪 **Testing**: Jest + React Testing Library setup
- 📋 **Accessibility**: HCI best practices and ARIA support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui + Radix UI
- **State Management**: Zustand with persistence
- **Animation**: Framer Motion
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**: [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── shop/              # Shop and product pages
│   ├── checkout/          # Checkout flow
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── product/          # Product-related components
│   ├── cart/             # Cart components
│   └── checkout/         # Checkout components
├── store/                # Zustand stores
├── lib/                  # Utility functions
├── data/                 # Mock data and types
└── ...
```

## Key Pages

- **Homepage** (`/`) - Hero, featured products, testimonials
- **Shop** (`/shop`) - Product browsing with filters
- **Product Detail** (`/shop/[productId]`) - Individual product pages
- **Pre-order** (`/preorder`) - Pre-order product listings
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information
- **Checkout** (`/checkout`) - Complete checkout flow
- **Auth** (`/signin`, `/signup`) - Authentication pages

## State Management

The app uses Zustand for cart state management with localStorage persistence:


```

## Development Guidelines

### Components
- Use TypeScript for all components
- Follow shadcn/ui patterns for consistent styling
- Include proper ARIA attributes for accessibility
- Add unit tests for complex components

### Styling
- Use Tailwind CSS utility classes
- Follow the design system defined in `globals.css`
- Use CSS variables for theme tokens
- Ensure responsive design on all breakpoints

### Testing
- Write unit tests for utility functions
- Test user interactions in components
- Aim for good test coverage on critical paths

## Mock Data

The app uses mock data from `src/data/` for development:
- `products.ts` - Product catalog
- `spotlight.ts` - Featured/spotlight items
- `testimonials.ts` - Customer testimonials
- `navLinks.ts` - Navigation structure



## CI/CD

GitHub Actions workflow automatically:
- Runs ESLint and TypeScript checks
- Executes test suite
- Builds the application
- Reports coverage (if configured)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

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
- `npm run dev` � start Next.js development server
- `npm run build` � produce an optimized production build
- `npm run start` � start the production server after build
- `npm run lint` � run ESLint (configured via `eslint-config-next`)

## Project structure (important files)
- `src/app/layout.tsx` � application layout (shared UI wrapper)
- `src/app/page.tsx` � home page entry
- `src/lib` � shared utilities and helper functions
- `src/app/globals.css` � global Tailwind/CSS styles
- `next.config.ts` � Next.js configuration
- `tsconfig.json` � TypeScript configuration
- `package.json` � scripts and dependencies

## Tech stack and libraries
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS for styling
- `react-hook-form` + `zod` for forms and validation
- `zustand` for lightweight state management
- `framer-motion` for animations
- `lucide-react` for icons
- Utility libraries: `clsx`, `class-variance-authority`, `tailwind-merge`








