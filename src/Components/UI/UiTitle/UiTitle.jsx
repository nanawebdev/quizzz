import React from 'react'
import c from './UiTitle.css'
import { withRouter } from "react-router-dom";



const UiTitle = props => {

    function setTitle(props) {
        let title

        if (props.location.pathname === '/') {
            title = 'Все квизы'
        }

        if(props.location.pathname === '/create-qiuz') {
            title = 'Создать квиз'
        }

        if (props.location.pathname === '/auth') {
            title = 'Авторизация'
        }

        return title
    }

    return (
        <div className={c.UiTitle}>
          { setTitle(props) } 
        </div>
    )
}

export default withRouter(UiTitle)