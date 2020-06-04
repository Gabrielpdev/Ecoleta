/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { Reducer } from 'redux';

export default (reducers: Reducer) => {
  const persistedReducer = persistReducer(
    {
      key: 'ecoleta',
      storage,
      whitelist: ['auth', 'user'],
    },
    reducers,
  );

  return persistedReducer;
};
