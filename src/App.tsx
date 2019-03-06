import * as React from 'react';
import './include/bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { store } from './Store';
import AppNav from './components/nav/nav.component';
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import { ManagementRoutes } from './routes/Management.routes';
import { InterviewRoutes } from './routes/Interview.routes';
import { SurveyRoutes } from './routes/Survey.routes';
import createInterviewComponent from './interview-src/component/createInterview.component';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <AppNav />
            <div id="main-content-container">
              <Switch>
                  {/* DELETE CHANGES BELOW */}
                  <Route path='/test' component={createInterviewComponent} />
                  {/* DELETE CHANGES ABOVE */}
                  <ManagementRoutes/>
                  <InterviewRoutes/>
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
