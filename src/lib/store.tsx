import { combineReducers, configureStore } from '@reduxjs/toolkit';
import editFormReducer from '../lib/feature/formDataSlice';

const rootReducer = combineReducers({
  FormData: editFormReducer,
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
