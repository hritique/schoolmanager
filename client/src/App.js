// Basics
import React, { useEffect, Fragment } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// Layout Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';

// Pages
import Login from './components/pages/Login/Login';
import AddStudent from './components/pages/Students/addStudent';
import UpdateStudent from './components/pages/Students/updateStudent';
import Students from './components/pages/Students/allStudents';

// Private Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <SnackbarProvider maxSnack={10}>
          <Alert />
        </SnackbarProvider>
        <Switch>
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/addStudent" exact component={AddStudent} />
          <PrivateRoute path="/students" exact component={Students} />
          <Route path="/updateStudent" component={UpdateStudent} />
          <Route path="/" exact component={Landing} />
        </Switch>
      </Fragment>
    </Provider>
  );
};

export default App;
