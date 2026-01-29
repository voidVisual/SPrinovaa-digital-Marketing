/**
 * Test Utilities and Helpers
 * Provides common testing utilities and mocks
 * Note: This file is not a test file, just utilities
 */

// Mock Next.js router
export const mockUseRouter = () => ({
  push: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
});

// Mock Next.js usePathname hook
export const mockUsePathname = (pathname: string = '/') => {
  return pathname;
};

// Mock Next.js useSearchParams hook
export const mockUseSearchParams = (params: Record<string, string> = {}) => {
  const searchParams = new URLSearchParams(params);
  return searchParams;
};

// Common test props for components
export const mockComponentProps = {
  className: 'test-class',
  'data-testid': 'test-element',
};

// Mock fetch responses
export const createMockFetchResponse = (data: any, status: number = 200) => {
  return Promise.resolve({
    status,
    ok: status >= 200 && status < 300,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
  } as Response);
};

// Wait for async operations
export const waitFor = async (callback: () => void, options = {}) => {
  const maxWaitTime = 1000;
  const pollInterval = 50;
  let elapsedTime = 0;

  while (elapsedTime < maxWaitTime) {
    try {
      callback();
      return;
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));
      elapsedTime += pollInterval;
    }
  }

  throw new Error('Timeout waiting for condition');
};
