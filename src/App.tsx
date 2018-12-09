import * as React from 'react';
import './include/bootstrap';
import './App.css';
import AppNav from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import clickerContainer from './components/clicker/clicker.container';
import ManagerContentComponent from './components/manager/manager-content.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent } from './components/register/register.component';
// import Loading from './components/loading/loading.component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                <Route path="/home" component={ManagerContentComponent} />
                <Route path="/clicker" component={clickerContainer} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/register" component={RegisterComponent}/>
                <Route component={HomeComponent} />
              </Switch>
            </div>
            {/* <Loading /> */}
          </>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
