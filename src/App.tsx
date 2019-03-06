import * as React from 'react';
import './include/bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { store } from './Store';
import AppNav from './components/nav/nav.component';
import { BrowserRouter,  Switch } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import { ManagementRoutes } from './routes/Management.routes';
import { InterviewRoutes } from './routes/Interview.routes';
import { SurveyRoutes } from './routes/Survey.routes';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch> 
              <InterviewRoutes/>
              <ManagementRoutes/>        
                  <SurveyRoutes/>
              </Switch>
            </div>
            <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_RIGHT}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
