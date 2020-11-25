import React, {Component} from 'react';
import SortAndSearchContacts from "./SortAndSearchContacts";
import {Link} from "react-router-dom";

export default class Header extends Component {


    render() {
        return (
            <div className='header'>
                <h1>Phone Book</h1>
                <div>
                    <SortAndSearchContacts
                        filterUpdate={this.props.filterUpdate}
                        sortContactValue={this.props.sortContactValue}
                        sortContacts={this.props.sortContacts}
                    />
                </div>
                <Link exact
                      to='/add/'
                      className='c'
                >Add contact
                </Link>
            </div>

        );
    }
}
