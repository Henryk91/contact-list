
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home, SearchBar, ContactDetail, NewContact } from './views/Components/index';
import { getAllContacts, getMyContacts, saveNewContact, updateContact } from '../client/views/Helpers/requests'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
      limitContacts: null,
      filteredContacts: null,
      user: ''
    }
    this.addNewContact = this.addNewContact.bind(this)
    this.updateContact = this.updateContact.bind(this)
    this.setFilterContact = this.setFilterContact.bind(this)
    this.getAllContacts = this.getAllContacts.bind(this)
    this.getMyContacts = this.getMyContacts.bind(this)
  }

  componentWillMount() {
    var user = localStorage.getItem("user")
    user !== null ? this.setState({ user }) : null
  }

  addNewContact = (val) => {
    let contacts = this.state.contacts;
    let user = this.state.user;

    user !== '' ? val.contact.createdBy = user : null
    let updatedContact = [...contacts, val.contact]
    saveNewContact(val.contact, () => alert("setn"))
    this.setState({ contacts: updatedContact, filteredContacts: updatedContact })
  }

  updateContact = (update) => {
    let contacts = this.state.contacts;
    let index = contacts.indexOf((val) => val.id === update.id)
    contacts[index] = update
    updateContact(update, () => alert("setn"))
    this.setState({ contacts, filteredContacts: contacts })
  }

  getAllContacts() {
    let user = this.state.user
    if (user !== '') {
      getAllContacts((res) => {
        res.sort(compareSort)
        this.setState({ contacts: res, filteredContacts: res })
      })
    } else {
      alert("Please add username at the top")
    }
  }

  getMyContacts() {
    let user = this.state.user
    if (user !== '') {
      getMyContacts(user, (res) => {
        res.sort(compareSort)
        this.setState({ contacts: res, filteredContacts: res })
      })
    } else {
      alert("Please add username at the top")
    }
  }

  setFilterContact(val) {
    this.setState({ filteredContacts: val.filteredContacts, user: val.user })
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <SearchBar set={this.setFilterContact} contacts={this.state.contacts} />
            <nav className="bigScreen" id="links">
              <Link
                onClick={this.getMyContacts}
                className="navLink"
                to="/"
                title="Contact List">
                My Contacts
              </Link>
              <Link
                onClick={this.getAllContacts}
                className="navLink"
                to="/"
                title="Contact List">
                All Contacts
              </Link>
              <span>
                <Link
                  id="lastNavLink"
                  className="navLink"
                  to={`/new-contact/`}>
                  Add Contact
              </Link>
              </span>
            </nav>
          </header>
          <Route
            exact path='/'
            component={(props) => <Home {...props} contacts={this.state.filteredContacts} />}
          />
          <Route
            exact path='/contacts/:id'
            render={(props) => <ContactDetail {...props} set={this.updateContact} contacts={this.state.contacts} />}
          />
          <Route
            exact path='/new-contact'
            component={() => <NewContact set={this.addNewContact} />}
          />
        </div>
      </Router>
    )
  }
}


let compareSort = (a, b) => {

  const nameA = a.firstName.toUpperCase();
  const nameB = b.firstName.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}