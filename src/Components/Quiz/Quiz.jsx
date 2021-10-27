import React, { Component } from 'react'
import ActiveQuiz from '../ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../FinishedQuiz/FinishedQuiz'
import c from './Quiz.css'
import Loader from '../UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizByID, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'

class Quiz extends Component {
    async componentDidMount() {
       this.props.fetchQuizByID(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={c.Quiz}>
                {
                    this.props.isFinished
                        ? null
                        : <h1>Выберите один вариант ответа:</h1>
                }

                {
                    this.props.loading || !this.props.quiz
                        ? <Loader />

                        : this.props.isFinished
                            ? <FinishedQuiz
                                onRetry={this.props.retryQuiz}
                                results={this.props.results}
                                quiz={this.props.quiz}
                                quizLength={this.props.quiz.length}
                            />
                            : <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                answerState={this.props.answerState}
                            />
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
    }

}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizByID: id => dispatch(fetchQuizByID(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)