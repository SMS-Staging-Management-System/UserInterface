import * as React from 'react';
import './include/bootstrap';
import './App.css';
import AppNav from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeComponent from './components/home/home.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import {RegisterComponent } from './components/register/register.component';
import Loading from './components/loading/loading.component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route component={HomeComponent} />
              </Switch>
            </div>
            <Loading />
          </>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
