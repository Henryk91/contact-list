import React, { Component } from 'react'
import { getCoordinatesFromName, getGeoloc, getWeather } from '../../Helpers/requests'
export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: false,
        };
        this.search = this.search.bind(this)
    }
    search = (e) => {
        let contact = this.props.contacts
        let searchTerm = this.title.value
        contact = contact.filter((val) => val.name.toLowerCase().includes(searchTerm.toLowerCase()))
        this.props.set({ filteredContacts: contact , user: this.title2.value})
        console.log(this.title2.value)
    }

    render() {
        return (
            <header>
                <button
                    id="geoButton"
                    className="searchButton blueHover"
                    // onClick={this.useGeoloc}
                    title="Geo Locate">
                    <i className="fas fa-map-marker-alt"></i>
                </button>
                <input
                    id="userNameBox"
                    type="text" ref={(c) => this.title2 = c}
                    aria-label="User Name"
                    onKeyUp={this.search}
                    placeholder="Add Username" >
                </input><br /><br />
                <input
                    id="locationBox"
                    aria-label="Search Name"
                    onKeyUp={this.search}
                    type="text" ref={(c) => this.title = c}
                    placeholder="Search By Name..." >
                </input>
                <button
                    id="goButton"
                    className="searchButton blueHover"
                    // onClick={this.useGeoloc}
                    title="Geo Locate">
                    <i className="fas fa-map-marker-alt"></i>
                </button>
                {this.state.search ? <div className="loader"></div> : null}
            </header>
        )
    }
}
