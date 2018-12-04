import * as React from 'react';
import time from '../../include/time';
/**
 * The manager content
 */
export class ManagerContentComponent extends React.Component<{}> {

  constructor(props: any) {
    super(props);
  }

public getTime =() => {
        const d: number = Date.now();
        return <p>{time(d)}</p>;
        
}
  public render() {
    
    
    return (
      <div className="manager-content">
       
        <div>
           {this.getTime()}
        </div>
      </div>
    );
  }
}

export default ManagerContentComponent;