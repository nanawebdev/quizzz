import React from "react"
import c from './AnswerItem.css'

const AnswersItem = props => {

    const cls = [c.AnswerItem]

    if(props.answerState) {
        cls.push(c[props.answerState])
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={()=>{ props.onAnswerClick(props.answer.id)}}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswersItem