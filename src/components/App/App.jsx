import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContact, deleteContact, fetchContacts} from 'redux/operations';
import { filterContacts } from 'redux/filterSlice';
import { getContacts, getFilterResults } from 'redux/selectors';

import { Contacts } from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import { Container } from './App.styled';
import Loader from 'components/Loader/Loader';


const App = () => {
  const dispatch = useDispatch(); 
  const { contacts, isLoading, error } = useSelector(getContacts);
  const filter = useSelector(getFilterResults); 
  console.log(contacts); 
  
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch]);  

  const formSubmitHandler = (contact, number) => { 
    const repeatCheck = contacts.find(item => item.name.toLowerCase() === contact.name.toLowerCase());
    
    if (repeatCheck) {
      toast.warn(`Name  ${contact.name}  is alredy in contacts!`);
      return;
    }
    dispatch(addContact(contact, number));
    toast.success(`You have added  ${contact.name}  in contacts`);
  }

  
  const handleDelete = item => {
    console.log(item);
    dispatch(deleteContact(item)); 
    toast.error(`Contact is removed from List.`);   
   }

  const changeFilter = event => {
    dispatch(filterContacts(event.currentTarget.value))
  };  
  
const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();   

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }  
    
    return (
      <Container>
        <PhonebookForm onSubmit={formSubmitHandler} />
        {isLoading && <Loader />}
        {error && <h1 style={{ color: "orangered" }}>{error}</h1>}
        <Filter
          value={filter}
          onFilter={changeFilter} />
        <Contacts
          // contactsFiltred={contacts}
          contactsFiltred={getVisibleContacts()}
          handleDelete={handleDelete}
        ></Contacts>
        
        {contacts.length === 0 && <h4 style={{ color: "", marginTop: "14px" }}>No contacts in Phonebook</h4>}
        <ToastContainer autoClose={2000} position="top-right" theme="dark" />
      </Container>
  )
}

export default App