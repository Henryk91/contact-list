import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                {list ?
                    <div><br />{createList(list)}</div> :
                    <h3>Please add your name at the top then <br /> click My Contacts or All Contacts.</h3>
                }
            </div>
        );
    }
}
const createList = (contacts) => {
    let list = null
    if (contacts) {
        list = contacts.map((person) => {
            return (
                <div className="listNameButton" key={person.id}>
                    <Link style={{ textDecoration: 'none' }} to={`/contacts/${person.id}`}>
                        <h3>{person.firstName} {person.lastName}</h3>
                    </Link>
                </div>)
        })
    }
    return list
}
