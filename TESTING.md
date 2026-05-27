# Testing Guide

## Overview

This project uses **Vitest** for unit and integration testing, focusing on business-critical logic in the audit engine.

## Running Tests

```bash
# Run all tests once
npm run test

# Watch mode (auto-rerun on file changes)
npm run test:watch

# Coverage report
npm run test -- --coverage
```

## Test Coverage

### Audit Engine (`src/lib/__tests__/audit-engine.test.ts`)

- ✅ Inactive seat detection across all providers
- ✅ Plan downgrade recommendations (Team → Plus)
- ✅ API + subscription overlap detection
- ✅ Vendor consolidation (ChatGPT + Claude, Cursor + Copilot)
- ✅ Low utilization warnings
- ✅ Annual commitment misalignment
- ✅ Already-optimized users (no recommendations)
- ✅ Priority classification (Critical/High/Medium/Low)
- ✅ Savings calculations (monthly + annual)
- ✅ Optimization score calculation

### What's NOT Tested (and Why)

- **UI Components**: Tested manually via Vercel preview deployments
- **Database Operations**: Tested via integration with Supabase staging environment
- **API Routes**: Tested via Postman and browser DevTools
- **Email Sending**: Tested via Resend test mode

## Writing New Tests

Example test structure:

```typescript
import { describe, it, expect } from 'vitest';
import { runAuditEngine } from '@/lib/audit-engine';

describe('Feature Name', () => {
  it('should handle edge case', () => {
    const result = runAuditEngine([/* test data */]);
    expect(result.recommendations).toHaveLength(1);
    expect(result.totalMonthlySavings).toBe(100);
  });
});
```

## CI/CD Integration

Tests run automatically on every push via Vercel's build process. Failed tests block deployment.

## Future Testing Improvements

- [ ] Add E2E tests with Playwright
- [ ] Add API route integration tests
- [ ] Add component tests with React Testing Library
- [ ] Add visual regression tests
