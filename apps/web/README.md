# Reflex Frontend

## Overview
Next.js 14 dashboard application for Reflex, providing real-time observability and reaction management for Chrome extension developers.

## Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **State Management**: React Context + Hooks
- **Testing**: Jest + Playwright

## Development Setup

### Prerequisites
- Node.js 18+
- pnpm
- Docker & Docker Compose

### Local Development
1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

### Running Tests
```bash
# Run unit tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e
```

## Project Structure
```
apps/web/
├── app/                # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions
├── styles/            # Global styles
└── __tests__/         # Test files
```

## Key Features
- Project-based routing
- Real-time log monitoring
- Reaction rule configuration
- Complaint management
- User authentication
- Project settings

## SRE/DevOps Notes
- Error tracking with Sentry
- Performance monitoring
- Analytics integration
- SEO optimization
- Accessibility compliance

## Deployment
- CI/CD via GitHub Actions
- Deployed to Vercel
- Environment variables managed in Vercel dashboard
- Preview deployments for PRs

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Backend API URL

After deploying your backend to Render, update your environment variables:

- Set `NEXT_PUBLIC_API_URL` to your Render backend URL (e.g., `https://your-backend.onrender.com`).
- This ensures all frontend API requests go to the correct backend.
