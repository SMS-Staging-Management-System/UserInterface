import { manageGetUsersByGroup } from '../../../actions/manage-users/manage-users.actions';
import * as createUserActions from '../../../actions/create-user/create-user.actions';
import { IState, IManageUsersState } from '../../../reducers';
import { connect } from 'react-redux';
import { ManageUsersComponenet } from './manage-users.component';
import { RouteComponentProps } from 'react-router';

export interface IManageUserNavComponentProps extends RouteComponentProps<{group: string}>{
  manageGetUsersByGroup,
  manageUsers: IManageUsersState,
  toggleCreateUserModal: () => void 
}

const mapStateToProps = (state:IState) => ({
  manageUsers: state.manageUsers
});

const mapDispatchToProps = {
  manageGetUsersByGroup,
  toggleCreateUserModal: createUserActions.toggleModal
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersComponenet);