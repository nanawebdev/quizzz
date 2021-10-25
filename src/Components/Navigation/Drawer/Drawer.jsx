import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import c from './Drawer.css'

const links = [
    {to: '/', label: 'Все тесты', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/create-qiuz', label: 'Создать тест', exact: false},
]

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks() {
        return links.map((l, i) => {
            return (
                <li key={i}>
                    <NavLink
                        to={l.to}
                        exact={l.exact}
                        activeClassName={c.active}
                        onClick={this.clickHandler}
                    >
                        {l.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = [c.Drawer]

        if (!this.props.isOpen) {
            cls.push(c.close)
        }

        return (
            <React.Fragment>

                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> :null }

                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

export default Drawer