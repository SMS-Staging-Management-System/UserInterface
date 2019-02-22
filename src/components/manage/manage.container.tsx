import { manageGetUsersByGroup } from '../../actions/manage-users/manage-users.actions';
import * as createUserActions from '../../actions/create-user/create-user.actions';
import * as createCohortActions from '../../actions/create-cohort/create-cohort.actions';
import { IState, IManageUsersState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ManageComponenet } from './manage.component';

export interface IManageComponentProps extends RouteComponentProps<{manage: string}>{
  manageGetUsersByGroup,
  manageUsers: IManageUsersState,
  toggleCreateUserModal: () => void,
  toggleCreateCohortModal: () => void 
}

const mapStateToProps = (state:IState) => ({
  manageUsers: state.manageUsers
});

const mapDispatchToProps = {
  manageGetUsersByGroup,
  toggleCreateUserModal: createUserActions.toggleModal,
  toggleCreateCohortModal: createCohortActions.toggleModal
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageComponenet);