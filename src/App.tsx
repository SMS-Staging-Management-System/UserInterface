import * as React from 'react';
import './include/bootstrap';
import './App.css';
import './Associate.css';
import AppNav from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AssociateContent } from './components/associate/associatecontent.component';
import { Provider } from 'react-redux';
import { store } from './Store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeComponent from './components/home/home.component';
import LoadingComponent from './components/loading/loading.component';

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
            <ToastContainer autoClose={2000} />
            <LoadingComponent />
          </>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
