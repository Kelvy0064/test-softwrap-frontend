import React, { Component } from 'react'
import { Route, HashRouter } from 'react-router-dom'
import './App.css'
import { DataTable } from './pages/DataTable'

class App extends Component {
  render () {
    return (
      <HashRouter>
        <div className="content">
          <Route exact path="/" component={ DataTable } />
        </div>
      </HashRouter>
    )
  }
}

export default App
