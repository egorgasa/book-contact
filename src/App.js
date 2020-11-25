import React, {Component} from 'react';
import AddContact from "./components/AddContact";
import ContactsContainer from "./components/ContactsContainer";
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            loading: true,
        }
    }

    componentDidMount() {
        fetch(' http://localhost:3000/contacts')
            .then(res => res.json())
            .then(
                (contacts) => {

                    this.setState({
                        contacts: contacts,
                        loading: false
                    });

                },
                (error) => {
                    this.setState({
                        contacts: ['error loading contacts'],
                        loading: false,

                    });
                }
            )
    }

    removeContact = contactToBeRemoved => {
        let filteredContacts = this.state.contacts.filter((contact) => {
            return contact.name !== contactToBeRemoved;
        });

        this.setState({
            contacts: filteredContacts
        });
    };

    render() {

        return (
            <Router>
                <React.Fragment>
                    <Route exact path='/' render={() => (
                        <ContactsContainer
                            removeContact={this.removeContact}
                            contacts={this.state.contacts}
                        />)}/>
                    <Route exact path='/add/' render={({history}) => (
                        <AddContact addContact={(contact) => {
                            this.setState(currentState => {
                                return {
                                    contacts: [contact, ...currentState.contacts]
                                };
                            });
                            history.push('/');
                        }}/>
                    )}/>
                </React.Fragment>
            </Router>

        )

    }
}

export default App;
