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
            <th scope="col">User ID</th>
            <th id="associate-header" scope="col">First Name</th>
            <th id="associate-header" scope="col">Last Name</th>
            <th id="associate-header" scope="col">Cohort</th>
            <th id="associate-header" scope="col">Check-in Time</th>
          </tr>
        </thead>
      </>
    );
  }
}
export default AssociateHeader