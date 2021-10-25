import React from 'react'
import c from './Select.module.scss'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div className={c.Select }>
            <label htmlFor={htmlFor}></label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
            { props.options.map((option, i) => {
                    return (
                        <option 
                             value={option.value}
                             key={option.value + i}
                        >
                            {option.text}
                        </option>
                    )
                }) 
            }
            </select>
        </div>
    )
}

export default Select