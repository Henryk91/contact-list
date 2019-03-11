import React, { Component } from 'react'

export default class NewContact extends Component {
  constructor(props) {
    super(props);
    this.addNewUser = this.addNewUser.bind(this)
  }

  addNewUser = (event) => {
    event.preventDefault();
    let firstName = event.target.firstName.value
    let lastName = event.target.lastName.value
    let number = event.target.number.value
    let email = event.target.email.value
    console.log(event.target.firstName.value)  
    console.log(event.target.lastName.value)  
    console.log(event.target.numberType.value)    
    console.log(event.target.number.value)  
    console.log(event.target.emailType.value)  
    console.log(event.target.email.value)

    let uniqueId = docId();
    console.log(uniqueId)
    var contact = {
      "id": uniqueId,
      "addedBy" : "me",
      "name": firstName + " " + lastName,
      "firstName" : firstName,
      "lastName" : lastName,
      "number" : [number],
      "email" : [email]
    }
    this.setState({ showAddItem: false })
    this.props.set({contact})
  }

  render() {

    return (
      <form onSubmit={this.addNewUser}>
          <br />
          <input name="firstName" type="text" placeholder="First Name" required="required"></input><br />
          <input name="lastName" type="text" placeholder="last Name" required="required"></input><br /><br />
          <input name="numberType" type="text" placeholder="Number Type eg: Home"></input><br />
          <input name="number" type="text" placeholder="Number"></input><br /><br />
          <input name="emailType" type="text" placeholder="Email Type eg: Work"></input><br />
          <input name="email" type="email" placeholder="Email"></input><br />
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