import React, {Suspense,lazy} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Components/Container';
import AppBar from './Components/AppBar';
// import ContactsPage from './views/ContactsPage';
// import HomePage from './views/HomePage';
// import LoginPage from './views/LoginPage';
// import RegistrationPage from './views/RegistrationPage';
import authOperation from './redux/Auth/auth-operation'
import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from './Components/Spinner';
import routes from './routes';
import { Particle } from 'jparticles'
import styles from './App.module.css'
import PrivateRoute from './Components/PrivateRoute'
import PublicRoute from './Components/PublicRoute'

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
  import('./views/RegistrationPage.js' /* webpackChunkName: "Registration-page" */),
);
class App extends React.Component{
  componentDidMount() {
    this.props.onGetCurrentUser();
     new Particle('#demo',{
    proximity: 90,
       range: 130,
       maxSpeed: 0.6,
       lineShape: "spider",
       parallax: true,
 
 
})
  }
  render() {
    return (
     
      // <Container>
        <div>
        <div id="demo" className={styles.demo}>
        </div>
        <Container>
          <ToastContainer />
          <Suspense fallback={<Spinner />}>
          <AppBar />
          <Switch>
      <Route exact path={routes.home} component={HomePage} />
          <PrivateRoute exact path={routes.contacts} component={ContactsPage} redirectTo='/login/'/>
      <PublicRoute exact path={routes.login} component={LoginPage} restricted  redirectTo='/contacts/'/>
            <PublicRoute exact path={routes.registration} component={RegistrationPage} restricted redirectTo='/contacts/' />
            </Switch>
            </Suspense>
          </Container>
         </div>
      //  {/* </Container> */}
       
  );
  }
}



// function App() {
//   return (
//     <Container>
//       <ToastContainer />
//       <AppBar />
//       <Route exact path={routes.home} component={HomePage} />
//       <Route exact path={routes.contacts} component={ContactsPage} />
//       <Route exact path={routes.login} component={LoginPage} />
//       <Route exact path={routes.registration} component={RegistrationPage} />
//     </Container>
//   );
// }
const mapDispathToProps = {
  onGetCurrentUser:authOperation.getCurrentUser
}

export default connect(null, mapDispathToProps)(App);
