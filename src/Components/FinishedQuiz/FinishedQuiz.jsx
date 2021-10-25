import React from 'react'
import Button from '../UI/Button/Button'
import c from './FinishedQuiz.css'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    const succesCounter = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)

    return (
        <div className={c.FinishedQuiz}>
            <h1>Вы ответили на все вопросы!</h1>
            <ul>
                {props.quiz.map((quizItem, i) => {
                    console.log(props.results)
                     const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        c[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={i}>
                            <strong>{i + 1}</strong>.
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>

            <p>Правильно {succesCounter} из {props.quizLength}</p>
            <Button onClick={props.onRetry} type="primary">Повторить</Button>
            
            <Link to="/">
                <Button type="success">Перейти в список квестов</Button>
            </Link>
        </div >
    )
}

export default FinishedQuiz