# Unit Testing Guide - SPrinova Digital Marketing

## Overview
This document provides comprehensive instructions for running and writing unit tests for the SPrinova Digital Marketing application.

## Setup & Installation

### Dependencies Installed
The following testing dependencies have been installed:
- **Jest** - Testing framework
- **React Testing Library** - React component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **ts-jest** - TypeScript support for Jest
- **jest-environment-jsdom** - DOM environment for tests

### Configuration Files
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Jest setup and initialization

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests for CI/CD pipeline
npm run test:ci
```

## Test Structure

### Test Files Location
Test files are organized alongside source files:
- Utility tests: `src/lib/*.test.ts`
- Hook tests: `src/hooks/*.test.ts`
- Component tests: `src/components/*.test.tsx`
- AI module tests: `src/ai/*.test.ts`
- Integration tests: `src/__tests__/integration.test.tsx`

### Test File Naming
- Unit tests: `ComponentName.test.tsx` or `function.test.ts`
- Integration tests: `integration.test.tsx`
- Utilities: `test-utils.ts`

## Existing Test Suites

### 1. Utility Functions (`src/lib/utils.test.ts`)
Tests for the `cn()` utility function:
- Merges class names correctly
- Handles conditional classes
- Resolves Tailwind CSS conflicts
- Handles empty inputs, undefined, and null values
- Supports complex class combinations

**Run:** `npm test utils.test.ts`

### 2. Constants (`src/lib/constants.test.ts`)
Tests for the services array:
- Verifies 8 services are defined
- Validates required properties (title, description, icon)
- Tests each service exists with correct data
- Validates icon components are functions

**Run:** `npm test constants.test.ts`

### 3. Toast Hook (`src/hooks/use-toast.test.ts`)
Tests for toast notification reducer:
- ADD_TOAST action - adds new toast to state
- Toast limit enforcement (max 1 toast)
- UPDATE_TOAST action - updates existing toast
- DISMISS_TOAST action - dismisses single or all toasts
- REMOVE_TOAST action - removes toasts from state
- State isolation - updates don't affect other toasts

**Run:** `npm test use-toast.test.ts`

### 4. Header Component (`src/components/header.test.tsx`)
Tests for main navigation header:
- Renders header correctly
- Displays navigation links
- Shows Contact Us button
- Mobile menu functionality
- Logo rendering and linking
- Navigation link hrefs
- Styling and classes

**Run:** `npm test header.test.tsx`

### 5. Analytics Summary Component (`src/components/analytics-summary.test.tsx`)
Tests for analytics component:
- Renders without crashing
- Returns null component correctly

**Run:** `npm test analytics-summary.test.tsx`

### 6. AI Module (`src/ai/genkit.test.ts`)
Tests for Genkit AI integration:
- `isAIAvailable()` returns boolean
- Checks API key availability
- Consistent behavior across calls
- Handles missing API key gracefully
- Proper initialization when API key is present

**Run:** `npm test genkit.test.ts`

## Writing New Tests

### Example: Testing a Utility Function

```typescript
import { myFunction } from '@/lib/utils';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });

  it('should handle edge cases', () => {
    expect(() => myFunction(null)).not.toThrow();
  });
});
```

### Example: Testing a React Component

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '@/components/my-component';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
});
```

## Mocking

### Mock Next.js Modules

```typescript
// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));
```

### Mock Fetch Calls

```typescript
global.fetch = jest.fn();

beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

it('should fetch data', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'test' }),
  });

  // Your test here
});
```

## Test Utilities

Common test utilities are provided in `src/__tests__/test-utils.ts`:
- `mockUseRouter()` - Mock Next.js router
- `mockUsePathname()` - Mock pathname hook
- `mockUseSearchParams()` - Mock search params
- `createMockFetchResponse()` - Create mock fetch responses
- `waitFor()` - Wait for async operations

## Coverage Goals

### Target Coverage Metrics
- **Statements:** > 70%
- **Branches:** > 65%
- **Functions:** > 70%
- **Lines:** > 70%

### View Coverage Report
```bash
npm run test:coverage

# Coverage report will be in:
# ./coverage/lcov-report/index.html
```

## Best Practices

### 1. Test Behavior, Not Implementation
```typescript
// ✅ Good - Tests behavior
expect(screen.getByRole('button')).toBeInTheDocument();

// ❌ Bad - Tests implementation
expect(component.state.showButton).toBe(true);
```

### 2. Use Semantic Queries
```typescript
// ✅ Good - Uses semantic queries
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')
screen.getByPlaceholderText('Enter name')

// ❌ Bad - Uses implementation details
screen.getByTestId('submit-btn')
container.querySelector('.button')
```

### 3. Test User Interactions
```typescript
// ✅ Good - Tests as user would interact
const user = userEvent.setup();
await user.click(button);

// ❌ Bad - Calls components directly
fireEvent.click(button);
```

### 4. Keep Tests Focused
- One behavior per test
- Clear, descriptive test names
- Arrange-Act-Assert pattern

```typescript
it('should update toast when dismiss is called', () => {
  // Arrange
  const state = { toasts: [{ id: '1', open: true }] };
  
  // Act
  const result = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' });
  
  // Assert
  expect(result.toasts[0].open).toBe(false);
});
```

## Pre-Deployment Testing Checklist

Before deploying to production:

- [ ] All tests pass: `npm test`
- [ ] No test warnings or errors
- [ ] Coverage meets targets: `npm run test:coverage`
- [ ] TypeScript types check: `npm run typecheck`
- [ ] Linting passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors or warnings
- [ ] E2E tests pass (if available)

## CI/CD Integration

### Running Tests in CI/CD Pipeline

```bash
# Run all tests with coverage in CI mode
npm run test:ci

# This command:
# - Runs all tests
# - Generates coverage report
# - Uses CI environment settings
# - Doesn't require interactive input
# - Exits with appropriate code
```

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:ci
      - uses: codecov/codecov-action@v2
        with:
          files: ./coverage/coverage-final.json
```

## Troubleshooting

### Tests Failing After Installation

```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall node_modules
rm -rf node_modules package-lock.json
npm install
```

### Async Test Timeouts

```typescript
// Increase timeout for slow tests
it('should load data', async () => {
  // test code
}, 10000); // 10 second timeout
```

### Module Not Found Errors

Ensure `jest.config.js` has correct path mappings:
```javascript
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
},
```

### Mock Not Working

- Verify mocks are defined before imports
- Check mock is being called with `jest.fn()`
- Use `jest.mock()` at the top of test file

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)

## Contact & Support

For questions about testing setup or best practices, refer to the main README.md or contact the development team.

---

**Last Updated:** January 29, 2026
**Test Framework Version:** Jest + React Testing Library
**Node Version:** 18+
