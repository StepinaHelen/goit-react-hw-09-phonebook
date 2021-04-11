import React, { Suspense, lazy, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Components/Container';
import AppBar from './Components/AppBar';
// import ContactsPage from './views/ContactsPage';
// import HomePage from './views/HomePage';
// import LoginPage from './views/LoginPage';
// import RegistrationPage from './views/RegistrationPage';
import authOperation from './redux/Auth/auth-operation';
import { useDispatch } from 'react-redux';

import { Switch } from 'react-router-dom';
import Spinner from './Components/Spinner';
import routes from './routes';
import { Particle } from 'jparticles';
import styles from './App.module.css';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';

const HomePage = lazy(() =>
  import('./views/HomePage.js' /* webpackChunkName: "Home-page" */),
);
const ContactsPage = lazy(() =>
  import('./views/ContactsPage.js' /* webpackChunkName: "Contacts-page" */),
);
const LoginPage = lazy(() =>
  import('./views/LoginPage' /* webpackChunkName: "Login-page" */),
);
const RegistrationPage = lazy(() =>
  import(
    './views/RegistrationPage.js' /* webpackChunkName: "Registration-page" */
  ),
);
// useEffect вызывается каждый раз когда обновляется компонент

function App() {
  // componentDidMount() {
  //     this.props.onGetCurrentUser();
  //     new Particle('#demo', {
  //       proximity: 90,
  //       range: 130,
  //       maxSpeed: 0.6,
  //       lineShape: 'spider',
  //       parallax: true,
  //     });
  //   }
  const dispatch = useDispatch();

  useEffect(() => {
    new Particle('#demo', {
      proximity: 90,
      range: 130,
      maxSpeed: 0.6,
      lineShape: 'spider',
      parallax: true,
    });
    // передаем массив зависимостей(при каком значении должно выполнятся), если не передавать то useEffect выполняется при каждом изменении стейта,
    // либо же передавать пустой массив для рендeра- 1раз
  }, []);
  useEffect(() => {
    dispatch(authOperation.getCurrentUser());
  }, [dispatch]);
  return (
    <div>
      <div id="demo" className={styles.demo}></div>
      <Container>
        <ToastContainer />
        <Suspense fallback={<Spinner />}>
          <AppBar />
          <Switch>
            {/* <Route exact path={routes.home} component={HomePage} /> */}
            <PublicRoute exact path="/">
              <HomePage />
            </PublicRoute>
            <PrivateRoute exact path={routes.contacts} redirectTo="/login/">
              <ContactsPage />
            </PrivateRoute>
            <PublicRoute
              exact
              path={routes.login}
              // component={LoginPage}
              restricted
              redirectTo="/contacts/"
            >
              <LoginPage />
            </PublicRoute>
            <PublicRoute
              exact
              path={routes.registration}
              // component={RegistrationPage}
              restricted
              redirectTo="/contacts/"
            >
              <RegistrationPage />
            </PublicRoute>
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
}
export default App;

// const mapDispathToProps = {
//   onGetCurrentUser: authOperation.getCurrentUser,
// };
