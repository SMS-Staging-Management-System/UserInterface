import { shallow, mount } from "enzyme";
import React from 'react';
import { cognitoRoles } from "../../model/cognito-user.model";
import { IUser } from "../../model/user.model";
import { ISCStatusDropdownProps, SCStatusDropdown } from "./sc-status.dropdown";
import { Input, Button, UncontrolledDropdown, DropdownItem, DropdownToggle } from "reactstrap";
import { IStatus } from "../../model/status.model";

const inputNames = {
    EMAIL: 'NEW_USER_EMAIL',
    FIRST_NAME: 'NEW_USER_FIRST_NAME',
    LAST_NAME: 'NEW_USER_LAST_NAME',
    PHONE: 'NEW_USER_PHONE',
    STREET: 'STREET',
    CITY: 'CITY',
    STATE: 'STATE',
    COUNTRY: 'COUNTRY',
    ZIP: 'ZIP',
    TRAINING_ALIASES: 'TRAINING_ALIASES',
    STATUS_ALIASES: 'STATUS_ALIASES',
    VIRTUAL_CHECKBOX: 'VIRTUAL_CHECKBOX',
    ROLES: 'ROLES'
}

const passedInputNames = {
    EMAIL: 'PASSED_IN_EMAIL',
    FIRST_NAME: 'PASSED_IN_FIRST_NAME',
    LAST_NAME: 'PASSED_IN_LAST_NAME',
    PHONE: 'PASSED_IN_PHONE',
    STREET: 'PASSED_IN_STREET',
    CITY: 'PASSED_IN_CITY',
    STATE: 'PASSED_IN_STATE',
    COUNTRY: 'PASSED_IN_COUNTRY',
    ZIP: 'PASSED_IN_ZIP',
    TRAINING_ALIASES: 'TRAINING_ALIASES',
    STATUS_ALIASES: 'STATUS_ALIASES',
    VIRTUAL_CHECKBOX: 'VIRTUAL_CHECKBOX',
    ROLES: 'ROLES'
}

