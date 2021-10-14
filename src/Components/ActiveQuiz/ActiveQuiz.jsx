import React from 'react'
import c from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
    return (
        <div className={c.ActiveQuiz}>
            <div className={c.ActiveQuiz__data}>
                <p>
                    <strong>{props.answerNumber}</strong>.
                    <span> {props.question}</span>
                </p>
            </div>

            <AnswersList
                key={props.answerNumber}
                onAnswerClick={props.onAnswerClick}
                answers={props.answers}
                answerState={props.answerState}
            />

            <span className={c.ActiveQuiz__counter}>{props.answerNumber} из {props.quizLength}</span>
        </div>
    )
}

export default ActiveQuiz
