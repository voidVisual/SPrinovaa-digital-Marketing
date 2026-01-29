import { reducer } from '@/hooks/use-toast';

describe('Toast Hook - Reducer', () => {
  const initialState = { toasts: [] };

  it('should handle ADD_TOAST action', () => {
    const toast = {
      id: '1',
      title: 'Test Toast',
      description: 'Test Description',
      open: true,
    };

    const result = reducer(initialState, {
      type: 'ADD_TOAST',
      toast,
    });

    expect(result.toasts).toHaveLength(1);
    expect(result.toasts[0]).toEqual(toast);
  });

  it('should limit toasts to TOAST_LIMIT (1)', () => {
    let state = initialState;

    const toast1 = { id: '1', title: 'Toast 1', open: true };
    state = reducer(state, { type: 'ADD_TOAST', toast: toast1 });

    const toast2 = { id: '2', title: 'Toast 2', open: true };
    state = reducer(state, { type: 'ADD_TOAST', toast: toast2 });

    // Should only keep the most recent toast
    expect(state.toasts).toHaveLength(1);
    expect(state.toasts[0].id).toBe('2');
  });

  it('should handle UPDATE_TOAST action', () => {
    const initialToastState = {
      toasts: [
        {
          id: '1',
          title: 'Original Title',
          open: true,
        },
      ],
    };

    const result = reducer(initialToastState, {
      type: 'UPDATE_TOAST',
      toast: {
        id: '1',
        title: 'Updated Title',
      },
    });

    expect(result.toasts[0].title).toBe('Updated Title');
  });

  it('should handle DISMISS_TOAST action with specific toastId', () => {
    const initialToastState = {
      toasts: [
        {
          id: '1',
          title: 'Toast 1',
          open: true,
        },
      ],
    };

    const result = reducer(initialToastState, {
      type: 'DISMISS_TOAST',
      toastId: '1',
    });

    expect(result.toasts[0].open).toBe(false);
  });

  it('should handle DISMISS_TOAST action without toastId (dismiss all)', () => {
    const initialToastState = {
      toasts: [
        {
          id: '1',
          title: 'Toast 1',
          open: true,
        },
      ],
    };

    const result = reducer(initialToastState, {
      type: 'DISMISS_TOAST',
    });

    expect(result.toasts[0].open).toBe(false);
  });

  it('should handle REMOVE_TOAST action with specific toastId', () => {
    const initialToastState = {
      toasts: [
        {
          id: '1',
          title: 'Toast 1',
          open: false,
        },
        {
          id: '2',
          title: 'Toast 2',
          open: false,
        },
      ],
    };

    const result = reducer(initialToastState, {
      type: 'REMOVE_TOAST',
      toastId: '1',
    });

    expect(result.toasts).toHaveLength(1);
    expect(result.toasts[0].id).toBe('2');
  });

  it('should handle REMOVE_TOAST action without toastId (remove all)', () => {
    const initialToastState = {
      toasts: [
        {
          id: '1',
          title: 'Toast 1',
          open: false,
        },
        {
          id: '2',
          title: 'Toast 2',
          open: false,
        },
      ],
    };

    const result = reducer(initialToastState, {
      type: 'REMOVE_TOAST',
    });

    expect(result.toasts).toHaveLength(0);
  });

  it('should not modify toast not being updated', () => {
    const initialToastState = {
      toasts: [
        {
          id: '1',
          title: 'Toast 1',
          open: true,
        },
        {
          id: '2',
          title: 'Toast 2',
          open: true,
        },
      ],
    };

    const result = reducer(initialToastState, {
      type: 'UPDATE_TOAST',
      toast: {
        id: '1',
        title: 'Updated Toast 1',
      },
    });

    expect(result.toasts[1].title).toBe('Toast 2');
    expect(result.toasts[0].title).toBe('Updated Toast 1');
  });
});
