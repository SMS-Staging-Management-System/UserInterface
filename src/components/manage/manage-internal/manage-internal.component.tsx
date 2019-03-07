import * as React from 'react';
import { Table } from 'reactstrap';
import { ICognitoUser } from '../../../model/cognito-user.model';
import ViewUserModal from '../view-user-modal/view-user-modal.container';


export interface IManageInternalComponentProps {
  manageUsers: ICognitoUser[];
  toggleViewUserModal: () => void;
  hoveredUser;
}

export class ManageInternalComponenet extends React.Component<IManageInternalComponentProps, any> {

  constructor(props) {
    super(props);
  }
  

  render() {
    return (
        <Table striped id="manage-users-table">
        <ViewUserModal/>
          <thead className="rev-background-color">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              /**
               * onMouseEnter should set the hoveredUser in
               * some state this component is subscribed to
               * to be some user,
               * 
               * then the modal can reuse that same user in its state
               * and it all be goouchi
               * 
               * eventually call this.props.updateUserInfo(e)
               * 
               * One way to solve it is to use this, but it does the operation in render and we do NOT want that:
               * () => userClient.findOneByEmail(user.email).then(resp => this.props.updateUserInfo(resp.data))
               */
              this.props.manageUsers.map((user) =>
                <tr key={user.email} className="rev-table-row" onClick={this.props.toggleViewUserModal} onMouseEnter={this.props.hoveredUser(user.email)}>
                  <td></td>
                  <td></td>
                  <td>{user.email}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
        
    )
  }
}