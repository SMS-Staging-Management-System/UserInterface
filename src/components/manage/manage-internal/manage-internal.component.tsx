import * as React from 'react';
import DropdownItem from 'react-bootstrap/DropdownItem';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, Table, Input, Button } from 'reactstrap';
import { ICognitoUser, cognitoRoles } from '../../../model/cognito-user.model';
import ViewUserModal from '../view-user-modal/view-user-modal.container';
import { IManageInternalComponentProps } from './manage-internal.container';
import SortImage from './sort-image/sort-image.component';
//import Label from 'reactstrap/lib/Label';


 //Track this components individual state
export interface ManageInternalState {
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

//Store the sort images
const sortImages = {
    SORT_IMAGE: 'sort-up',
    SORT_IMAGE_REVERSE: 'sort-down',
    DEFAULT_SORT_IMAGE: 'sort'
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
        //If component is loading for the first time, load all users
        if (this.props.componentLoaded === false) {
            this.props.updateManageUsersTable("all", '', this.props.manageUsers.manageUsersCurrentPage);
        }
        //If component was sorted before, make sure to turn to that sorted state.
        if (this.props.userTableSort !== "sorted") {
            this.sort(this.props.userTableSort);
        }
    }

    displayUserModal = async (selectedUser: ICognitoUser) => {
        await this.props.selectUserForDisplay(selectedUser);
        this.props.toggleViewUserModal();
    }

    toggleDropdownList = () => {
        this.setState({
            roleDropdownList: !this.state.roleDropdownList
        });
    }
    updateDropdown = (option: string, page: number) => {
        this.props.updateSearchOption(option);
        this.props.updateManageUsersTable(option, this.props.manageUsers.emailSearch, page);
        //reset sorting 
        this.sort('sorted');
    }

    //This is for handleing event raised by Search button
    //That is added for input box
    //id="Search-user-by-partial-email-input" (ss)
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

    // this is event handler for events raised by inputbox
    //id="Search-user-by-partial-email-input" (ss)
    updateValueOfSearchEmail = (e: React.FormEvent) => {
        const target = e.target as HTMLSelectElement;
        this.props.updateSearchEmail(target.value);
    }

    incrementPage = () => {
        if ((this.props.manageUsers.manageUsersCurrentPage < this.props.manageUsers.manageUsersPageTotal - 1) || this.props.manageUsers.areMore) {
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

    updateShowColOneImage = (colNumber: number) => {
        switch (colNumber) {
            case 1:
                if(this.state.colOneSortImage === 'show'){
                    return 'd-none pointer-table'
                } else {
                    return 'd-inline pointer-table'
                }
            case 2:
                if(this.state.colTwoSortImage === 'show'){
                    return 'd-none pointer-table'
                } else {
                    return 'd-inline pointer-table'
                }
            case 3:
                if(this.state.colThreeSortImage === 'show'){
                    return 'd-none pointer-table'
                } else {
                    return 'd-inline pointer-table'
                }
            default:
                return '';
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
                                        className={`nav-link ${this.isActive('All')}`}
                                        onClick={() => this.updateDropdown('All', searchPage)}>All</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to={path + "/manage/admin"}
                                        className={`nav-link ${this.isActive(cognitoRoles.CAM_ADMIN)}`}
                                        onClick={() => this.updateDropdown(cognitoRoles.CAM_ADMIN, searchPage)}>Admin</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to={path + "/manage/trainer"}
                                        className={`nav-link ${this.isActive(cognitoRoles.CAM_TRAINER)}`}
                                        onClick={() => this.updateDropdown(cognitoRoles.CAM_TRAINER, searchPage)}>Trainer</Link></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to={path + "/manage/staging-manager"}
                                        className={`nav-link ${this.isActive(cognitoRoles.CAM_STAGING_MANAGER)}`}
                                        onClick={() => this.updateDropdown(cognitoRoles.CAM_STAGING_MANAGER, searchPage)}>Staging Manager</Link></DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    
                    {/* The following input box and search botton is added
                        for sending the search by partial email request to the
                        @PostMapping(path = "email/partial")
                        end point in UserServices/UserController. (ss)
                    */}
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
                    <ViewUserModal manageGetUsersByGroup={this.props.updateManageUsersTable} />
                    <thead className="rev-background-color">
                        <tr>
                            <th className="pointer-table" onClick={() => this.sort(sortTypes.FIRST_NAME)}>First Name 
                                <SortImage 
                                    colOneSortImage={this.state.colOneSortImage}
                                />
                            </th>
                            <th className="pointer-table" onClick={() => this.sort(sortTypes.LAST_NAME)}>Last Name 
                                <SortImage 
                                    colTwoSortImage={this.state.colTwoSortImage}
                                />
                            </th>
                            <th className="pointer-table" onClick={() => this.sort(sortTypes.EMAIL)}>Email
                                <SortImage 
                                    colThreeSortImage={this.state.colThreeSortImage}
                                />
                            </th>
                            <th className="pointer-table" >Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map user information to the table */}
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
                        Page {this.props.manageUsers.manageUsersCurrentPage + 1} of {this.props.manageUsers.manageUsersPageTotal} {this.props.manageUsers.areMore ? '+' : ''}
                    </h6>
                    <Button variant="button-color" className="rev-background-color div-child" onClick={this.incrementPage}>Next</Button>
                </div>
            </>
        )
    }
}