import { shallow } from "enzyme";
import React from 'react';
import { Input } from 'reactstrap';
import { cognitoRoles } from "../../model/cognito-user.model";
import { IUser } from "../../model/IUser";
import LocationDropdown from "./location.dropdown";
import { inputNames, IProfileProps, Profile } from "./profile.component";
import RoleSelector from "./role.selector";
import StatusDropdown from "./status.dropdown";

// tslint:disable-next-line: no-big-function
describe('<SCProfile />', () => {
    let mockProps: IProfileProps;
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
            // tslint:disable-next-line: no-duplicate-string
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
    const mockPassedInUser: IUser = {
        email: 'passedEmail@email.com',
        firstName: 'Passedfirst',
        lastName: 'Passedlast',
        personalAddress: {
            addressId: 0,
            alias: 'tstr',
            city: 'Seattle',
            country: 'America',
            state: 'Washington',
            street: '987 Test St',
            zip: '98101'
        },
        phoneNumber: '1234567',
        roles: [],
        trainingAddress: {
            addressId: 1,
            alias: 'Reston',
            city: 'Reston',
            country: 'United States',
            state: 'VA',
            street: '11730 Plaza America Dr #205',
            zip: '20190',
        },
        userId: 0,
        userStatus: {
            generalStatus: 'Training',
            specificStatus: 'Training',
            statusId: 2,
            virtual: false
        },
    }

    beforeEach(() => {
        mockProps = {
            currentSMSUser: {
                ...mockUser
            },
            trainingAddresses: [
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
            ],
            updateUser: jest.fn(),
            userStatus: [
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
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Panel Pending',
                    statusId: 10,
                    virtual: false
                },
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Staging',
                    statusId: 11,
                    virtual: true
                },
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Bench',
                    statusId: 12,
                    virtual: true
                },
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Waiting for Paperwork',
                    statusId: 13,
                    virtual: true
                },
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Confirmed',
                    statusId: 14,
                    virtual: true
                },
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Project Started',
                    statusId: 15,
                    virtual: true
                },
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Paused',
                    statusId: 16,
                    virtual: true
                },
                {
                    generalStatus: 'Staging',
                    specificStatus: 'Panel Pending',
                    statusId: 17,
                    virtual: true
                }
            ],
        }
    })

    // Ensure component is rendered
    it('Should render the component', () => {
        const component = shallow<Profile>(<Profile {...mockProps} />);
        expect(component).toBeDefined();
    })

    it('Should call the componentDidMount function', () => {
        const mockState = {
            trainingAddresses: mockProps.trainingAddresses,
            updateUser: mockUser,
            userStatus: mockProps.userStatus
        }
        const component = shallow<Profile>(<Profile {...mockProps} />);
        expect(component.state()).toEqual(mockState);
    })

    it('Should call the componentDidUpdate function when updates occur', () => {
        const mockPrevProps = {
            currentSMSUser: {
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
            trainingAddresses: [],
            updateUser: jest.fn(),
            userStatus: [],
        }
        const mockState = {
            trainingAddresses: mockProps.trainingAddresses,
            updateUser: mockUser,
            userStatus: mockProps.userStatus
        }
        const component = shallow<Profile>(<Profile {...mockPrevProps} />);
        component.setProps(mockProps);
        expect(component.state()).toEqual(mockState)
    })

    for (const inputName in inputNames) {
        if (inputNames.hasOwnProperty(inputName)) {
            const inputNameEle = inputNames[inputName];

            // Training location dropdown tests
            if (inputName === 'TRAINING_ALIASES') {
                // Ensure component is rendered
                it(`Should render the ${inputNameEle} component`, () => {
                    const component = shallow(<Profile {...mockProps} />);
                    const locationDropdown = component.find(LocationDropdown);
                    expect(locationDropdown).toBeDefined();
                })

                // Ensure the function call is working properly 
                it(`Should update the ${inputNameEle} state based on event given`, () => {
                    const simulatedEvent = {
                        target: {
                            name: inputNameEle,
                            value: 'USF'
                        }
                    }
                    const newTrainingAddress = mockProps.trainingAddresses[1];
                    const component = shallow<Profile>(<Profile {...mockProps} />);
                    const instance = component.instance();
                    instance.handleClickChange(simulatedEvent);
                    expect(component.state('updateUser')).toEqual({ ...mockUser, trainingAddress: newTrainingAddress });
                })
            } else if (inputName === 'STATUS_ALIASES') {
                // Ensure component is rendered
                it(`Should render the ${inputNameEle} component`, () => {
                    const component = shallow(<Profile {...mockProps} />);
                    const statusDropdown = component.find(StatusDropdown);
                    expect(statusDropdown).toBeDefined();
                })

                // Ensure the function call is working properly 
                it(`Should update the ${inputNameEle} state based on event given`, () => {
                    const simulatedEvent = {
                        target: {
                            name: inputNameEle,
                            value: 'Confirmed'
                        }
                    }
                    const newStatus = mockProps.userStatus.filter(status => {
                        return status.specificStatus === 'Confirmed' && !status.virtual
                    })[0];
                    const component = shallow<Profile>(<Profile {...mockProps} />);
                    const instance = component.instance();
                    instance.handleClickChange(simulatedEvent);
                    expect(component.state('updateUser')).toEqual({ ...mockUser, userStatus: newStatus });
                })
            } else if (inputName === 'VIRTUAL_CHECKBOX') {
                // Ensure the function call is working properly 
                it(`Should update the user status state to virtual`, () => {
                    const simulatedEvent = {
                        target: {
                            name: inputNameEle
                        }
                    }
                    const newStatus = mockProps.userStatus.filter(status => {
                        return status.specificStatus === 'Staging' && status.virtual
                    })[0];
                    const component = shallow<Profile>(<Profile {...mockProps} />);
                    const instance = component.instance();
                    instance.handleClickChange(simulatedEvent);
                    expect(component.state('updateUser')).toEqual({ ...mockUser, userStatus: newStatus });
                })
            } else if (inputName === 'ROLES') {
                // Ensure component is rendered
                it(`Should render the ${inputNameEle} component`, () => {
                    const component = shallow(<Profile {...mockProps} />);
                    const roles = component.find(RoleSelector);
                    expect(roles).toBeDefined();
                })

                // Ensure the function call is working properly 
                it(`Should update the ${inputNameEle} state based on event given`, () => {
                    const simulatedEvent = {
                        target: {
                            name: inputNameEle,
                            value: cognitoRoles.ADMIN
                        }
                    }
                    const simulatedAssociateEvent = {
                        ...simulatedEvent,
                        value: 'associate'
                    }
                    const component = shallow<Profile>(<Profile {...mockProps} />);
                    const instance = component.instance();
                    instance.handleClickChange(simulatedEvent);
                    expect(component.state('updateUser')).toEqual({ ...mockUser, roles: [cognitoRoles.ADMIN] });
                    instance.handleClickChange(simulatedEvent);
                    expect(component.state('updateUser')).toEqual(mockUser);
                    instance.handleClickChange(simulatedEvent);
                    instance.handleClickChange(simulatedAssociateEvent);
                    expect(component.state('updateUser')).toEqual(mockUser);
                })
            } else {
                // Ensure each text box is rendered
                it(`Should contain one ${inputNameEle} input box`, () => {
                    const component = shallow(<Profile {...mockProps} />);
                    const input = component.find(Input).find(`[name="${inputNameEle}"]`);
                    expect(input).toHaveLength(1);
                })

                // Ensure correct information is passed into text boxes
                it(`Should contain one ${inputNameEle} input box with the current user's information if no user prop is passed in`, () => {
                    const value = mockUser[inputNameEle]
                        ? mockUser[inputNameEle]
                        : (mockUser.personalAddress[inputNameEle]);
                    const component = shallow(<Profile {...mockProps} />);
                    const input = component.find(Input).find(`[name="${inputNameEle}"]`)
                        .find(`[value="${value}"]`);
                    expect(input).toHaveLength(1);
                })

                // Ensure passed in user is shown instead of logged in user
                it(`Should contain one ${inputNameEle} input box with the passed user's information if user prop is passed in`, () => {
                    const value = mockPassedInUser[inputNameEle]
                        ? mockPassedInUser[inputNameEle]
                        : (mockPassedInUser.personalAddress[inputNameEle]);
                    const component = shallow(<Profile {...{ ...mockProps, userToUpdate: mockPassedInUser }} />);
                    const input = component.find(Input).find(`[name="${inputNameEle}"]`)
                        .find(`[value="${value}"]`);
                    expect(input).toHaveLength(1);
                })

                // Ensure the onChange function is working properly 
                if (inputName !== 'EMAIL') {
                    it(`Should update the ${inputNameEle} state based on event given`, () => {
                        const address = !mockPassedInUser[inputNameEle];
                        const simulatedEvent = {
                            target: {
                                name: inputNameEle,
                                value: 'changed'
                            }
                        }
                        const component = shallow<Profile>(<Profile {...mockProps} />);
                        const instance = component.instance();
                        instance.handleInputChange(simulatedEvent);
                        if (address) {
                            expect(component.state('updateUser')).toEqual({ ...mockUser, personalAddress: { ...mockUser.personalAddress, [inputNameEle]: 'changed' } });
                        } else {
                            expect(component.state('updateUser')).toEqual({ ...mockUser, [inputNameEle]: 'changed' });
                        }
                    })
                }
            }
        }
    }

    it('Should never get here, but if it does, it\'s handled', () => {
        const simulatedEvent = {
            target: {
                name: 'nothing',
                value: 'changed'
            }
        }
        const component = shallow<Profile>(<Profile {...mockProps} />);
        const instance = component.instance();
        instance.handleClickChange(simulatedEvent);
        expect(component.state('updateUser')).toEqual(mockUser);
    })

    it('Should call the onSubmit function when the form is submitted', () => {
        const simulatedEvent = {
            preventDefault: jest.fn()
        }
        const testProps = [
            mockProps,
            { ...mockProps, userToUpdate: mockPassedInUser }
        ]

        testProps.forEach(propConfiguration => {
            const component = shallow<Profile>(<Profile {...propConfiguration} />);
            const instance = component.instance();
            instance.onSubmit(simulatedEvent);
            expect(simulatedEvent.preventDefault).toHaveBeenCalled();
            if (propConfiguration.userToUpdate) {
                expect(mockProps.updateUser).toHaveBeenCalledWith(mockPassedInUser, propConfiguration.userToUpdate);
            } else {
                expect(mockProps.updateUser).toHaveBeenCalledWith(mockUser, propConfiguration.currentSMSUser, true);
            }
        })

    })
})