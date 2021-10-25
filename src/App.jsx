import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import {Route, Switch} from 'react-router-dom'
import Quiz from './Components/Quiz/Quiz'
import QuizList from './Components/QuizList/QuizList'
import Auth from './Components/Auth/Auth'
import Creator from './Components/Creator/Creator'

class App extends Component {
  render() {
    return (
      
      <Layout>
          <Switch>
              <Route path='/auth' component={Auth} />
              <Route path='/create-qiuz' component={Creator} />
              <Route path='/quiz/:id' component={Quiz} />
              <Route path='/' component={QuizList} />
          </Switch>
      </Layout>
    )
  }
}

export default App
