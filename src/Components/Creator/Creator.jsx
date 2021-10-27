import React from 'react'
import c from './Creator.css'
import Button from './../UI/Button/Button'
import { createControl, validate, validateForm } from './../form/formFramework'
import Input from './../UI/Input/Input'
import Select from '../UI/Select/Select'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from './../../store/actions/create'


function createOptionControl(isRequired, number) {
    return createControl({
        label: `Введите ответ ${number}`,
        errorMessage: 'Поле не может быть пустым',
        id: number
    },
        {
            required: isRequired
        }
    )
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Поле не может быть пустым'
        }, { required: true }),

        option1: createOptionControl(true, 1),
        option2: createOptionControl(true, 2),
        option3: createOptionControl(false, 3),
        option4: createOptionControl(false, 4),
    }
}


class Creator extends React.Component {

    state = {
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    }

    onSubmitHandler = e => {
        e.preventDefault()
    }

    addQuestionHandler = e => {
        e.preventDefault()

        const { question, option1, option2, option3, option4 } = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id },
            ]

        }

        this.props.createQuizQuestion(questionItem)

        this.setState({ 
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })

    }

    createQuizHandler = (event) => {
        event.preventDefault()
       
        this.setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })

        this.props.finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const control = this.state.formControls[controlName]

            return (
                <React.Fragment key={i}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={e => this.changeHandler(e.target.value, controlName)}
                        required={control.isRequired}
                    />
                    {i === 0 ? <hr width="100%" /> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
            ]}
        />

        return (
            <div className={c.Creator}>
                <h1>Создать тест</h1>

                <form onSubmit={this.onSubmitHandler}>

                    {this.renderControls()}

                    {select}

                    <Button
                        type='primary'
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Добавить вопрос
                    </Button>

                    <Button
                        type='success'
                        onClick={this.createQuizHandler}
                        disabled={this.props.quiz.length === 0}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creator)