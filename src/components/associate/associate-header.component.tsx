import * as React from 'react';
/*
  *The check-in header component
*/
export class AssociateHeader extends React.Component<{}> {

  public render() {
    return (
      <>
        <thead>
          <tr>
            <th id="associate-header" scope="col">Check-In ID</th>
            <th id="associate-header" scope="col">Description</th>
            <th id="associate-header" scope="col">Manager Comment</th>
            <th id="associate-header" scope="col">Check-in Time</th>
          </tr>
        </thead>
      </>
    );
  }
}
export default AssociateHeader