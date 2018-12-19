import React, { Component } from "react"

import { CheckboxField } from "./Questions.style"

export default class CheckboxInput extends Component {
  render() {
    const { question, handleChange, answers, unanswered } = this.props
    const { questionText, _id: questionId, options, helperText, isRequired } = question
    console.log("Q", question)
    return (
      <React.Fragment>
        <CheckboxField>
          <header>
            <h4>
              {questionText}
              {isRequired ? " *" : ""}
            </h4>
            <p>{helperText}</p>
          </header>
          <div className="answers">
            {options.map(option => {
              const uniqueId = option + questionId
              return (
                <label htmlFor={uniqueId}>
                  <input
                    value={option}
                    type="checkbox"
                    id={uniqueId}
                    name={questionId}
                    onChange={handleChange}
                    checked={answers[questionId] && answers[questionId].includes(option)}
                  />
                  <span className="checkmark" />
                  <p>{option}</p>
                </label>
              )
            })}
          </div>
          {unanswered && unanswered.includes(questionId) ? (
            <div className="required">
              <p>Please answer this question</p>
            </div>
          ) : (
            ""
          )}
        </CheckboxField>
      </React.Fragment>
    )
  }
}
