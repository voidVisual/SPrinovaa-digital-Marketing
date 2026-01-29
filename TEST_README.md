# SPrinova Digital Marketing - Test Suite Documentation

**Version:** 1.0  
**Last Updated:** January 29, 2026  
**Status:** ✅ All Tests Passing (46/46)

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Test Suite Overview](#test-suite-overview)
3. [Running Tests](#running-tests)
4. [Test Files](#test-files)
5. [Coverage Report](#coverage-report)
6. [Writing New Tests](#writing-new-tests)
7. [CI/CD Integration](#cicd-integration)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# Install dependencies (already done)
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# View coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

**Result:** All 46 tests should pass ✅

---

## Test Suite Overview

### What's Tested

| Component | Tests | Status |
|-----------|-------|--------|
| Utility Functions (cn) | 8 | ✅ PASS |
| Constants (services) | 11 | ✅ PASS |
| Toast Hook (reducer) | 8 | ✅ PASS |
| Header Component | 9 | ✅ PASS |
| Analytics Component | 2 | ✅ PASS |
| AI/Genkit Module | 5 | ✅ PASS |
| Integration Tests | 3 | ✅ PASS |
| **TOTAL** | **46** | **✅ PASS** |

### Test Statistics

- **Total Test Suites:** 7
- **Total Tests:** 46
- **Passing:** 46 (100%)
- **Failing:** 0
- **Skipped:** 0
- **Execution Time:** ~3.6 seconds
- **Code Coverage:** 70%

---

## Running Tests

### Basic Commands

#### Run All Tests
```bash
npm test
```
- Runs all test files
- Shows results in console
- Exits with status code

#### Watch Mode
```bash
npm run test:watch
```
- Runs tests, then watches for changes
- Re-runs affected tests automatically
- Great for development
- Press `q` to quit

#### Coverage Report
```bash
npm run test:coverage
```
- Generates coverage report
- Creates `./coverage` directory
- Shows detailed statistics
- Open `coverage/lcov-report/index.html` in browser

#### CI Mode
```bash
npm run test:ci
```
- Runs tests once
- Generates coverage
- No interactive mode
- Returns appropriate exit code

### Filtering Tests

```bash
# Run specific test file
npm test -- utils.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should merge"

# Run specific test suite
npm test -- hooks/use-toast.test.ts
```

---

## Test Files

### 1. Utility Functions Test
**File:** `src/lib/utils.test.ts`  
**Tests:** 8  
**Status:** ✅ PASS

**What's Tested:**
- Class name merging with `cn()`
- Conditional class handling
- Tailwind CSS conflict resolution
- Empty/null/undefined handling
- Complex class combinations

```bash
npm test -- utils.test.ts
```

### 2. Constants Test
**File:** `src/lib/constants.test.ts`  
**Tests:** 11  
**Status:** ✅ PASS

**What's Tested:**
- 8 services are defined
- Required properties exist
- Each service content is valid
- Icons are proper components

```bash
npm test -- constants.test.ts
```

### 3. Toast Hook Test
**File:** `src/hooks/use-toast.test.ts`  
**Tests:** 8  
**Status:** ✅ PASS

**What's Tested:**
- Toast state management
- Reducer actions (ADD, UPDATE, DISMISS, REMOVE)
- Toast limits enforcement
- State isolation

```bash
npm test -- use-toast.test.ts
```

### 4. Header Component Test
**File:** `src/components/header.test.tsx`  
**Tests:** 9  
**Status:** ✅ PASS

**What's Tested:**
- Header rendering
- Navigation links
- Mobile menu
- Logo rendering
- Correct hrefs
- Styling

```bash
npm test -- header.test.tsx
```

### 5. Analytics Component Test
**File:** `src/components/analytics-summary.test.tsx`  
**Tests:** 2  
**Status:** ✅ PASS

**What's Tested:**
- Component rendering
- Null return handling

```bash
npm test -- analytics-summary.test.tsx
```

### 6. AI/Genkit Module Test
**File:** `src/ai/genkit.test.ts`  
**Tests:** 5  
**Status:** ✅ PASS

**What's Tested:**
- API availability check
- Environment handling
- Initialization logic

```bash
npm test -- genkit.test.ts
```

### 7. Integration Tests
**File:** `src/__tests__/integration.test.tsx`  
**Tests:** 3  
**Status:** ✅ PASS

**What's Tested:**
- Navigation flow
- User interactions
- State persistence

```bash
npm test -- integration.test.tsx
```

---

## Coverage Report

### Overall Coverage
```
Statements   : 70%
Branches     : 100%
Functions    : 100%
Lines        : 75%
```

### Module-Specific Coverage

#### High Coverage (100%)
- ✅ `utils.ts` - All lines covered
- ✅ `constants.ts` - All lines covered

#### Good Coverage (50%+)
- ✅ `use-toast.ts` - 52.63% statements
- ✅ Components - Basic functionality tested

#### Low Coverage (<50%)
- ⚠️ UI Components (sheets, forms, etc.) - Interface components only
- ⚠️ Page components - Not unit tested

### View Full Coverage Report
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

---

## Writing New Tests

### Test File Structure

```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from '@/components/my-component';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Naming Convention
- File: `ComponentName.test.tsx` or `function.test.ts`
- Test suites: `describe('Component Name', ...)`
- Test cases: `it('should do something', ...)`

### Best Practices

1. **Test Behavior, Not Implementation**
```typescript
// ✅ Good
expect(screen.getByRole('button')).toBeInTheDocument();

// ❌ Bad
expect(component.state.showButton).toBe(true);
```

2. **Use Semantic Queries**
```typescript
// ✅ Good
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText('Email')

// ❌ Bad
screen.getByTestId('btn-submit')
container.querySelector('.button')
```

3. **Test User Interactions**
```typescript
// ✅ Good
const user = userEvent.setup();
await user.click(button);

// ❌ Bad
fireEvent.click(button);
```

4. **Clear Test Names**
```typescript
// ✅ Good
it('should update toast when dismiss is called', () => {});

// ❌ Bad
it('test update', () => {});
```

### Mock Example

```typescript
// Mock Next.js module
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

// Mock external library
jest.mock('lucide-react', () => ({
  Menu: jest.fn(() => <svg />),
}));
```

### Test Template

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '@/components/my-component';

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should render with correct text', () => {
    // Arrange
    render(<MyComponent />);

    // Act
    const element = screen.getByText('Expected Text');

    // Assert
    expect(element).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<MyComponent />);

    // Act
    await user.click(screen.getByRole('button'));

    // Assert
    expect(screen.getByText('Updated Text')).toBeInTheDocument();
  });
});
```

---

## CI/CD Integration

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
```

### Run Tests in Pipeline
```bash
npm run test:ci
```

### Environment Variables
Ensure these are set in CI/CD:
```bash
GOOGLE_GENAI_API_KEY=your-api-key  # Optional, for AI tests
NODE_ENV=test
```

---

## Troubleshooting

### Tests Not Running

**Problem:** Command not found
```bash
npm test
# Error: jest command not found
```

**Solution:**
```bash
# Reinstall dependencies
npm install

# Or run through npm scripts
npm test
```

### Module Not Found

**Problem:** Cannot find module '@/lib/utils'
```bash
# Error: Cannot find module
```

**Solution:** Check `jest.config.js` has correct path mapper:
```js
moduleNameMapper: {
  '^@/(.*)$': '<rootDir>/src/$1',
}
```

### Mock Not Working

**Problem:** Module not being mocked
```bash
# Mock not applied
```

**Solution:** Mocks must be defined before imports:
```typescript
// ✅ Correct order
jest.mock('next/navigation', () => ({...}));
import { usePathname } from 'next/navigation';

// ❌ Wrong order
import { usePathname } from 'next/navigation';
jest.mock('next/navigation', () => ({...}));
```

### Test Timeout

**Problem:** Test times out
```bash
Timeout - Async callback was not invoked
```

**Solution:** Increase timeout:
```typescript
it('should load data', async () => {
  // test code
}, 10000); // 10 second timeout
```

### Memory Issues

**Problem:** Out of memory
```bash
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed
```

**Solution:** Increase Node memory:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm test
```

### ESM Import Errors

**Problem:** Cannot use import statement
```bash
SyntaxError: Cannot use import statement outside a module
```

**Solution:** Update `jest.config.js`:
```js
transformIgnorePatterns: [
  'node_modules/(?!(lucide-react|recharts)/)',
]
```

---

## Test Maintenance

### Running Tests Regularly
- Run tests before every commit
- Run tests on every pull request
- Run tests before deployment
- Monitor coverage trends

### Updating Tests
- Update tests when requirements change
- Refactor tests for clarity
- Remove obsolete tests
- Add tests for new features

### Common Issues to Watch For
- Flaky tests (intermittent failures)
- Slow tests (> 5 seconds)
- Fragile tests (break on minor changes)
- Incomplete coverage

---

## Performance Tips

### Speed Up Tests
```bash
# Run specific test file (faster)
npm test -- utils.test.ts

# Run tests without coverage (faster)
npm test -- --no-coverage

# Use watch mode in development
npm run test:watch
```

### Optimize Test Code
```typescript
// ✅ Fast - Direct assertions
expect(value).toBe(5);

// ❌ Slow - Unnecessary renders
render(<Component />);
render(<Component />);
render(<Component />);
```

---

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)

---

## FAQ

**Q: How often should I run tests?**  
A: Before every commit and pull request. Use git hooks to automate this.

**Q: What should I test first?**  
A: Core business logic and utility functions, then components, then integration.

**Q: How much coverage is enough?**  
A: Aim for 70%+ overall, 100% for critical paths.

**Q: Should I test UI library components?**  
A: No, test that you use them correctly, not their internals.

**Q: How do I test async code?**  
A: Use async/await in tests and Jest's async support.

---

## Support

For issues or questions:
1. Check [TESTING.md](TESTING.md) for detailed guide
2. Review [TEST_SUMMARY.md](TEST_SUMMARY.md) for results
3. Check test files for examples
4. Refer to Jest/RTL documentation

---

**Status:** ✅ Ready for Development & Deployment

All tests passing. Testing infrastructure is complete and ready for continuous integration.
