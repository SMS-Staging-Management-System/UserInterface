import * as React from "react";
import { Table } from "reactstrap";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

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

interface IState{
  toggle: () => void;
  collapse: boolean;
}
export class CohortAssociatesComponent extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      toggle: this.toggle
    };
  }

  public toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  public render() {
    return (
      <>
              <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Heading
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
            </CardBody>
          </Card>
        </Collapse>
        
      </>
    );
  }
}

export default CohortAssociatesComponent;
