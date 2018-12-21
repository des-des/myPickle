import React, { Component } from "react"
import axios from "axios"

export default class SupportDetails extends Component {
  state = {
    profileId: "",
    supportAnswers: null,
    supportQuestions: null,
  }

  componentDidMount() {
    const pathName = window.location.pathname
    const id = pathName.split("/")[3]

    axios
      .get(`/get-questions/support-details/${id}`)
      .then(questions => this.setState({ supportQuestions: questions.data }))
      .catch(err => console.log(err))

    axios
      .get(`/edit-profile/support/${id}`)
      .then(supportDetails => this.setState({ supportAnswers: supportDetails.data, profileId: id }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <React.Fragment>
        <h4>Hello</h4>
        <p>{this.state.profileId}</p>
        <div>{/* {this.state.supportDetails.filter(que)} */}</div>
      </React.Fragment>
    )
  }
}