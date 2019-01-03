import { manageGetUsersByRole } from '../../../../actions/manage-users/manage-users.actions';
import { connect } from 'net';
import { ManageUserNavComponent } from './manage-users-nav.component';
import { IState } from '../../../../reducers';

const mapStateToProps = (state:IState) => ({state})
export default connect(ManageUserNavComponent)