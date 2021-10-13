import React from 'react'
import c from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
    return (
        <div className={c.ActiveQuiz}>
            <p style={{display:'flex'}}>
                <strong>{props.answerNumber}</strong>.
                <span> {props.question}</span>
                <span className={c.ActiveQuiz__counter}>{props.answerNumber} из { props.quizLength }</span>
            </p>
            
            <AnswersList
                onAnswerClick={props.onAnswerClick}
                answers={props.answers}
                answerState={props.answerState}
            />
        </div>
    )
}

export default ActiveQuiz
