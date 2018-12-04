import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps<{}>{
}

/**
 * The class row 
 */
export class ClassRowComponent extends React.Component<IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="manager-content">
        
      </div>
    );
  }
}

export default ClassRowComponent;