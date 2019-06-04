import React from 'react';
import { shallow } from 'enzyme';
import { ManageInternalComponenet } from './manage-internal.component';
import { Button } from 'reactstrap';
import { IManageUsersState } from '../../../reducers/management';
import { IManageInternalComponentProps, } from './manage-internal.container';
//import { ViewUserModal } from '../view-user-modal/view-user-modal.component';
//import { IViewUserModal } from '../view-user-modal/view-user-modal.container';
//import { IUser } from '../../../model/user.model';
//import { FaSearch } from 'react-icons/fa';
//import { updateClicks } from '../../actions/view-user/view-user.actions.ts';
//import { IncrementerComponent } from './clicker-incrementer/clicker-incrementer.component';

describe('<ManageInternalComponenet />', () => {

    test('Check component has correct amount of buttons', () => {

        const manageUsers: IManageUsersState = {
            manageUsers: [],
            manageUsersCurrentPage: 0,
            manageUsersPageTotal: 0,
            emailSearch: '',
            option: '',
            componentLoaded: false,
            userTableSort: ''
        }
        const props: IManageInternalComponentProps = {
            manageUsers: manageUsers,
            componentLoaded: false,
            userTableSort: '',
            updateManageUsersTable: jest.fn(),
            toggleViewUserModal: jest.fn(),
            selectUserForDisplay: jest.fn(),
            updateSearchEmail: jest.fn(),
            updateSearchOption: jest.fn(),
            sortUsers: jest.fn(),
        }

        const results = shallow(<ManageInternalComponenet {...props} />);
        expect(results.find(Button)).toHaveLength(3);
        expect(results).resolves
    })

    test('Check component has search, Prev, and Next buttons', () => {

        const manageUsers: IManageUsersState = {
            manageUsers: [],
            manageUsersCurrentPage: 0,
            manageUsersPageTotal: 0,
            emailSearch: '',
            option: '',
            componentLoaded: false,
            userTableSort: ''
        }
        const props: IManageInternalComponentProps = {
            manageUsers: manageUsers,
            componentLoaded: false,
            userTableSort: '',
            updateManageUsersTable: jest.fn(),
            toggleViewUserModal: jest.fn(),
            selectUserForDisplay: jest.fn(),
            updateSearchEmail: jest.fn(),
            updateSearchOption: jest.fn(),
            sortUsers: jest.fn(),
        }

        const wrap = shallow(<ManageInternalComponenet {...props} />);
        //const buttonList = results.find(Button);
        expect(wrap.containsMatchingElement(<Button>Search</Button>)).toBeTruthy();
        expect(wrap.containsMatchingElement(<Button>Prev</Button>)).toBeTruthy();
        expect(wrap.containsMatchingElement(<Button>Next</Button>)).toBeTruthy();

    })

    test('Check component resolves', () => {

        const manageUsers: IManageUsersState = {
            manageUsers: [],
            manageUsersCurrentPage: 0,
            manageUsersPageTotal: 0,
            emailSearch: '',
            option: '',
            componentLoaded: false,
            userTableSort: ''
        }
        const props: IManageInternalComponentProps = {
            manageUsers: manageUsers,
            componentLoaded: false,
            userTableSort: '',
            updateManageUsersTable: jest.fn(),
            toggleViewUserModal: jest.fn(),
            selectUserForDisplay: jest.fn(),
            updateSearchEmail: jest.fn(),
            updateSearchOption: jest.fn(),
            sortUsers: jest.fn(),
        }

        const results = shallow(<ManageInternalComponenet {...props} />);
        expect(results).resolves
    })
})