import businessCardReducer from '@/src/lib/feature/businessCardDataSlice';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import editFormReducer from '../lib/feature/formDataSlice';

const rootReducer = combineReducers({
  FormData: editFormReducer,
  CardData: businessCardReducer,
});

export const makeStore = (preloadedState?: any) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
