import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import './App.css'
import './colors.scss'

import Main from './components/templates/layouts/Main';
import Province from './components/pages/Location/Province';
import District from './components/pages/Location/District';
import Zone from './components/pages/Location/Zone';

class App extends React.Component {
  componentDidCatch(error) {
    console.log(error)
  }

  render = () => (
    <Switch>
      <Route exact path="/">
        <Main>
          <h2>Main</h2>
        </Main>
      </Route>
      <Route exact path="/province">
        <Main>
          <Province/>
        </Main>
      </Route>
      <Route exact path="/district">
        <Main>
          <District/>
        </Main>
      </Route>
      <Route exact path="/zone">
        <Main>
          <Zone/>
        </Main>
      </Route>
    </Switch>
  )
}

function mapStateToProps(state) {
  const { rootReducer: { userAuth } } = state
  return { userAuth }
}

export default connect(mapStateToProps)(App);
