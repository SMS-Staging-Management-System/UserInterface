import React from 'react';
import { ManageNavComponent } from './manage-nav/manage-nav.component';
import { IManageComponentProps } from './manage.container';
import CreateCohortModal from './create-cohort-modal/create-cohort-modal.container';
import ManageCohortsComponent from './manage-cohorts/manage-cohorts.container';
import CreateUserModal from './create-user-modal/create-user-modal.container';
import ManageInternalComponenet  from './manage-internal/manage-internal.container';
import ViewCohortModal from './manage-cohorts-modal/manage-cohorts-modal.container';



export class ManageComponenet extends React.Component<IManageComponentProps, any> {

  constructor(props:IManageComponentProps) {
    super(props);
  }

  componentDidMount() {
    const manage = this.props.match.params.manage;
    if (manage === 'users') {
      console.log('ANYTHING')
      this.props.manageGetUsersByGroup('all', '', 0);
    }
  }

  updateManageUsersTable = (groupName: string, email:string, page?: number) => {
    this.props.manageGetUsersByGroup(groupName, email, page);
  }

  render() {
    return (
      <div id="manage-users-container">
        <ManageNavComponent
          toggleCreateUserModal={this.props.toggleCreateUserModal}
          
          manage={this.props.match.params.manage}
          history={this.props.history} 
          location={this.props.location}
          match={this.props.match}/>

        {/cohorts/.test(this.props.location.pathname)?
        <ManageCohortsComponent />:
        <ManageInternalComponenet
        updateManageUsersTable={this.updateManageUsersTable}
        />
        }
        <CreateCohortModal />
        <CreateUserModal />
        <ViewCohortModal />
      </div>
    )
  }
}