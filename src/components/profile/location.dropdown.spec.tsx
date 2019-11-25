import { shallow } from "enzyme";
import React from "react";
import { IUser } from "../../model/users/IUser";
import { LocationDropdown, ILocationDropdownProps } from "./location.dropdown";
import { Button, UncontrolledDropdown, DropdownToggle, DropdownItem } from "reactstrap";
import { cognitoRoles } from "../../model/cognito-user.model";
import { inputNames } from "./profile.component";
import { IAddress } from "../../model/users/IAddress";

// tslint:disable-next-line: no-big-function
describe('<SCLocationDropdown />', () => {
    let mockProps: ILocationDropdownProps;
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
            // tslint:disable-next-line: no-duplicate-string
            country: 'United States',
            state: 'VA',
            street: '11730 Plaza America Dr #205',
            zip: '20190',
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
    const mockTrainingAddresses: IAddress[] = [
        {
            addressId: 1,
            alias: 'Reston',
            city: 'Reston',
            country: 'United States',
            state: 'VA',
            street: '11730 Plaza America Dr #205',
            zip: '20190',
        },
        {
            addressId: 2,
            alias: 'USF',
            city: 'Tampa',
            country: 'United States',
            state: 'FL',
            street: 'Northwest Educational Complex',
            zip: '33613',
        }
    ]

    beforeEach(() => {
        mockProps = {
            changeHandler: jest.fn(),
            currentSMSUser: {
                ...mockUser
            },
            trainingAddresses: mockTrainingAddresses,
            updateUser: {
                ...mockUser
            },
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
        // tslint:disable-next-line: no-duplicate-string
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
            changeHandler: jest.fn(),
            currentSMSUser: {
                ...mockAdminUser
            },
            trainingAddresses: mockTrainingAddresses,
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
        }

        const mockState = {
            buttonText: mockProps.updateUser.trainingAddress.alias
        }

        const component = shallow(<LocationDropdown {...mockPrevProps} />);
        component.setProps(mockProps);
        expect(component.state()).toEqual(mockState);
    })
})