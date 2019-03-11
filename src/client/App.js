
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { History, Home, Detailed, SearchBar , ContactDetail , NewContact} from './views/Components/index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: null,
      limitContacts: null,
      filteredContacts: null
    }
    this.addNewContact = this.addNewContact.bind(this)
    this.updateContact = this.updateContact.bind(this)
    this.setFilterContact = this.setFilterContact.bind(this)
  }

  componentWillMount() {

    fetch(`/api/contact`)
      .then(res => res.json())
      .then(data => {

        this.setState({ contacts: data , filteredContacts: data})

      })
      .catch((error) => {
        next(error)
      });

  }

  addNewContact = (val) =>{
    let contacts = this.state.contacts;
    console.log(val)
    let updatedContact = [...contacts, val.contact]
    // this.setState({contacts: })
    this.setState({ contacts: updatedContact , filteredContacts: updatedContact})
  }

  updateContact = (update) => {

    let contacts = this.state.contacts;

    let index = contacts.indexOf((val) => val.id === update.id)
    contacts[index] = update

    this.setState({contacts})
    console.log(update)
  }


  setFilterContact(val){
    console.log(val.filteredContacts)
    this.setState({filteredContacts: val.filteredContacts})
  }

  render() {
    
    return (
      <Router>
        <div>
          <header>
            <SearchBar set={this.setFilterContact} contacts={this.state.contacts}/>
            <nav className="bigScreen" id="links">
              <Link className="yellowLink" to="/" title="Contact List">Contacts</Link>
              <Link className="yellowLink" to={`/new-contact/`}>
                    Add Contact
                </Link>
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
