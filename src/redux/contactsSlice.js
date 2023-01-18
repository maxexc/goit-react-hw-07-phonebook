import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from './operations';
// import { nanoid } from "nanoid";
// import { toast } from "react-toastify";
//
// import  ContactsData from 'components/ContactsData.json'


const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};


const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        items: [],
        isLoading: false,
        error: null
    },
    extraReducers: {

        // Fetch All Contacts
        [fetchContacts.pending]: handlePending,
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.contacts = action.payload;
        },
        [fetchContacts.rejected]: handleRejected,

        //  Add New Contact
        [addContact.pending]: handlePending,
        [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.contacts.push(action.payload);
        },
        [addContact.rejected]: handleRejected,

        // Delete Contact
        [deleteContact.pending]: handlePending,
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            const index = state.contacts.findIndex(
                contact => contact.id === action.payload.id
            );
            state.contacts.splice(index, 1);
        },
        [deleteContact.rejected]: handleRejected,
  },
});
  
// export const { addContact, deleteContact } = contactsSlise.actions;
export const contactsReducer = contactsSlice.reducer;
  
export const getContacts = state => state.contacts;
