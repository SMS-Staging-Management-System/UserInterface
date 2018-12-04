import * as React from 'react';

/*
  *The check-in table
*/

// this fake data for the check-in table
const FAKE_CHECK_IN_DATA = [
  {
    cohort: "Blake 1810",
    firstName: "Nigel",
    lastName: "Christian",
    time: '12/4/2018 @ 0900',
    userId: 1
  }, {
    cohort: "Blake 1810",
    firstName: "Andrew",
    lastName: "Wilson",
    time: '12/4/2018 @ 0900',
    userId: 2
  }, {
    cohort: "Blake 1810",
    firstName: "Calvin",
    lastName: "Vo",
    time: '12/4/2018 @ 0900',
    userId: 3
  }
];


export class CheckInTableComponent extends React.Component<{},{}> {
  constructor(props){
    super(props);
    this.state = {
      popoverOpen: false
    }
  }

 

  public render() {
    return (
      <>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Cohort</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {FAKE_CHECK_IN_DATA.map(user =>
              <tr id="row" key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.cohort}</td>
                <td>{user.time}</td>
              </tr>
            )}
          </tbody>
        </table>
      </>

    );
  }
}

export default CheckInTableComponent