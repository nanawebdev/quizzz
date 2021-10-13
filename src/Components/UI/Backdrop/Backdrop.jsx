import React from 'react'
import c from './Backdrop.css'

const Backdrop = props => <div className={c.Backdrop} onClick={props.onClick}></div>

export default Backdrop