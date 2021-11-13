import React from 'react'
// import c from './Select.css'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div>
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