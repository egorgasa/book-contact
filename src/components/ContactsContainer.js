import React, {Component} from 'react';
import Header from "./Header";
import ContactsList from './ContactsList'

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            sortContactValue: 'true',
        }
    }

    filterUpdate(SearchValue) {
        this.setState({
            filterText: SearchValue
        });
    }

    sortContacts = (SortValue) => {
        this.setState({
            sortContactValue: SortValue
        });
    };


    removeContact = contactToRemove => {
        let filteredContacts = this.state.contacts.filter((contact) => {
            return contact.name !== contactToRemove;
        });

        this.setState({
            contacts: filteredContacts
        });
    };

    render() {
        const sortByName = (a, b) => {
            if (this.state.sortContactValue === "true") {
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

        const contactList = this.props.contacts
            .filter(contact => {
                return contact.name.toLowerCase().includes(this.state.filterText.toLowerCase());
            })
            .sort(sortByName)
            .map((contact, index) => {
                return (
                    <li key={index}>
                        <h4>{contact.name}</h4>
                        <p>{contact.phone_number}</p>
                        <address>{contact.address}</address>
                        <button onClick={() => {
                            this.props.removeContact(contact.name)
                        }}>Remove contact X
                        </button>
                    </li>
                )
            })

        const contacts = this.props.loading ? 'loading...' : contactList;
        return (
            <div>
                <Header
                    filterUpdate={this.filterUpdate.bind(this)}
                    sortContactValue={this.state.sortContactValue}
                    sortContacts={this.sortContacts}
                />
                <ContactsList contactsSorted={contacts}/>
            </div>)
    }
}