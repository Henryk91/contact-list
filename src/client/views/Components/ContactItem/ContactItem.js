import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class ContactItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      editingItem: false,
    }
    this.deleteItem = this.deleteItem.bind(this)
    // this.editItem = this.editItem.bind(this)
  }

  deleteItem = (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to permanently delete this?")) {
      this.setState({ item: null })
    }
  }

  editItem = () => {
    this.setState({ editingItem: true })
  }

  submitChange = (e) => {
    e.preventDefault();
    let update = e.target.item.value
    this.props.set({item: update, index: this.props.index , type: this.props.type}) 
    this.setState({ editingItem: false , item: update})
  }

  editItemBox(item) {

    return (
      <form onSubmit={this.submitChange}>
        <input name="item" type="text" defaultValue={item}></input>
        <button type="submit">Submit</button>
        <button onClick={() => this.setState({ editingItem: false })}>Cancel</button>
      </form>
    )
  }

  displayItemBox(item){
    return (
      <div>
        <p className="contactItem">{item}</p>
        <button className="contactItem" onClick={() => this.setState({ editingItem: true })}>Edit</button>
        <button className="contactItem" onClick={this.deleteItem}>Del</button>
        <br />
      </div>
    )
  }

  render() {
    const item = this.state.item
    let editing = this.state.editingItem
    return (
      <div key={item}>
        {item ? <div>{editing ? this.editItemBox(item) : this.displayItemBox(item)}</div> : null}
        
      </div>
    )
  }
}
