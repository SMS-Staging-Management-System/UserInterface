import * as React from 'react';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, Table, Input, Button } from 'reactstrap';
import { ICognitoUser, cognitoRoles } from '../../../model/cognito-user.model';
import ViewUserModal from '../view-user-modal/view-user-modal.container';
import { IManageInternalComponentProps } from './manage-internal.container';
//import Label from 'reactstrap/lib/Label';

/**
 * {v}: dropdown with further info
 * #: hoverable props
 * [... ]: button
 * 
 * `Row headers:
 * |-----------\|---------------------\|-------------\|----------\
 * |--'Admins'--|--'Staging Managers'--|--'Trainers'--|--Cohorts--|                              [*+ ]
 * [ *********************************************************************************************** ]
 * [--Cohort.Name--|--Address.alias{v}--|--Token.(){v}-- |--StartMonth--|--trainer email-v--         ]
 * [=================================================================================================|
 * [  1901-blake   |  USF               | [Get token  v] | March 2019   | [blake.kruppa@gmail.com v] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1902-flake   |  Reston            | [Get token  v] | March 2019   | [flake@gmail.com v       ] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1903-fake    |  USF               | [Get token  v] | March 2019   | [abatson@gmail.com v     ] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1904-bake    |  Reston            | [Get token  v] | March 2019   | [fllorida.man@gmail.com v] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1905-make    |  USF               | [Get token  v] | March 2019   | [blake.kruppa@gmail.com v] |
 * [ *********************************************************************************************** |
 *                                                                         [p1 ] [p2 ] ... [p4 ] [p5 ]                
 * `
 * {
 *   Cohort # {
 *     cohortDescription,
 *   }
 * 
 * }
 */

interface ManageInternalState {
    roleDropdownList: boolean;
    trackProps: string;
    colOneSortImage: string;
    colTwoSortImage: string;
    colThreeSortImage: string;
}

export const sortTypes = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    EMAIL: 'email',
    FIRST_NAME_REVERSE: 'firstNameReverse',
    LAST_NAME_REVERSE: 'lastNameReverse',
    EMAIL_REVERSE: 'emailReverse',
}

const sortImages = {
    SORT_IMAGE: 'https://img.icons8.com/android/24/000000/sort-down.png',
    SORT_IMAGE_REVERSE: 'https://img.icons8.com/android/24/000000/sort-up.png',
    DEFAULT_SORT_IMAGE: 'https://img.icons8.com/android/24/000000/sort.png'
}

export class ManageInternalComponenet extends React.Component<IManageInternalComponentProps, ManageInternalState> {

    constructor(props: IManageInternalComponentProps) {
        super(props);
        this.state = {
            roleDropdownList: false,
            trackProps: 'sort',
            colOneSortImage: sortImages.DEFAULT_SORT_IMAGE,
            colTwoSortImage: sortImages.DEFAULT_SORT_IMAGE,
            colThreeSortImage: sortImages.DEFAULT_SORT_IMAGE
        };
    }

    componentDidMount() {
        if (this.props.componentLoaded === false) {

            this.props.updateManageUsersTable("all", '', this.props.manageUsers.manageUsersCurrentPage);
        }
        if (this.props.userTableSort !== "sorted") {
            this.sort(this.props.userTableSort);
        }
    }

    displayUserModal = async (selectedUser: ICognitoUser) => {
        this.props.selectUserForDisplay(selectedUser);
        this.props.toggleViewUserModal();
    }

    toggleDropdownList = () => {
        this.setState({
            roleDropdownList: !this.state.roleDropdownList
        });
    }
    updateDropdown = (option: string, page: number) => {
        console.log('test')
        this.props.updateManageUsersTable(option, this.props.manageUsers.emailSearch, page);
        this.props.updateSearchOption(option);
        this.sort('sorted');
    }

    getUserByEmail = (page: number) => {
        this.props.updateManageUsersTable('All', this.props.manageUsers.emailSearch, page);
    }

    //Sort the table by columns
    sort = (sortKey) => {

        //first Name
        if (sortKey === sortTypes.FIRST_NAME || sortKey === sortTypes.FIRST_NAME_REVERSE) {
            if (sortKey === this.state.trackProps || sortKey.includes('Reverse')) {
                sortKey = sortTypes.FIRST_NAME_REVERSE
                this.setState({ colOneSortImage: sortImages.SORT_IMAGE_REVERSE })
            } else {
                this.setState({ colOneSortImage: sortImages.SORT_IMAGE })
            }
        } else {
            this.setState({ colOneSortImage: sortImages.DEFAULT_SORT_IMAGE })
        }
        //last name
        if (sortKey === sortTypes.LAST_NAME || sortKey === sortTypes.LAST_NAME_REVERSE) {
            if (sortKey === this.state.trackProps || sortKey.includes('Reverse')) {
                sortKey = sortTypes.LAST_NAME_REVERSE
                this.setState({ colTwoSortImage: sortImages.SORT_IMAGE_REVERSE })
            } else {
                this.setState({ colTwoSortImage: sortImages.SORT_IMAGE })
            }
        } else {
            this.setState({ colTwoSortImage: sortImages.DEFAULT_SORT_IMAGE })
        }
        //email
        if (sortKey === sortTypes.EMAIL || sortKey === sortTypes.EMAIL_REVERSE) {
            if (sortKey === this.state.trackProps || sortKey.includes('Reverse')) {
                sortKey = sortTypes.EMAIL_REVERSE
                this.setState({ colThreeSortImage: sortImages.SORT_IMAGE_REVERSE })
            } else {
                this.setState({ colThreeSortImage: sortImages.SORT_IMAGE })
            }
        } else {
            this.setState({ colThreeSortImage: sortImages.DEFAULT_SORT_IMAGE })
        }
        this.props.sortUsers(this.props.manageUsers.manageUsers, sortKey)
        this.setState({ trackProps: sortKey })
    }

