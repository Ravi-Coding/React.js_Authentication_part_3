import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom' // second-(i) step import Redirect

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute' // step 3 (i)

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />{' '}
      {/* step 5 ProtectedRoute is the Wrapper Component which returns   Home Route Component */}
      {/* step 5  Redirection logic an be removed from the Home Router as it is added it in the ProtectedRoute */}
      <ProtectedRoute exact path="/products" component={Products} />
      {/* step 7(i) */}
      <ProtectedRoute exact path="/cart" component={Cart} /> {/* step 7(ii) */}
      <Route path="/not-found" component={NotFound} />
      {/* first step ,Route notFound Page with path = "/not-found" */}
      <Redirect to="not-found" />
      {/* second step ,Redirect to notFound Page  */}
    </Switch>
  </BrowserRouter>
)

export default App

// If the client is not authenticated and trying to access Home Route ,redirect to Login Route
// check jwt_token in the cookies and redirect to Login Route if the token is not available
// Redirect Login can be reused by separating out into a React Component called Wrapper Component,Each route will be wrapped with it </ Route>
