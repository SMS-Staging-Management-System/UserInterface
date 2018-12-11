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
              <th id="associateheader" scope="col">First Name</th>
              <th id="associateheader" scope="col">Last Name</th>
              <th id="associateheader" scope="col">Cohort</th>
              <th id="associateheader" scope="col">Check-in Time</th>
            </tr>
          </thead>
      </>
    );
  }
}
export default AssociateHeader