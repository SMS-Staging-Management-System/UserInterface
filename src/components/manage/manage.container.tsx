import { manageGetUsersByGroup } from '../../actions/manage-users/manage-users.actions';
import * as createUserActions from '../../actions/create-user/create-user.actions';
import * as viewUserActions from '../../actions/view-user/view-user.actions';
import * as createCohortActions from '../../actions/create-cohort/create-cohort.actions';
import { IState, } from '../../reducers';
import {IManageUsersState } from '../../reducers/management'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ManageComponenet } from './manage.component';

export interface IManageComponentProps extends RouteComponentProps<{manage: string}>{
  manageUsers: IManageUsersState,
<<<<<<< HEAD
  manageGetUsersByGroup: (groupName: string, email:string, page?: number) => void,
  manageGetAllUsers: () => void,
=======
  manageGetUsersByGroup: (groupName: string) => void,
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
  toggleCreateUserModal: () => void,
  toggleCreateCohortModal: () => void,
  toggleViewUserModal: () => void,
}



const mapStateToProps = (state:IState) => ({
  manageUsers: state.managementState.manageUsers
});

const mapDispatchToProps = {
  manageGetUsersByGroup,
  toggleCreateUserModal: createUserActions.toggleModal,
  toggleCreateCohortModal: createCohortActions.toggleModal,
  toggleViewUserModal: viewUserActions.toggleViewUserModal,
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageComponenet);