import React from 'react';

import ContactsList from './ContactsList'
import Header from "./Header";

export default (props) => {


    const sortByName = (a, b) => {
        if (props.sortContactValue === 'ascending') {

            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
        } else {

            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
        }
        return 0;
    }

    const contactList = props.contacts
        .filter(contact => {
            return contact.name.toLowerCase().indexOf(props.filterText.toLowerCase()) >= 0;
        })
        .sort(sortByName)
        .map((contact, index) => {
            return (
                <li key={index}>
                    <h4>{contact.name}</h4>
                    <p>{contact.number}</p>
                    <address>{contact.address}</address>
                    <button onClick={function () {
                        props.removeContact(contact.name)
                    }}>Remove contact X
                    </button>
                </li>
            )
        })

    const contacts = props.loading ? 'loading...' : contactList;

    return (
        <React.Fragment>
            <Header
                title={props.title}
                filterUpdate={props.filterUpdate}
                sortContactValue={props.sortContactValue}
                sortContacts={props.sortContacts}
            />
            <ContactsList contactsSorted={contacts}/>
        </React.Fragment>
    );
}