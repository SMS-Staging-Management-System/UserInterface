import * as React from 'react';
import './include/bootstrap';
import './App.css';
import AppNav from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import clickerContainer from './components/clicker/clicker.container';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent } from './components/register/register.component';


class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route path="/home" component={HomeComponent} />
                <Route path="/clicker" component={clickerContainer} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/register" component={RegisterComponent}/>
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
