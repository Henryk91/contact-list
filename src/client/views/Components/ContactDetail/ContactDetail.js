import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import { ContactItem } from '../index'
export default class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: null,
      showAddItem: false,
      number: null,
      email: null,
      tags: null
    }
    this.addItem = this.addItem.bind(this)
    this.submitNewItem = this.submitNewItem.bind(this)
    this.contactItem = this.contactItem.bind(this)
    this.getContactByTag = this.getContactByTag.bind(this)
  }

  componentDidMount() {
    let person = getPerson(this.props.contacts, this.props.match)

    // var number = null;
    // var email = null;
    // if (person) {
    //   number = this.contactItem(person.number, "number")
    //   email = this.contactItem(person.email , "email")
    // } 

    // this.setState({person, number , email})
    this.refreshItems(person)
  }

  refreshItems = (person) => {

    if (person) {
      let tags = this.getContactByTag(person.dataLable)
      let number = this.contactItem(person.number, "number")
      let email = this.contactItem(person.email, "email")
      this.setState({ person, number, email , tags})
    }


  }


  submitNewItem = (event) => {
    event.preventDefault();
    let person = this.state.person
    let number = event.target.number.value
    let email = event.target.email.value
    let type = event.target.type.value
    if (email) {
      person.email.push(email)
    }
    if (number) {
      person.number.push(number)
    }
    console.log(type)
    person.dataLable.push({tag : type, data : number})
    this.props.set({ person })
    // console.log(event.target.type.value)  

    console.log(event.target.number.value)
    console.log(event.target.email.value)
    this.refreshItems(person)
    // this.setState({person , showAddItem: false })
    this.setState({ showAddItem: false })

  }
  addItem() {
    return (
      <form onSubmit={this.submitNewItem}>
        <input name="type" type="text" placeholder="Contact Type eg: Home" ></input><br />
        <input name="number" type="text" placeholder="Number" ></input><br />
        <input name="email" type="email" placeholder="Email"></input><br />
        <button type="submit">Add</button>
        <button onClick={() => this.setState({ showAddItem: false })}>Cancel</button>
      </form>
    )
  }

  updateContactItem = (val) => {

    let person = this.state.person
    person[val.type][val.index] = val.item

    this.props.set({ person })
    // console.log(person[val.type][val.index])
    // console.log(val.item)
    // console.log(val.index)
    // console.log(val.type)
  }


  contactItem = (items, type) => items.map((item, i) => {
    return (
      <div key={item + i}>
        <ContactItem item={item} set={this.updateContactItem} type={type} index={i} />
      </div>
    )
  })

  getContactByTag = (items) => {

    let sort = {}
    let filter = items.forEach((tag) => {
      sort[tag.tag] ? sort[tag.tag].push(tag.data) : sort[tag.tag] = [tag.data]
      console.log(tag.tag)
    })

    let propertyArray = Object.keys(sort);

    let all = propertyArray.map((prop, i) => {

      let bunch = sort[prop].map((item, ind) => {
        return (
          <div key={item + ind}>
            <ContactItem item={item} set={this.updateContactItem} type={prop} index={ind} />
          </div>
        )
      })

      return (
        <div key={prop + i}>
          <h3>{prop}:</h3>
          {bunch}
        </div>
      )

    })
    return all
  }


  render() {

    let person = this.state.person
    const showAddItem = this.state.showAddItem
    let num = this.state.number
    let email = this.state.email
    let tags = this.state.tags

    return (
      <div >

        {person ?
          <div key={person.id}>
            {/* <h1>{person.name}</h1> */}
            <h1>{person.firstName} {person.lastName}</h1>
            <button onClick={() => this.setState({ showAddItem: true })}>Add Item</button>
            {showAddItem ? <div> {this.addItem()}</div> : null}

            {num ? <div> <h3>Numbers:</h3> {num}</div> : null}

            {email ? <div> <h3>Emails:</h3> {email}</div> : null}
            {tags ? <div> <h3>XXXXXXXXXXXXXXXXXX</h3> {tags}</div> : null}
          </div> :
          <p>None</p>
        }

      </div>
    )
  }
}

// const contactItem = (items) => items.map((item, i) => {
//   return (
//     <div key={item + i}>
//       <ContactItem item={item} set={}/>
//     </div>
//   )
// })

const getPerson = (contacts, propForId) => {
  return contacts ? contacts.filter((val) => val.id == propForId.params.id)[0] : null
}