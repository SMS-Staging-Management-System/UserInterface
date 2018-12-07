import * as React from 'react';
import { ContainerComponent } from './manager.container';
import ClockComponent from './clock/clock.component';

/**
 * The manager content
 */
export class ManagerContentComponent extends React.Component {
  public render() {
    return (
      <div className="manager-content shadow-lg p-3 mb-5 bg-white rounded">
        <div>
            <h4>SMS Manager Dashboard</h4>
            <h5><ClockComponent/></h5>
        </div>
        <hr/>
        <div>
          {/* Table holder */}
          <ContainerComponent/>
        </div>
      </div>
    );
  }
}

export default ManagerContentComponent;