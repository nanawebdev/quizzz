import React, { Component } from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import c from './Drawer.css'

const links = [1, 2, 3]

class Drawer extends Component {
    renderLinks() {
        return links.map((l, i) => {
            return (
                <li key={i}>
                    <a>Link {l}</a>
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