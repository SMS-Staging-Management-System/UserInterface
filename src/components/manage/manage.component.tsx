import * as React from 'react';
import { ManageNavComponent } from './manage-nav/manage-nav.component';
import { IManageComponentProps } from './manage.container';
import CreateUserModal from './create-user-modal/create-user-modal.container';
import { ManageInternalComponenet } from './manage-internal/manage-internal.component';
import { ManageAssociatesComponenet } from './manage-associates/manage-associates.component';


export class ManageComponenet extends React.Component<IManageComponentProps, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const manage = this.props.match.params.manage;
    if (manage === 'users') {
      this.props.manageGetUsersByGroup(manage);
    }
  }

  updateManageUsersTable = (groupName: string) => {
    this.props.manageGetUsersByGroup(groupName);
  }

  render() {
    return (
      <div id="manage-users-container">
        <ManageNavComponent
          toggleCreateUserModal={this.props.toggleCreateUserModal}
          updateManageUsersTable={this.updateManageUsersTable}
          manage={this.props.match.params.manage} />

        {this.props.match.params.manage === 'associates'
          ? <ManageAssociatesComponenet manageUsers={this.props.manageUsers.manageUsers} />
          : <ManageInternalComponenet manageUsers={this.props.manageUsers.manageUsers} />
        }
        <CreateUserModal />
      </div>
    )
  }
}