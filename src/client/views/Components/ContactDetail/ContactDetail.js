import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { EditContactCheck } from '../index';
import { ContactItem } from '../index'
export default class ContactDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: null,
      showAddItem: false,
      editName: false,
      number: null,
      email: null,
      tags: null
    }
    this.addItem = this.addItem.bind(this)
    this.submitNewItem = this.submitNewItem.bind(this)
    this.getContactByTag = this.getContactByTag.bind(this)
    this.editNameBox = this.editNameBox.bind(this)
  }

  componentDidMount() {
    let person = null
    if (this.props.match) {
      person = getPerson(this.props.contacts, this.props.match)
      this.refreshItems(person)
    }
  }

  refreshItems = (person) => {
    if (person) {
      let tags = this.getContactByTag(person.dataLable)
      this.setState({ person, tags })
    }
  }

  submitNewItem = (event) => {
    event.preventDefault();
    let person = this.state.person
    let number = event.target.number.value
    let tag = event.target.tagType.value

    tag === "Other" ? tag = event.target.tagTypeText.value : tag

    person.dataLable.push({ tag: tag, data: number })
    this.props.set({ person })
    console.log(event.target.number.value)

    this.refreshItems(person)
    this.setState({ showAddItem: false })
  }

  addItem() {
    return (
      <form onSubmit={this.submitNewItem}>
        <EditContactCheck />
        <button type="submit">Add</button>
        <button onClick={() => this.setState({ showAddItem: false })}>Cancel</button>
      </form>
    )
  }

  updateContactItem = (val) => {

    let person = this.state.person
    let index = person.dataLable.findIndex((item) => item.tag === val.type && item.data === val.oldItem)
    if (!val.delete) {
      person.dataLable[index].data = val.item
    } else {
      person.dataLable.splice(index, 1)
    }
    this.props.set({ person })
  }

  submitNameChange = (e) => {
    e.preventDefault();
    let firstName = e.target.firstName.value
    let lastName = e.target.lastName.value

    let person = this.state.person
    person.firstName = firstName;
    person.lastName = lastName;

    this.setState({ person, editName: false })
    this.props.set({ person })
  }

  editNameBox(firstName, lastName) {
    return (
      <form onSubmit={this.submitNameChange}>
        <input name="firstName" type="text" defaultValue={firstName}></input><br />
        <input name="lastName" type="text" defaultValue={lastName}></input><br />
        <button type="submit">Submit</button>
        <button onClick={() => this.setState({ editName: false })}>Cancel</button>
      </form>
    )
  }

  getContactByTag = (items) => {
    let sort = {}
    items.forEach((tag) => {
      sort[tag.tag] ? sort[tag.tag].push(tag.data) : sort[tag.tag] = [tag.data]
      console.log(tag.tag)
    })

    let propertyArray = Object.keys(sort);
    let all = propertyArray.map((prop, i) => {

      let bunch = sort[prop].map((item, ind) => {
        return (
          <ContactItem key={item + prop} item={item} set={this.updateContactItem} type={prop} index={ind} />
        )
      })
      return (
        <div className="detailedBox" key={prop + i}>
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
    let tags = this.state.tags
    let editName = this.state.editName
    let editNameB = null;

    person ? editNameB = this.editNameBox(person.firstName, person.lastName) : editNameB = null

    return (
      <div >
        <Link id="detailBackButton" to="/" title="Contact List">Back</Link>
        {person ?
          <div key={person.id}>

            {editName ?
              <div>{editNameB}</div> :
              <div >
                <h1>{person.firstName} {person.lastName}</h1>
                <button
                  className="detailEditBoxButton"
                  onClick={() => this.setState({ editName: true })}>
                  Edit Name
                </button>
              </div>
            }
            <button
              className="detailEditBoxButton"
              onClick={() => this.setState({ showAddItem: true })}>
              Add Item
            </button>
            {showAddItem ? <div> {this.addItem()}</div> : null}

            {tags ? <div> {tags} <br /></div> : null}
          </div> :
          null
        }
      
      </div>
    )
  }
}

const getPerson = (contacts, propForId) => {
  return contacts ? contacts.filter((val) => val.id == propForId.params.id)[0] : null
}