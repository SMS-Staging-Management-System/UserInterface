import * as React from 'react';
import './include/bootstrap';
import './App.css';
import AppNav from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from './components/loading/loading.component';
import DashboardComponent from './components/dashboard/dashboard.component';
import LoginComponent from './components/login/login.component';
import ProtectedRoute from './components/protected/protected-route.component';
import UserProfileComponent from './components/userProfile/userProfile.component';
import PageNotFoundComponent from './components/404/page-not-found.component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <ProtectedRoute path="/dashboard" component={DashboardComponent} />
                <ProtectedRoute exact path="/profile" component={UserProfileComponent} />
                <Route exact path="/sign-in" component={LoginComponent} />
                <ProtectedRoute exact path="/" component={DashboardComponent} />
                <Route component={PageNotFoundComponent} />
              </Switch>
            </div>
            <ToastContainer autoClose={2000} />
            <LoadingComponent />
          </>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
