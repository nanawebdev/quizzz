import React, { Component } from 'react'
import Layout from './hoc/Layout/Layout'
import Quiz from './Components/Quiz/Quiz'

class App extends Component {
  render() {
    return (
      <Layout>

        <Quiz />
      
      </Layout>
    )
  }
}

export default App
