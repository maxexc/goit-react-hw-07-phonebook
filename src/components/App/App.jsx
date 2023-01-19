import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addContact, deleteContact, fetchContacts} from 'redux/operations';
import { getContacts } from 'redux/contactsSlice';
import { filterContacts, getFilterResults } from 'redux/filterSlice';

import { Contacts } from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import PhonebookForm from 'components/PhonebookForm/PhonebookForm';

import { Container } from './App.styled';



// import { addContact, deleteContact, getContacts } from 'redux/contactsSlice';

// import { addContact, deleteContact, fetchContacts } from 'redux/operations';



const App = () => {
  const dispatch = useDispatch();  
 
  const { contacts, isLoading } = useSelector(getContacts);
  const filter = useSelector(getFilterResults);    
  

  useEffect(() => {
        dispatch(fetchContacts());
        console.log('test');
  }, [dispatch]);
  console.log(getContacts);
  console.log(contacts); 
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts])

  const formSubmitHandler = (name, phone) => { 
    dispatch(addContact(name, phone));
  }
  
  const handleDelete = item => {
    console.log(item);
    dispatch(deleteContact(item));    
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
        {isLoading && <p>Loading...</p>}
        <Filter
          value={filter}
          onFilter={changeFilter} />
        <Contacts
          contactsFiltred={getVisibleContacts()}
          handleDelete={handleDelete}
        ></Contacts>
        <ToastContainer autoClose={2000} position="top-right" theme="light" />
      </Container>
  )
}

export default App
