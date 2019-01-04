import * as React from 'react';
import { Table } from 'reactstrap';
import { ManageUserNavComponent } from './manage-users-nav/manage-users-nav.component';
import { IManageUserNavComponentProps } from './manage-users.container';


export class ManageUsersComponenet extends React.Component<IManageUserNavComponentProps, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.manageGetUsersByGroup(this.props.match.params.group);
  }

  render() {
    return (
      <div id="manage-users-container">
        <ManageUserNavComponent role={this.props.match.params.group}/>
        <Table striped id="manage-users-table">
          <thead>
            <tr className="rev-background-color">
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr className="rev-table-row">
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr className="rev-table-row">
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr className="rev-table-row">
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

// const mapStateToProps = (state: IState) => state.manager
// const mapDispatchToProps = {
//    ...managerActions
// }
// export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersTabComponenet)