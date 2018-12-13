import * as React from 'react';
/*
  *The check-in header component
*/
export class CheckInHeaderManagerComponent extends React.Component<{}> {

  public render() {
    return (
      <>
      <thead className="checkin-table-header">
        <tr>
          <th scope="col">User ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Cohort</th>
            <th scope="col">Check-in Time</th>
          </tr>
        </thead>
      </>

    );
  }
}
export default CheckInHeaderManagerComponent