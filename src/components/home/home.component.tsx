import * as React from 'react';
import {LoginComponent} from '../login/login.component'

export class HomeComponent extends React.Component {

  public render() {
    return (
      <div>
        <LoginComponent/>
      </div>
    );
  }
}

