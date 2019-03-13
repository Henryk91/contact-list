import React, { Component } from 'react'

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: false,
        };
        this.search = this.search.bind(this)
    }
    componentDidMount(){

       
    }
    search = () => {

        let contact = this.props.contacts
        if (contact) {
            let searchTerm = this.title.value
            contact = contact.filter((val) => {
                let firtName = val.firstName.toLowerCase()
                let lastName = val.lastName.toLowerCase()
                let term = searchTerm.toLowerCase()
                return firtName.includes(term) || lastName.includes(term)
            })
        }
        localStorage.setItem("user", this.title2.value);
        this.props.set({ filteredContacts: contact, user: this.title2.value })
    }

    render() {
        var user = localStorage.getItem("user")

        return (
            <header>
                <input
                    id="userNameBox"
                    type="text" ref={(c) => this.title2 = c}
                    aria-label="User Name"
                    onKeyUp={this.search}
                    defaultValue={user}
                    placeholder="Add Username" >
                </input><br />
                <input
                    id="searchBox"
                    aria-label="Search Name"
                    onKeyUp={this.search}
                    type="text" ref={(c) => this.title = c}
                    placeholder="Search By Name..." >
                </input>
                {this.state.search ? <div className="loader"></div> : null}
            </header>
        )
    }
}

