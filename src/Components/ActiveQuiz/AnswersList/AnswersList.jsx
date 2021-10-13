import React from "react"
import AnswersItem from "./AnswerItem/AnswerItem"
import c from './AnswersList.css'

const AnswersList = props => {
    console.log(props.answers)
    return (
        <ul className={c.AnswersList}>
            {props.answers.map((answer, index) => {
                return (
                    <AnswersItem
                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                        answerState={props.answerState ? props.answerState[answer.id] : null}
                    />
                )

            })}
        </ul>
    )
}

export default AnswersList