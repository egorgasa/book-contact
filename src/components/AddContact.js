import React, {Component} from 'react';


class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            address: ''
        }
    }


    onChange = event => {
        this.setState(
            {...this.state, [event.target.name]: event.target.value}
        )
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addContact(this.state);

    };

    render() {
        return (
            <React.Fragment>
                <h3>Add a new contact</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input name="name" type="text" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Number:</label>
                        <input name="number" type="number" onChange={this.onChange}/>
                    </div>
                    <div>
                        <label>Address:</label>
                        <input name="address" type="text" onChange={this.onChange}/>
                    </div>

                    <button type="submit"
                    > Add contact
                    </button>
                </form>
                <hr/>
            </React.Fragment>
        );
    }
}

export default AddContact;