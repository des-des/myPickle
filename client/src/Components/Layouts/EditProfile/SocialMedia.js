import React, { Component } from "react"
import axios from "axios"
// import swal from "sweetalert"

// import styled components
import { Intro } from "../../Common/Headings"
import { Button } from "../../Common/Buttons"

// import common components
import QuestionSection from "../../Common/Questions/QuestionSection"

// import util functions
import handleChangeUtil from "../../../Utils/handleChangeUtil"
import updateProfileUtil from "../../../Utils/updateProfileUtil"
import setAuthToken from "../../../Utils/setAuthToken"

export default class SocialMedia extends Component {
  state = {
    profileId: "",
    socialAnswers: null,
    socialQuestions: null,
    unanswered: [],
  }

  componentDidMount() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken)
      // get questions for the support-details section
      axios
        .get(`/get-questions/social-media`)
        .then(questions => this.setState({ socialQuestions: questions.data }))
        .catch(err => console.log(err))

      // get the answers the user has provided for this section
      axios
        .get(`/edit-profile/social-media`)
        .then(socialDetails =>
          this.setState({
            socialAnswers: socialDetails.data.questions,
            profileId: socialDetails.data.profileId,
          })
        )
        .catch(err => console.log(err))
    }
  }

  handleChange = option => {
    const { socialAnswers, unanswered } = this.state

    const { newAnswerState, newUnanswered } = handleChangeUtil(option, socialAnswers, unanswered)

    this.setState({ socialAnswers: newAnswerState, unanswered: newUnanswered })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { history } = this.props
    const { socialAnswers } = this.state

    updateProfileUtil(history, socialAnswers, "social-media")
  }

  handleBack = e => {
    e.preventDefault()
    const { history } = this.props

    history.push("/edit-profile")
  }

  render() {
    const { socialAnswers, socialQuestions, unanswered } = this.state

    if (socialQuestions === null || socialAnswers === null) {
      return (
        <Intro>
          <h2 className="tc mp-primary-color">Loading Your Details...</h2>
        </Intro>
      )
    }

    return (
      <React.Fragment>
        <Intro>
          <h2 className="tc mp-primary-color">Social Media</h2>
        </Intro>
        <QuestionSection
          questions={socialQuestions}
          handleChange={this.handleChange}
          answers={socialAnswers}
          unanswered={unanswered}
        />
        <div className="flex items-center justify-center w-100 mb4">
          <Button className="submit" onClick={this.handleBack}>
            Go Back
          </Button>
          <Button className="submit" onClick={this.handleSubmit}>
            Save Changes
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
