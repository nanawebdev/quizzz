import React from 'react'
import c from './Button.css'

const Button = props => {
    const cls = [
        c.Button,
        c[props.type]
    ]

    return (
        <button
            className={cls.join(' ')}
            onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button