import * as React from 'react';
import time from '../../include/time';
import { ContainerComponent } from './manager.container';
/**
 * The manager content
 */
export class ManagerContentComponent extends React.Component {

  public getTime = () => {
    const d: number = Date.now();
    return <p>{time(d)}</p>;
  }
  public render() {
    return (
      <div className="manager-content shadow-lg p-3 mb-5 bg-white rounded">
        <div>
            <h4>Manager Dashboard</h4>
            {this.getTime()}
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