    updateValueOfSearchEmail = (e: React.FormEvent) => {
        const target = e.target as HTMLSelectElement;
        this.props.updateSearchEmail(target.value);
    }

    incrementPage = () => {
        if (this.props.manageUsers.manageUsersCurrentPage < this.props.manageUsers.manageUsersPageTotal - 1) {
            const newPage = this.props.manageUsers.manageUsersCurrentPage + 1;
            if (this.props.manageUsers.emailSearch) {
                this.getUserByEmail(newPage);
            } else {
                this.updateDropdown(this.props.manageUsers.option, newPage);
            }
        }
    }

    decrementPage = () => {
        if (this.props.manageUsers.manageUsersCurrentPage > 0) {
            const newPage = this.props.manageUsers.manageUsersCurrentPage - 1;
            if (this.props.manageUsers.emailSearch) {
                this.getUserByEmail(newPage);
            } else {
                this.updateDropdown(this.props.manageUsers.option, newPage);
            }
        }
    }


    // returns active if the role provided in the route is the routeName provided
    isActive = (routeName: string) => ((this.props.manageUsers.option === routeName) ? 'manage-user-nav-item-active' : 'manage-user-nav-item')

    render() {
        let path = '/management';
        const searchPage = this.props.manageUsers.manageUsersCurrentPage;
        return (
            <>
                <div id="manage-user-nav" className="rev-background-color manage-user-nav">
                    <div id="manage-cohorts-view-selection-container">
                        <div>View By Role:</div>
                        <Dropdown color="success" className="responsive-modal-row-item rev-btn"
                            isOpen={this.state.roleDropdownList} toggle={this.toggleDropdownList}>
                            <DropdownToggle caret>
                                {this.props.manageUsers.option}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem >
                                    <Link to={path + "/manage/all"}
                                        className={`nav-link ${this.isActive('all')}`}
                                        onClick={() => this.updateDropdown('all', searchPage)}>All</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to={path + "/manage/admin"}
                                        className={`nav-link ${this.isActive(cognitoRoles.ADMIN)}`}
                                        onClick={() => this.updateDropdown(cognitoRoles.ADMIN, searchPage)}>Admin</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to={path + "/manage/trainer"}
                                        className={`nav-link ${this.isActive(cognitoRoles.TRAINER)}`}
                                        onClick={() => this.updateDropdown(cognitoRoles.TRAINER, searchPage)}>Trainer</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to={path + "/manage/staging-manager"}
                                        className={`nav-link ${this.isActive(cognitoRoles.STAGING_MANAGER)}`}
                                        onClick={() => this.updateDropdown(cognitoRoles.STAGING_MANAGER, searchPage)}>Staging Manager</Link></DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div>
                        <Input
                            id="Search-user-by-partial-email-input"
                            className="responsive-modal-row-item no-backround-image"
                            placeholder="Email"
                            onChange={this.updateValueOfSearchEmail}
                            value={this.props.manageUsers.emailSearch}
                        />
                    </div>
                    <Button color="secondary" onClick={() => this.getUserByEmail(0)}>
                        Search
                    </Button>
                </div>



                <Table striped id="manage-users-table">
                    <ViewUserModal />
                    <thead className="rev-background-color">
                        <tr>
                            <th className="pointer-table" onClick={() => this.sort(sortTypes.FIRST_NAME)}>First Name<img src={this.state.colOneSortImage} /> </th>
                            <th className="pointer-table" onClick={() => this.sort(sortTypes.LAST_NAME)}>Last Name <img src={this.state.colTwoSortImage} /></th>
                            <th className="pointer-table" onClick={() => this.sort(sortTypes.EMAIL)}>Email<img src={this.state.colThreeSortImage} /></th>
                            <th className="pointer-table" >Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.manageUsers.manageUsers.map((user) =>
                                <tr key={user.email} className="rev-table-row" onClick={() => this.displayUserModal(user)}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.roles.map(role => role.charAt(0).toUpperCase() + role.slice(1)).join(', ')}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <div className='row horizontal-centering vertical-centering'>
                    <Button variant="button-color" className="rev-background-color div-child" onClick={this.decrementPage}>Prev</Button>
                    <h6 className="div-child text-style" >
                        Page {this.props.manageUsers.manageUsersCurrentPage + 1} of {this.props.manageUsers.manageUsersPageTotal}
                    </h6>
                    <Button variant="button-color" className="rev-background-color div-child" onClick={this.incrementPage}>Next</Button>
                </div>
            </>
        )
    }
}