import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../redux/Auth/auth-selectors';

const PrivateRoute = ({ children, redirectTo, ...routeProps }) => {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to={redirectTo} />}
    </Route>
  );
};

export default PrivateRoute;

//  <Route
//    {...routeProps}
//    render={props =>
//      isAuthenticated ? <Component {...props} /> : <Redirect to={redirectTo} />
//    }
//  />;
// const mapStateToProps = state => ({
//   isAuthenticated: authSelectors.getIsAuthenticated(state),
// });
