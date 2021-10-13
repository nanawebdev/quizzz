import React from 'react'
import c from './Navigation.css'

const Navigation = props => {
    const cls = [
        'fa',
        c.NavigationToggle
    ]

    if(props.isOpen) {
        cls.push('fa-times')
        cls.push(c.open)
    } else {
        cls.push('fa-bars')
    }

    return (
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}
        />
    )
}

export default Navigation