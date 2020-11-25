import React, {Component} from 'react';

export default class SortAndSearchContacts extends Component {

    filterUpdate() {
        const searchValue = this.searchValue.value;
        this.props.filterUpdate(searchValue);
    }

    sortUpdate(event) {
        const sortValue = event.target.value;
        this.props.sortContacts(sortValue)

    }

    render() {

        return (
            <React.Fragment>
                <div>
                    <input
                        type="search"
                        placeholder="search"
                        ref={(TextSearch) => {
                            this.searchValue = TextSearch
                        }}
                        onChange={this.filterUpdate.bind(this)}
                    />
                </div>
                <div>
                    <label>Sort:</label>
                    <select onChange={this.sortUpdate.bind(this)} defaultValue={this.props.value}>
                        <option value={true}>Ascending</option>
                        <option value={false}>Descending</option>
                    </select>
                </div>
            </React.Fragment>
        )
    }
}