describe('<SCStatusDropdown />', () => {
    let mockProps: ISCStatusDropdownProps;
    const mockUser: IUser = {
        email: passedInputNames.EMAIL,
        userId: 0,
        firstName: passedInputNames.FIRST_NAME,
        lastName: passedInputNames.LAST_NAME,
        phoneNumber: passedInputNames.PHONE,
        trainingAddress: {
            addressId: 1,
            alias: 'Reston',
            street: '11730 Plaza America Dr #205',
            zip: '20190',
            city: 'Reston',
            state: 'VA',
            country: 'United States'
        },
        personalAddress: {
            addressId: 0,
            street: passedInputNames.STREET,
            alias: 'tstr',
            city: passedInputNames.CITY,
            country: passedInputNames.COUNTRY,
            state: passedInputNames.STATE,
            zip: passedInputNames.ZIP
        },
        userStatus: {
            statusId: 2,
            generalStatus: 'Training',
            specificStatus: 'Training',
            virtual: false
        },
        roles: []
    }
    const mockAdminUser: IUser = {
        ...mockUser,
        userStatus: {
            statusId: 8,
            generalStatus: 'Staging',
            specificStatus: 'Project Started',
            virtual: false
        },
        roles: [cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER]
    }
    const mockStatuses: IStatus[] = [
        {
            statusId: 1,
            generalStatus: 'Training',
            specificStatus: 'Dropped',
            virtual: false
        },
        {
            statusId: 2,
            generalStatus: 'Training',
            specificStatus: 'Training',
            virtual: false
        },
        {
            statusId: 3,
            generalStatus: 'Training',
            specificStatus: 'Complete',
            virtual: false
        },
        {
            statusId: 4,
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            virtual: false
        },
        {
            statusId: 5,
            generalStatus: 'Staging',
            specificStatus: 'Bench',
            virtual: false
        },
        {
            statusId: 6,
            generalStatus: 'Staging',
            specificStatus: 'Waiting for Paperwork',
            virtual: false
        },
        {
            statusId: 7,
            generalStatus: 'Staging',
            specificStatus: 'Confirmed',
            virtual: false
        },
        {
            statusId: 8,
            generalStatus: 'Staging',
            specificStatus: 'Project Started',
            virtual: false
        },
        {
            statusId: 9,
            generalStatus: 'Staging',
            specificStatus: 'Paused',
            virtual: false
        },
    ]
    const mockVirtualStatuses: IStatus[] = [
        {
            statusId: 10,
            generalStatus: 'Staging',
            specificStatus: 'Panel Pending',
            virtual: false
        },
        {
            statusId: 11,
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            virtual: true
        },
        {
            statusId: 12,
            generalStatus: 'Staging',
            specificStatus: 'Bench',
            virtual: true
        },
        {
            statusId: 13,
            generalStatus: 'Staging',
            specificStatus: 'Waiting for Paperwork',
            virtual: true
        },
        {
            statusId: 14,
            generalStatus: 'Staging',
            specificStatus: 'Confirmed',
            virtual: true
        },
        {
            statusId: 15,
            generalStatus: 'Staging',
            specificStatus: 'Project Started',
            virtual: true
        },
        {
            statusId: 16,
            generalStatus: 'Staging',
            specificStatus: 'Paused',
            virtual: true
        },
        {
            statusId: 17,
            generalStatus: 'Staging',
            specificStatus: 'Panel Pending',
            virtual: true
        }
    ]

    const selectHandler = jest.fn()

    beforeEach(() => {
        mockProps = {
            currentSMSUser: {
                ...mockUser
            },
            updateUser: {
                ...mockUser
            },
            userStatuses: mockStatuses,
            onChangeHandler: jest.fn()
        }
    })

    it('Should render the component as a disabled button if the current user is an associate.', () => {
        const component = shallow(<SCStatusDropdown {...mockProps} />);
        expect(component).toBeDefined();
        const input = component.find(Button).find(`[name="${inputNames.STATUS_ALIASES}"]`).find(`[disabled=true]`);
        expect(input).toHaveLength(1);
    })

    it('Should render the component as an uncontrolled dropdown if the current user is not an associate', () => {
        const component = shallow(<SCStatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const uncontrolledDropdown = component.find(UncontrolledDropdown).find(`[name="${inputNames.STATUS_ALIASES}"]`)
        expect(uncontrolledDropdown).toHaveLength(1);
    })

    it(`Should render ${mockStatuses.length} dropdown item components.`, () => {
        const component = shallow(<SCStatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem)
            .filterWhere(item => item.find('[header]').length !== 1)
            .filterWhere(item => item.find('[divider]').length !== 1)
        expect(dropdownItems).toHaveLength(mockStatuses.length);
    })

    mockStatuses.forEach(status => {
        if (!status.virtual) {
            it(`Should render the ${status.specificStatus} option`, () => {
                const component = shallow(<SCStatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
                expect(component).toBeDefined();
                const dropdownItem = component.find(DropdownItem)
                    .filterWhere(item => item.find('[header]').length !== 1)
                    .findWhere(item => item.text() === status.specificStatus);
                expect(dropdownItem).toHaveLength(1);
            })
        }
    })

    it(`Should have the text of the button as the passed in user's status`, () => {
        const component = shallow(<SCStatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownToggle = component.find(DropdownToggle).children().text();
        expect(dropdownToggle).toBe(mockUser.userStatus.specificStatus);
    })

    it(`Should have the passed in user's status enabled initially`, () => {
        const component = shallow(<SCStatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem)
            .filterWhere(item => item.find('[header]').length !== 1)
            .filterWhere(item => item.find('[divider]').length !== 1);
        const enabledDropdownItem = dropdownItems.find('[active=true]').children().text();
        expect(enabledDropdownItem).toBe(mockUser.userStatus.specificStatus);
    })

    it(`Should update the button text when a status is clicked`, () => {
        const component = shallow(<SCStatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        component.setState({
            buttonText: mockProps.updateUser.userStatus.specificStatus
        })
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem)
            .filterWhere(item => item.find('[header]').length !== 1)
            .filterWhere(item => item.find('[divider]').length !== 1);
        const enabledDropdownItem = dropdownItems.find('[active=true]').children().text();
        expect(enabledDropdownItem).toBe(component.state('buttonText'));
        dropdownItems.forEach(item => {
            const simulatedEvent = {
                currentTarget:
                {
                    innerText: item.children().text()
                }
            };

            item.simulate('click', simulatedEvent);

            const newActive = component.find(DropdownItem)
                .filterWhere(item => item.find('[header]').length !== 1)
                .filterWhere(item => item.find('[divider]').length !== 1)
                .find('[active=true]');
            expect(newActive.children().text()).toBe(item.children().text());
        })
    })

    it(`Should call the onChange prop function with the correct parameters when a status is clicked`, () => {
        const component = shallow(<SCStatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        component.setState({
            buttonText: mockProps.updateUser.userStatus.specificStatus
        })
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem)
            .filterWhere(item => item.find('[header]').length !== 1)
            .filterWhere(item => item.find('[divider]').length !== 1);
        const enabledDropdownItem = dropdownItems.find('[active=true]').children().text();
        expect(enabledDropdownItem).toBe(mockUser.userStatus.specificStatus);
        dropdownItems.forEach(item => {
            const simulatedEvent = {
                currentTarget:
                {
                    innerText: item.children().text()
                }
            };

            item.simulate('click', simulatedEvent);

            const simulatedTarget = {
                target: {
                    name: inputNames.STATUS_ALIASES,
                    value: item.children().text()
                }
            }
            expect(mockProps.onChangeHandler).toHaveBeenCalledWith(simulatedTarget);
        })
    })
})