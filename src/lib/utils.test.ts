import { cn } from '@/lib/utils';

describe('Utility Functions - cn()', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2', 'py-1');
    expect(result).toBe('px-2 py-1');
  });

  it('should handle conditional classes', () => {
    const result = cn('px-2', false && 'py-1', true && 'text-lg');
    expect(result).toBe('px-2 text-lg');
  });

  it('should merge tailwind classes properly', () => {
    const result = cn('px-2 py-1', 'py-2');
    // tailwind-merge should resolve py-2 as the final padding-y value
    expect(result).toContain('px-2');
    expect(result).toContain('py-2');
    expect(result).not.toContain('py-1');
  });

  it('should handle empty inputs', () => {
    const result = cn('', 'px-2', '');
    expect(result).toBe('px-2');
  });

  it('should handle undefined and null', () => {
    const result = cn('px-2', undefined, null, 'py-1');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
  });

  it('should work with arrays', () => {
    const result = cn(['px-2', 'py-1'], 'text-lg');
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
    expect(result).toContain('text-lg');
  });

  it('should handle complex class combinations', () => {
    const result = cn(
      'px-2 py-1',
      'text-sm',
      { 'text-red-500': true, 'text-blue-500': false }
    );
    expect(result).toContain('px-2');
    expect(result).toContain('py-1');
    expect(result).toContain('text-sm');
    expect(result).toContain('text-red-500');
    expect(result).not.toContain('text-blue-500');
  });
});
