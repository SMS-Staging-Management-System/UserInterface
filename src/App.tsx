import * as React from 'react';
import './include/bootstrap';
import './App.css';
import AppNav from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import clickerContainer from './components/clicker/clicker.container';
import { ManageComponent } from './components/manage/manage.component';
import  ProtectedRoute  from './components/protected-route.component.tsx/protected-route.component';
import  LoginComponent  from './components/login/login.component';


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route path="/login" component={LoginComponent} />
                <Route path="/home" component={HomeComponent} />
                <Route path="/clicker" component={clickerContainer} />
                <ProtectedRoute allowedRoles={['admin', 'staging-manager']} path="/manage" component={ManageComponent} />
                <Route component={HomeComponent} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
