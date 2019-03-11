import React, { Component } from 'react';
import { ContactDetail } from '../index'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: null,
            list: null
        }
    }

    render() {
        let list = this.props.contacts

        return (
            <div id="home">
                
                {list ? <div>{createList(list)}</div> : null}
            </div>
        );
    }
}

const createList = (contacts) => {
    let list = null
    if (contacts) {
        list = contacts.map((person) => {
            var p = person.name

            return (
                <div key={person.id}>
                    <Link style={{ textDecoration: 'none' }} to={`/contacts/${person.id}`}>
                        {/* <h3>{person.name}</h3> */}
                        <h3>{person.firstName} {person.lastName}</h3>
                    </Link>
                </div>)
        })
    }
    console.log(list)
    return list
}
