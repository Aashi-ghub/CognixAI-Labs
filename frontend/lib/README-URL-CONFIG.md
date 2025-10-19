# URL Configuration Guide

This document explains how to use the centralized URL configuration system in your application.

## Overview

The URL configuration is centralized in `lib/config.ts` to ensure consistent URL usage across your entire application. This prevents hardcoded URLs and makes it easy to change your base URL for different environments.

## Configuration

### Environment Variables

Add these to your `.env` file:

```env
# Base URL (optional - defaults to localhost:3000 in development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# For production, use your actual domain:
# NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Using the Configuration

#### Import the configuration:
```typescript
import { config, getUrl, BASE_URL, AUTH_CALLBACK_URL } from '../lib/config'
```

#### Available URL helpers:

```typescript
// Get full URLs for routes
getUrl.home()           // → "http://localhost:3000/"
getUrl.login()          // → "http://localhost:3000/login"
getUrl.dashboard()      // → "http://localhost:3000/dashboard"
getUrl.authCallback()   // → "http://localhost:3000/auth/callback"

// Get URL for any route
getUrl.route("/custom") // → "http://localhost:3000/custom"

// Direct access to base URL
BASE_URL                // → "http://localhost:3000"
AUTH_CALLBACK_URL       // → "http://localhost:3000/auth/callback"
```

#### Route constants:
```typescript
config.routes.home      // → "/"
config.routes.login     // → "/login"
config.routes.dashboard // → "/dashboard"
config.routes.services  // → "/services"
```

## Examples

### In React components:
```typescript
import { getUrl } from '../lib/config'

// In JSX
<a href={getUrl.dashboard()}>Go to Dashboard</a>
<Link href={getUrl.login()}>Login</Link>

// In functions
router.push(getUrl.home())
window.location.href = getUrl.authCallback()
```

### In API routes:
```typescript
import { getUrl } from '../../../lib/config'

export async function GET() {
  return NextResponse.redirect(getUrl.home())
}
```

### In Supabase auth:
```typescript
import { getUrl } from '../lib/config'

const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: getUrl.authCallback()
  }
})
```

## Environment-Specific URLs

### Development
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Production
```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Staging
```env
NEXT_PUBLIC_BASE_URL=https://staging.yourdomain.com
```

## Benefits

1. **Consistency**: All URLs use the same base configuration
2. **Environment-aware**: Automatically adapts to different environments
3. **Maintainable**: Change the base URL in one place
4. **Type-safe**: TypeScript support with autocomplete
5. **Validation**: Automatic validation of required environment variables

## Migration

If you have existing hardcoded URLs, replace them with the centralized configuration:

```typescript
// Before
const url = "http://localhost:3000/auth/callback"
router.push("/dashboard")

// After
import { getUrl } from '../lib/config'
const url = getUrl.authCallback()
router.push(getUrl.dashboard())
```
