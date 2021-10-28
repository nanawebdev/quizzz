import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import { Route, Switch, Redirect } from 'react-router-dom'
import Quiz from './Components/Quiz/Quiz'
import QuizList from './Components/QuizList/QuizList'
import Auth from './Components/Auth/Auth'
import Creator from './Components/Creator/Creator'
import { connect } from 'react-redux'
import Logout from './Components/Logout/Logout'
import { authologin } from './store/actions/auth'

class App extends Component {

  componentDidMount() {
    this.props.autologin()
  }
  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' component={QuizList} exact title='Все тесты' />
        <Redirect to='/' />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/create-qiuz' component={Creator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={QuizList} exact />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autologin: () => dispatch(authologin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
