'use client';
import { AppStore, makeStore } from '@/src/lib/store';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  const initialized = useRef(false);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    initialized.current = true;
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
