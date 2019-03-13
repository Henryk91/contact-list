import React, { Component } from 'react';

export default class EditContactCheck extends Component {
    constructor(props) {
      super(props);
      this.state = {
        radioType: "Number"
      }
      this.setRadioType = this.setRadioType.bind(this)
    }
    setRadioType(type) {
      this.setState({ radioType: type })
    }
  
    render() {
      let radioType = this.state.radioType
      return (

        <div>
          <div className="radioBox">
            <label>Number</label>
            <label>Email </label>
            <label>Other</label><br />
            <input onClick={() => this.setRadioType("Number")} type="radio" name="tagType" value="Number" defaultChecked/>
            <input onClick={() => this.setRadioType("Email")} type="radio" name="tagType" value="Email" />
            <input onClick={() => this.setRadioType("Other")} type="radio" name="tagType" value="Other" />
          </div>
  
          {radioType === "Other" ?
            <div>
              <input name="tagTypeText" type="text" placeholder="Add Other Here" /><br />
              <input name="number" type="text" placeholder="eg: Company, Note"></input>
              <br /></div> :
            null
          }
          {radioType === "Number" ?
            <div>
              <input name="number" type="number" placeholder="Add Number"></input>
              <br /><br /></div> :
            null
          }
          {radioType === "Email" ?
            <div> <input name="number" type="email" placeholder="Add Email"></input>
              <br /><br /></div> :
            null
          }
        </div>
      )
    }
  }
  
