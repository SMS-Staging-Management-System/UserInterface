import * as React from 'react';
import { ContainerComponent } from './manager.container';
import ClockComponent from '../../components/clock/clock.component';
/**
 * The manager content
 */
export class ManagerContentComponent extends React.Component {

  public render() {
    return (
      <div className="manager-content col-12 shadow-lg p-3 mb-5 bg-white rounded">
        <div>
            <h4>SMS Manager Dashboard <ClockComponent/></h4>
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