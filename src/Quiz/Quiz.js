import React, { Component } from 'react'
import ActiveQuiz from '../ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../ActiveQuiz/FinishedQuiz/FinishedQuiz'
import c from './Quiz.css'

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого газа в атмосфере Земли больше всего?',
                rightAnswerId: 3,
                answers: [
                    { text: 'Кислород', id: 1 },
                    { text: 'Углекислый газ', id: 2 },
                    { text: 'Азот', id: 3 },
                    { text: 'Водород', id: 4 }
                ]
            },
            {
                id: 2,
                question: 'Какой римской цифры не существует?',
                rightAnswerId: 2,
                answers: [
                    { text: '1 000', id: 1 },
                    { text: '0', id: 2 },
                    { text: '10 000', id: 3 },
                    { text: '100 000', id: 4 }
                ]
            },
            {
                id: 3,
                question: 'Чего боятся люди, которые страдают алекторофобией?',
                rightAnswerId: 2,
                answers: [
                    { text: 'Собак', id: 1 },
                    { text: 'Кур', id: 2 },
                    { text: 'Бороды', id: 3 },
                    { text: 'Чеснок', id: 4 }
                ]
            },
            {
                id: 4,
                question: 'В какой стране более одной столицы?',
                rightAnswerId: 1,
                answers: [
                    { text: 'ЮАР', id: 1 },
                    { text: 'Алжир', id: 2 },
                    { text: 'Тунис', id: 3 }
                ]
            },
            {
                id: 5,
                question: 'Мозг используется только на 10%. Правда или ложь?',
                rightAnswerId: 2,
                answers: [
                    { text: 'Правда', id: 1 },
                    { text: 'Ложь', id: 2 }
                ]
            },
            {
                id: 6,
                question: 'Планета Венера названа в честь имени человека. Правда или ложь?',
                rightAnswerId: 2,
                answers: [
                    { text: 'Правда', id: 1 },
                    { text: 'Ложь', id: 2 }
                ]
            },
            {
                id: 7,
                question: 'Назовите столицу Европейского Союза?',
                rightAnswerId: 4,
                answers: [
                    { text: 'Вена', id: 1 },
                    { text: 'Кельн', id: 2 },
                    { text: 'Париж', id: 3 },
                    { text: 'Брюссель', id: 4 }
                ]
            },
            {
                id: 8,
                question: 'Почему летом жарче, чем зимой?',
                rightAnswerId: 1,
                answers: [
                    { text: 'Из-за наклона земной оси', id: 1 },
                    { text: 'Потому что Земля ближе к Солнцу летом', id: 2 },
                    { text: 'Потому что Земля имеет эллиптическую орбиту', id: 3 },
                    { text: 'Летом активность Солцна больше', id: 4 }
                ]
            },
            {
                id: 9,
                question: 'Зачем Христофор Колумб в 1492 году отправился в плавание?',
                rightAnswerId: 2,
                answers: [
                    { text: 'Он хотел доказать, что Земля круглая', id: 1 },
                    { text: 'Он искал западный путь в Азию', id: 2 },
                    { text: 'Он искал Америку', id: 3 }
                ]
            },
            {
                id: 10,
                question: 'Кто автор Робинзона Крузо?',
                rightAnswerId: 3,
                answers: [
                    { text: 'Джек Лондон', id: 1 },
                    { text: 'Жюль Верн', id: 2 },
                    { text: 'Даниэль Дефо', id: 3 },
                    { text: 'Александр Дюма', id: 4 }
                ]
            },
        ]
    }


    onAnswerClickHandler = answerId => {
        // если answerState не null
        if (this.state.answerState) {
            // Достань 1 ключ из массива
            const value = Object.keys(this.state.answerState)[0]

            if (this.state.answerState[value] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            results[question.id] = 'success'

            this.setState({
                answerState: { [answerId]: 'success' },
                results
            })
        } else {
            results[question.id] = 'error'

            this.setState({
                answerState: { [answerId]: 'error' },
                results
            })
        }

        const timeout = window.setTimeout(() => {
            if (this.isQuizFinished()) {
                this.setState({
                    isFinished: true,
                })
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }
            window.clearTimeout(timeout)
        }, 1000)

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onRetryHandler =() => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: []
        })
    }

    render() {
        return (
            <div className={c.Quiz}>
                {
                    this.state.isFinished
                        ? null
                        : <h1>Выберите один вариант ответа:</h1>
                }

                {
                    this.state.isFinished
                        ? <FinishedQuiz
                            onRetry={this.onRetryHandler}
                            results={this.state.results}
                            quiz={this.state.quiz}
                            quizLength={this.state.quiz.length}
                        />
                        : <ActiveQuiz
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            answerState={this.state.answerState}
                        />
                }

            </div>
        )
    }
}

export default Quiz