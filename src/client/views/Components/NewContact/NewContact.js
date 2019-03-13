import React, { Component } from 'react'
import { EditContactCheck } from '../index';

export default class NewContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioType: "Number"
    }
    this.addNewUser = this.addNewUser.bind(this)
    this.setRadioType = this.setRadioType.bind(this)
  }

  addNewUser = (event) => {
    event.preventDefault();
    let firstName = event.target.firstName.value
    let lastName = event.target.lastName.value
    let number = event.target.number.value
    let tag = event.target.tagType.value

    tag === "Other" ? tag = event.target.tagTypeText.value : tag

    let uniqueId = docId();
    console.log(uniqueId)
    var contact = {
      "id": uniqueId,
      "createdBy": "Unknown",
      "firstName": firstName,
      "lastName": lastName,
      "dataLable": [{ "tag": tag, "data": number }]
    }
    this.setState({ showAddItem: false })
    this.props.set({ contact })
  }

  setRadioType(type) {
    this.setState({ radioType: type })
  }

  render() {
    return (
      <form onSubmit={this.addNewUser}>
        <br />
        <input name="firstName" type="text" placeholder="First Name" required="required"></input><br />
        <input name="lastName" type="text" placeholder="last Name" required="required"></input><br /><br />
        <EditContactCheck />
          <button type="submit" >Submit</button>
      </form>
    )
  }
}

const docId = () => {
  let text = '';

  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 20; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}