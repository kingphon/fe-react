import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import cookie from 'js-cookie'
import './App.css'
// import 'semantic-ui-css/semantic.min.css'
import './colors.scss'

// import ProductCategory from './components/pages/ProductCategory'
import Main from './components/templates/layouts/Main';
import Province from './components/pages/Province';
// import ProductBrand from './components/pages/ProductBrand';
// import UserGroup from './components/pages/UserGroup';
// import ProductTypeGroup from './components/pages/ProductTypeGroup';
// import ProductType from './components/pages/ProductType';
// import Product from './components/pages/Product';
// import Promotion from './components/pages/Promotion';
// import Post from './components/pages/Post';
// import PostType from './components/pages/PostType';
// import Setting from './components/pages/Setting';
// import UserProfile from './components/organisms/Setting/UserProfile';
// import ChangePassword from './components/organisms/Setting/ChangePassword';
// import { Login } from './components/organisms/Login';
// import AuthRoute, { isAuthenticated } from './routes/AuthRoute';

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
    </Switch>
  )
}

function mapStateToProps(state) {
  const { rootReducer: { userAuth } } = state
  return { userAuth }
}

export default connect(mapStateToProps)(App);
