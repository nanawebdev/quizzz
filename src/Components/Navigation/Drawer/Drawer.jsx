import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import c from './Drawer.css'

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks(links) {
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
        console.log(this.props)
        const cls = [c.Drawer]

        if (!this.props.isOpen) {
            cls.push(c.close)
        }

        const links = [
            {to: '/', label: 'Все тесты', exact: true}
        ]

        if (this.props.isAuthenticated) {
            links.push( {to: '/create-qiuz', label: 'Создать тест', exact: false} )
            links.push( {to: '/logout', label: 'Выход', exact: false} )
        } else {
            links.push( {to: '/auth', label: 'Авторизация', exact: false} )
        }

        return (
            <React.Fragment>

                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> :null }

                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}

export default Drawer