import * as React from 'react';
/*
  *The check-in header component
*/
export class CheckInHeaderManagerAssociateComponent extends React.Component<{}> {

  public render() {
    return (
      <>
      <thead className="checkin-table-header-not-my-fault-i-have-to-do-this">
        <tr>
          <th scope="col">Check in Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Check-in Time</th>
          </tr>
        </thead>
      </>

    );
  }
}
export default CheckInHeaderManagerAssociateComponent