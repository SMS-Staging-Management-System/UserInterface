import * as React from 'react';
import time from '../../include/time';
import { ContainerComponent } from './container.component';
/**
 * The manager content
 */

export class ManagerContentComponent extends React.Component<{}> {

  constructor(props: any) {
    super(props);
  }

public getTime = () => {
        const d: number = Date.now();
        return <p>{time(d)}</p>;
}
  public render() {
    return (
      <div className="manager-content">
        <div>
            <h1>Revature Staging Management System</h1>
            <h4>Manager Dashboard</h4>
           {this.getTime()}
        </div>
        <div>
          {/* Table holder */}
          <ContainerComponent/>
        </div>
      </div>
    );
  }
}

export default ManagerContentComponent;