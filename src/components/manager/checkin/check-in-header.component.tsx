import * as React from 'react';

/*
  *The check-in header component
*/


export class CheckInHeaderComponent extends React.Component<{}> {

  public render() {
    return (
      <>
      <thead>
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

export default CheckInHeaderComponent