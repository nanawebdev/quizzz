import React, { Component } from 'react'
import { connect } from 'react-redux'
import Drawer from '../../Components/Navigation/Drawer/Drawer'
import Navigation from '../../Components/Navigation/Navigation'
import UiTitle from '../../Components/UI/UiTitle/UiTitle'
import c from './Layout.css'

class Layout extends Component {

  state = {
    menu: false
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false
    })
  }

  render() {
    return (
      <div className={c.Layout}>

        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthenticated={this.props.isAuthenticated}
        />

        <Navigation
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <UiTitle>
          {this.props.title}
        </UiTitle>

        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

export default connect(mapStateToProps)(Layout)