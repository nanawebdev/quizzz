import axios from "../../axios/axios-quiz"
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_QUIZ } from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        }

        catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizByID(quizID) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await axios.get(`/quizes/${quizID}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))

        } catch (e) {
            dispatch(fetchQuizesError)
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        results,
        answerState
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz
        // если answerState не null
        if (state.answerState) {
            // Достань 1 ключ из массива
            const value = Object.keys(state.answerState)[0]

            if (state.answerState[value] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            results[question.id] = 'success'

            dispatch(quizSetState({
                [answerId]: 'success'
            }, results))

        } else {
            results[question.id] = 'error'

            dispatch(quizSetState({
                [answerId]: 'error'
            }, results))
        }

        const timeout = window.setTimeout(() => {
            if (isQuizFinished(state)) {
                dispatch(finishQuiz())
            } else {
                dispatch(quizNextQuestion(state.activeQuestion + 1))
            }
            window.clearTimeout(timeout)
        }, 1000)


    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}
