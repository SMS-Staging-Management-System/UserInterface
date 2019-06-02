import { ICognitoUser } from '../../../model/cognito-user.model';
import { connect } from 'react-redux';
import { ManageInternalComponenet } from './manage-internal.component';
import { IState } from '../../../reducers';
import { toggleViewUserModal, selectUserForDisplay } from "../../../actions/view-user/view-user.actions"
import { updateSearchEmail, updateSearchOption } from '../../../actions/manage-users/manage-users.actions';
import { IManageUsersState } from '../../../reducers/management';

export interface IManageInternalComponentProps {
    manageUsers: IManageUsersState;
    updateManageUsersTable: (groupName: string, email: string, pageNumber?: number) => void;
    toggleViewUserModal: () => void;
    selectUserForDisplay: (selectedUser: ICognitoUser) => void;
    updateSearchEmail: (newEmailSearch: string) => void;
    updateSearchOption: (newSearchOption: string) => void;
}

const mapStateToProps = (state: IState) => {
    return {
        manageUsers: state.managementState.manageUsers
    }
}

const mapDispatchToProps = {
    toggleViewUserModal: toggleViewUserModal,
    selectUserForDisplay: selectUserForDisplay,
    updateSearchEmail: updateSearchEmail,
    updateSearchOption: updateSearchOption
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInternalComponenet)
