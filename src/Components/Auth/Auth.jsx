import React from 'react'
import c from './Auth.css'
import Button from './../../Components/UI/Button/Button'
import Input from '../UI/Input/Input'
import axios from 'axios'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'password',
                errorMessage: 'введите корректный password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCe7iDPpFvM7wWdxZTBmmTxREGofOkkjqU', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCe7iDPpFvM7wWdxZTBmmTxREGofOkkjqU', authData)
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = isValid && value.trim() !== ''
        }

        if (validation.email) {
            isValid = isValid && validateEmail(value)
        }

        if (validation.minLength) {
            isValid = isValid && value.length >= validation.minLength
        }

        return isValid
    }

    onChangeHandler = (e, c) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[c] }

        control.value = e.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[c] = control

        let isFormValid = true

        Object.keys(formControls).forEach(cName => {
            isFormValid = formControls[cName].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((c, i) => {
            console.log('c', c)
            const control = this.state.formControls[c]

            return (
                <Input
                    key={c + i}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={e => this.onChangeHandler(e, c)}
                />
            )
        })
    }

    render() {
        return (
            <div className={c.Auth}>
                <h1>Авторизация</h1>

                <form onSubmit={this.submitHandler} className={c.form}>

                    {
                        this.renderInputs()
                    }

                    <Button
                        type="success"
                        onClick={this.registerHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Зарегистрироваться
                    </Button>
                    <Button
                        type="primary"
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Войти
                    </Button>
                </form>
            </div>
        )
    }
}