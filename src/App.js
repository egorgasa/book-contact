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
            filterText: '',
            sortContactValue: 'ascending',
            loading: true,
        }
    }

    componentDidMount() {
        fetch(' http://localhost:3000/contacts')
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        contacts: result,
                        loading: false
                    });

                },
                (error) => {
                    this.setState({
                        contacts: ['error loading contacts'],
                        loading: false,
                        error
                    });
                }
            )
    }

    filterUpdate(value) {
        this.setState({
            filterText: value
        });
    }

    sortContacts = (value) => {
        this.setState({
            sortContactValue: value
        });
    };

    removeContact = contactToBeRemoved => {
        let filteredContacts = this.state.contacts.filter( (contact) =>{
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
                            filterUpdate={this.filterUpdate.bind(this)}
                            sortContacts={this.sortContacts}
                            contacts={this.state.contacts}
                            filterText={this.state.filterText}
                            sortContactValue={this.state.sortContactValue}
                            removeContact={this.removeContact}
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
