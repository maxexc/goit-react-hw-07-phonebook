// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { contactsReducer } from './contactsSlice';
// import { filtersReducer } from './filterSlice';

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filterReducer } from "./filterSlice";


const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
})


export default store;