import { makeStore } from '@/src/lib/store';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

export function renderWithProviders(
  ui: React.ReactNode,
  {
    preloadedState = {},
    store = makeStore(preloadedState),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
