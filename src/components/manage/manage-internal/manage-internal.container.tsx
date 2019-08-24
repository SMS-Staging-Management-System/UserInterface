import { ICognitoUser } from '../../../model/cognito-user.model';
import { connect } from 'react-redux';
import { ManageInternalComponenet } from './manage-internal.component';
import { IState } from '../../../reducers';
import { toggleViewUserModal, selectUserForDisplay } from "../../../actions/view-user/view-user.actions";
import { updateSearchEmail, updateSearchOption } from '../../../actions/manage-users/manage-users.actions';
import { IManageUsersState } from '../../../reducers/management';
import { sortUsers } from '../../../actions/manage-users/manage-users.actions';

export interface IManageInternalComponentProps {
    manageUsers: IManageUsersState;
    componentLoaded: boolean;
    userTableSort: string;
    updateManageUsersTable: (groupName: string, email: string, pageNumber?: number) => void;
    toggleViewUserModal: () => void;
    selectUserForDisplay: (selectedUser: ICognitoUser) => void;
    updateSearchEmail: (newEmailSearch: string) => void;
    updateSearchOption: (newSearchOption: string) => void;
    sortUsers: (userArray: ICognitoUser[], sortKey:string) => void;
}

const mapStateToProps = (state: IState) => {
    return {
        manageUsers: state.managementState.manageUsers,
        componentLoaded: state.managementState.manageUsers.componentLoaded,
        userTableSort: state.managementState.manageUsers.userTableSort
    }
}

const mapDispatchToProps = {
    toggleViewUserModal: toggleViewUserModal,
    selectUserForDisplay: selectUserForDisplay,
    updateSearchEmail: updateSearchEmail,
    updateSearchOption: updateSearchOption,
    sortUsers: sortUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageInternalComponenet)
