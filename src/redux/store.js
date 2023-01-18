import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
import { contactsReducer } from './contactsSlice';
import { filtersReducer } from './filterSlice';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['contacts']
//   //     or
//   // blacklist: ['filter'],
// };


const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filtersReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
})

// export const store = configureStore({
//   reducer: persistedReducer,
  
//   middleware: getDefaultMiddleware =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// })

// export const persistor = persistStore(store);

export default store;