import { manageGetUsersByGroup } from '../../../actions/manage-users/manage-users.actions';
import { IState, IManageUsersState } from '../../../reducers';
import { connect } from 'react-redux';
import { ManageUsersComponenet } from './manage-users.component';
import { RouteComponentProps } from 'react-router';

export interface IManageUserNavComponentProps extends RouteComponentProps<{group: string}>{
  manageGetUsersByGroup,
  manageUsers: IManageUsersState
}

const mapStateToProps = (state:IState) => ({
  manageUsers: state.manageUsers
});

const mapDispatchToProps = {
  manageGetUsersByGroup
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersComponenet);