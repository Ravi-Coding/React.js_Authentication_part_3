import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

// step 3
const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} /> // step 6, Use spread operator to pass the hole props object to the React Component
  // step 7 ,Let's make Protected Route reusable to use it for other Route as well for this got to app.js and write protectedRoute for in other Route ex: cart,Products ...
  // here,the exact keyword is boolean attribute to the Route Component
  // it is the same  as sending exact = {true} to the component
}

export default ProtectedRoute
