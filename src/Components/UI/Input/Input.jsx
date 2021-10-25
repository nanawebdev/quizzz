import React from "react";
import c from './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const cls = [c.Input]
    const htmlFor = `${inputType}-${Math.random()}`

    if(isInvalid(props)) {
        cls.push(c.invalid)
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType} 
                id={htmlFor}
                onChange={props.onChange}
                required={props.required}
            />
            {
                isInvalid(props)
                ? <span>{props.errorMessage || 'введите верное значение'}</span>
                : null
            }
        </div>
    )
}

export default Input