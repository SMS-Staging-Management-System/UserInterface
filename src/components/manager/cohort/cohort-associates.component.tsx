import * as React from "react";
import { Table } from "reactstrap";

/*
 *The cohort associates component
 */

// this fake data for the cohort-associate table
const FAKE_ASSOCIATE_DATA = [
  {
    firstName: "Nigel",
    lastName: "Christian",
    userId: 1,
    username: "NigelChristian"
  },
  {
    firstName: "Andrew",
    lastName: "Wilson",
    userId: 2,
    username: "AndrewWilson"
  },
  {
    firstName: "Calvin",
    lastName: "Vo",
    userId: 3,
    username: "CalvinVo"
  }
];

export class CohortAssociatesComponent extends React.Component<{}> {
  public render() {
    return (
      <>
        <Table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {FAKE_ASSOCIATE_DATA.map(user => {
              return (
                <tr id={`row-${user.userId}`} key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default CohortAssociatesComponent;
