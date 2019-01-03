import * as React from 'react';
import { Table } from 'reactstrap';
import { IUser } from '../../../model/user.model';
import { ManageUserNavComponent } from './manage-users-nav/manage-users-nav.component';
import { RouteComponentProps } from 'react-router';


interface IProps extends RouteComponentProps<{role: string}>{
  users: IUser
}


export class ManageUsersComponenet extends React.Component<IProps, any> {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {

  // }

  render() {
    return (
      <div id="manage-users-container">
        <ManageUserNavComponent role={this.props.match.params.role}/>
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