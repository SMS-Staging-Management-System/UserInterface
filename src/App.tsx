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
import { SurveyRoutes } from './routes/Survey.routes';
import { InterviewRoutes } from './routes/Interview.routes';
<<<<<<< HEAD
import { DashboardRoutes } from './routes/Dashboard.routes';
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71

class App extends React.Component {
  public render() {
    return (
      <Provider store={store} >
        <BrowserRouter>
          <div>
            <AppNav />
            
            <div id="main-content-container">
              <Switch>
<<<<<<< HEAD
                 
                  <Route path='/management' component={ManagementRoutes}/>
                  <Route path='/interview' component={InterviewRoutes}/>
                  <Route path='/surveys' component ={SurveyRoutes}/>
                  <Route path='/dashboard' component ={DashboardRoutes}/>
                  <Route path='/' component ={DashboardRoutes}/>
=======
                  <Route path='/management' component={ManagementRoutes}/>
                  <Route path='/interview' component={InterviewRoutes}/>
                  <Route path='/surveys' component ={SurveyRoutes}/>
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
                 
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