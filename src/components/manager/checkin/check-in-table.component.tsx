import * as React from 'react';
import { UncontrolledTooltip } from 'reactstrap';
/*
  *The check-in table
*/

// this fake data for the check-in table
const FAKE_CHECK_IN_DATA = [
  {
    cohort: "Blake 1810",
    description: "I am working on my portfolio today",
    firstName: "Nigel",
    lastName: "Christian",
    time: '12/4/2018 @ 0900',
    userId: 1
  }, {
    cohort: "Blake 1810",
    description: "I am taking the OCA today",
    firstName: "Andrew",
    lastName: "Wilson",
    time: '12/4/2018 @ 0900',
    userId: 2
  }, {
    cohort: "Blake 1810",
    description: "I am working on an internal Revature project for staging today",
    firstName: "Calvin",
    lastName: "Vo",
    time: '12/4/2018 @ 0900',
    userId: 3
  }
];

export class CheckInTableComponent extends React.Component<{}> {

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
              <th scope="col">Check-in Time</th>
            </tr>
          </thead>
          <tbody>
            {FAKE_CHECK_IN_DATA.map(user =>
              <tr id={`row-${user.userId}`}key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.cohort}</td>
                <td>{user.time}</td>
                <UncontrolledTooltip placement="top" target={`row-${user.userId}`}>
                 Daily tasks: {user.description}
                </UncontrolledTooltip>  
              </tr>
            )}
          </tbody>
        </table>
       
      </>

    );
  }
}

export default CheckInTableComponent