import { shallow } from "enzyme";
import React from "react";
import { IUser } from "../../model/user.model";
import { LocationDropdown, ILocationDropdownProps } from "./location.dropdown";
import { Button, UncontrolledDropdown, DropdownToggle, DropdownItem } from "reactstrap";
import { cognitoRoles } from "../../model/cognito-user.model";
import { inputNames } from "./profile.component";
import { IAddress } from "../../model/address.model";

describe('<SCLocationDropdown />', () => {
    let mockProps: ILocationDropdownProps;
    const mockUser: IUser = {
        email: 'email@email.com',
        userId: 0,
        firstName: 'First',
        lastName: "Last",
        phoneNumber: '8675309',
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
            street: '123 Street St',
            alias: 'tstr',
            city: 'Laramie',
            country: 'USA',
            state: 'Wyoming',
            zip: '82070'
        },
        userStatus: {
            statusId: 4,
            generalStatus: 'Staging',
            specificStatus: 'Staging',
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
    const mockTrainingAddresses: IAddress[] = [
        {
            addressId: 1,
            alias: 'Reston',
            street: '11730 Plaza America Dr #205',
            zip: '20190',
            city: 'Reston',
            state: 'VA',
            country: 'United States'
        },
        {
            addressId: 2,
            alias: 'USF',
            street: 'Northwest Educational Complex',
            zip: '33613',
            city: 'Tampa',
            state: 'FL',
            country: 'United States'
        }
    ]

    beforeEach(() => {
        mockProps = {
            currentSMSUser: {
                ...mockUser
            },
            updateUser: {
                ...mockUser
            },
            trainingAddresses: mockTrainingAddresses,
            changeHandler: jest.fn()
        }
    })

    // Ensure component is rendered
    it('Should render the component', () => {
        const component = shallow(<LocationDropdown {...mockProps} />);
        expect(component).toBeDefined();
    })

    it('Should render the component as a disabled button if the user is not an admin', () => {
        const component = shallow(<LocationDropdown {...mockProps} />);
        expect(component).toBeDefined();
        const button = component.find(Button).find(`[name="${inputNames.TRAINING_ALIASES}"]`).find('[disabled=true]')
        expect(button).toHaveLength(1);
    })

    it('Should render the component as an uncontrolled dropdown if the current user is not an associate', () => {
        const component = shallow(<LocationDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const uncontrolledDropdown = component.find(UncontrolledDropdown).find(`[name="${inputNames.TRAINING_ALIASES}"]`)
        expect(uncontrolledDropdown).toHaveLength(1);
    })

    it(`Should render ${mockTrainingAddresses.length} dropdown item components.`, () => {
        const component = shallow(<LocationDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem);
        expect(dropdownItems).toHaveLength(mockTrainingAddresses.length);
    })

    mockTrainingAddresses.forEach(address => {
        it(`Should render the ${address.alias} option`, () => {
            const component = shallow(<LocationDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
            expect(component).toBeDefined();
            const dropdownItem = component.find(DropdownItem)
                .findWhere(item => item.text() === address.alias);
            expect(dropdownItem).toHaveLength(1);
        })
    })

    it(`Should have the text of the button as the passed in user's training address`, () => {
        const component = shallow(<LocationDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownToggle = component.find(DropdownToggle).children().text();
        expect(dropdownToggle).toBe(mockUser.trainingAddress.alias);
    })

    it(`Should have the passed in user's training address enabled initially`, () => {
        const component = shallow(<LocationDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem);
        const enabledDropdownItem = dropdownItems.find('[active=true]').children().text();
        expect(enabledDropdownItem).toBe(mockUser.trainingAddress.alias);
    })

    it(`Should update the button text when a training address is clicked`, () => {
        const component = shallow(<LocationDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem);
        const enabledDropdownItem = dropdownItems.find('[active=true]').children().text();
        expect(enabledDropdownItem).toBe(mockUser.trainingAddress.alias);
        dropdownItems.forEach(item => {
            const simulatedEvent = {
                currentTarget: {
                    innerText: item.children().text()
                }
            };

            item.simulate('click', simulatedEvent);

            const newActive = component.find(DropdownItem).find('[active=true]')
            expect(newActive.children().text()).toBe(item.children().text());
        })
    })

    it(`Should call the onChange prop function with the correct parameters when a status is clicked`, () => {
        const component = shallow(<LocationDropdown {...{ ...mockProps, currentSMSUser: mockAdminUser }} />);
        expect(component).toBeDefined();
        const dropdownItems = component.find(DropdownItem);
        const enabledDropdownItem = dropdownItems.find('[active=true]').children().text();
        expect(enabledDropdownItem).toBe(mockUser.trainingAddress.alias);
        dropdownItems.forEach(item => {
            const simulatedEvent = {
                currentTarget: {
                    innerText: item.children().text()
                }
            };

            item.simulate('click', simulatedEvent);

            const simulatedTarget = {
                target: {
                    name: inputNames.TRAINING_ALIASES,
                    value: item.children().text()
                }
            }
            expect(mockProps.changeHandler).toHaveBeenCalledWith(simulatedTarget);
        })
    })

    it('Should update the buttonText state when componentDidUpdate is called', () => {
        const mockPrevProps = {
            currentSMSUser: {
                ...mockAdminUser
            },
            updateUser: {
                email: '',
                userId: 0,
                firstName: '',
                lastName: '',
                phoneNumber: '',
                trainingAddress: {
                    addressId: 0,
                    street: '',
                    alias: '',
                    city: '',
                    country: '',
                    state: '',
                    zip: ''
                },
                personalAddress: {
                    addressId: 0,
                    street: '',
                    alias: '',
                    city: '',
                    country: '',
                    state: '',
                    zip: ''
                },
                userStatus: {
                    statusId: 0,
                    generalStatus: '',
                    specificStatus: '',
                    virtual: false
                },
                roles: [],
            },
            trainingAddresses: mockTrainingAddresses,
            changeHandler: jest.fn()
        }

        const mockState = {
            buttonText: mockProps.updateUser.trainingAddress.alias
        }

        const component = shallow(<LocationDropdown {...mockPrevProps} />);
        component.setProps(mockProps);
        expect(component.state()).toEqual(mockState);
    })
})