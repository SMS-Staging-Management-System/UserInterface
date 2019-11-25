import { shallow } from "enzyme";
import React from 'react';
import { Button, DropdownItem, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { cognitoRoles } from "../../model/cognito-user.model";
import { IStatus } from "../../model/users/IStatus";
import { IUser } from "../../model/users/IUser";
import { inputNames } from "./profile.component";
import { IStatusDropdownProps, StatusDropdown } from "./status.dropdown";

// tslint:disable-next-line: no-big-function
describe('<SCStatusDropdown />', () => {
    let mockProps: IStatusDropdownProps;
    const mockUser: IUser = {
        email: 'email@email.com',
        firstName: 'First',
        lastName: "Last",
        personalAddress: {
            addressId: 0,
            alias: 'tstr',
            city: 'Laramie',
            country: 'USA',
            state: 'Wyoming',
            street: '123 Street St',
            zip: '82070'
        },
        phoneNumber: '8675309',
        roles: [],
        trainingAddress: {
            addressId: 1,
            alias: 'Reston',
            city: 'Reston',
            country: 'United States',
            state: 'VA',
            street: '11730 Plaza America Dr #205',
            zip: '20190'
        },
        userId: 0,
        userStatus: {
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            statusId: 4,
            virtual: false
        },
    }
    const mockAdminUser: IUser = {
        ...mockUser,
        roles: [cognitoRoles.ADMIN, cognitoRoles.STAGING_MANAGER, cognitoRoles.TRAINER],
        userStatus: {
            generalStatus: 'Staging',
            specificStatus: 'Project Started',
            statusId: 8,
            virtual: false
        },
    }
    const mockStatuses: IStatus[] = [
        {
            generalStatus: 'Training',
            specificStatus: 'Dropped',
            statusId: 1,
            virtual: false
        },
        {
            generalStatus: 'Training',
            specificStatus: 'Training',
            statusId: 2,
            virtual: false
        },
        {
            generalStatus: 'Training',
            specificStatus: 'Complete',
            statusId: 3,
            virtual: false
        },
        {
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            statusId: 4,
            virtual: false
        },
        {
            generalStatus: 'Staging',
            specificStatus: 'Bench',
            statusId: 5,
            virtual: false
        },
        {
            generalStatus: 'Staging',
            specificStatus: 'Waiting for Paperwork',
            statusId: 6,
            virtual: false
        },
        {
            generalStatus: 'Staging',
            specificStatus: 'Confirmed',
            statusId: 7,
            virtual: false
        },
        {
            generalStatus: 'Staging',
            specificStatus: 'Project Started',
            statusId: 8,
            virtual: false
        },
        {
            generalStatus: 'Staging',
            specificStatus: 'Paused',
            statusId: 9,
            virtual: false
        },
    ]

    beforeEach(() => {
        mockProps = {
            changeHandler: jest.fn(),
            currentSMSUser: {
                ...mockUser
            },
            updateUser: {
                ...mockUser
            },
            userStatuses: mockStatuses,
        }
    })

    it('Should render the component as a disabled button if the current user is an associate.', () => {
        const component = shallow(<StatusDropdown {...mockProps} />);
        expect(component).toBeDefined();
        const input = component.find(Button).find(`[name="${inputNames.STATUS_ALIASES}"]`).find(`[disabled=true]`);
        expect(input).toHaveLength(1);
    })

    it('Should render the component as an uncontrolled dropdown if the current user is not an associate', () => {
        const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const uncontrolledDropdown = component.find(UncontrolledDropdown).find(`[name="${inputNames.STATUS_ALIASES}"]`)
        expect(uncontrolledDropdown).toHaveLength(1);
    })

    it(`Should render ${mockStatuses.length} dropdown item components.`, () => {
        const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem)
            .filterWhere(item => item.find('[header]').length !== 1)
            .filterWhere(item => item.find('[divider]').length !== 1)
        expect(dropdownItems).toHaveLength(mockStatuses.length);
    })

    mockStatuses.forEach(status => {
        if (!status.virtual) {
            it(`Should render the ${status.specificStatus} option`, () => {
                const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
                expect(component).toBeDefined();
                const dropdownItem = component.find(DropdownItem)
                    .filterWhere(item => item.find('[header]').length !== 1)
                    .findWhere(item => item.text() === status.specificStatus);
                expect(dropdownItem).toHaveLength(1);
            })
        }
        if (status.virtual) {
            // tslint:disable-next-line: no-identical-functions
            it('Should not renter the option', () => {
                const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
                expect(component).toBeDefined();
                const dropdownItem = component.find(DropdownItem)
                    .filterWhere(item => item.find('[header]').length !== 1)
                    .findWhere(item => item.text() === status.specificStatus);
                expect(dropdownItem).toHaveLength(0);
            })
        }
    })

    it(`Should have the text of the button as the passed in user's status`, () => {
        const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownToggle = component.find(DropdownToggle).children().text();
        expect(dropdownToggle).toBe(mockUser.userStatus.specificStatus);
    })

    it(`Should have the passed in user's status enabled initially`, () => {
        const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem)
            .filterWhere(item => item.find('[header]').length !== 1)
            .filterWhere(item => item.find('[divider]').length !== 1);
        // tslint:disable-next-line: no-duplicate-string
        const enabledDropdownItem = dropdownItems.find('[active=true]').children().text();
        expect(enabledDropdownItem).toBe(mockUser.userStatus.specificStatus);
    })

    it(`Should update the button text when a status is clicked`, () => {
        const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
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
                .filterWhere(filterItem => filterItem.find('[header]').length !== 1)
                .filterWhere(filterItem => filterItem.find('[divider]').length !== 1)
                .find('[active=true]');
            expect(newActive.children().text()).toBe(item.children().text());
        })
    })

    it(`Should call the onChange prop function with the correct parameters when a status is clicked`, () => {
        const component = shallow(<StatusDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
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
            expect(mockProps.changeHandler).toHaveBeenCalledWith(simulatedTarget);
        })
    })
    it('Should update the buttonText state when componentDidUpdate is called', () => {
        const mockPrevProps = {
            changeHandler: jest.fn(),
            currentSMSUser: {
                ...mockAdminUser
            },
            updateUser: {
                email: '',
                firstName: '',
                lastName: '',
                personalAddress: {
                    addressId: 0,
                    alias: '',
                    city: '',
                    country: '',
                    state: '',
                    street: '',
                    zip: ''
                },
                phoneNumber: '',
                roles: [],
                trainingAddress: {
                    addressId: 0,
                    alias: '',
                    city: '',
                    country: '',
                    state: '',
                    street: '',
                    zip: ''
                },
                userId: 0,
                userStatus: {
                    generalStatus: '',
                    specificStatus: '',
                    statusId: 0,
                    virtual: false
                },
            },
            userStatuses: mockStatuses,
        }

        const mockState = {
            buttonText: mockProps.updateUser.userStatus.specificStatus
        }

        const component = shallow(<StatusDropdown {...mockPrevProps} />);
        component.setProps(mockProps);
        expect(component.state()).toEqual(mockState);
    })
})