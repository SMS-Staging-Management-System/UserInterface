import { shallow } from "enzyme";
import React from 'react';
import { Input } from 'reactstrap';
import { cognitoRoles } from "../../model/cognito-user.model";
import { IUser } from "../../model/user.model";
import SCLocationDropdown from "./sc-location.dropdown";
import { inputNames, ISCProfileProps, SCProfile } from "./sc-profile.component";
import SCRoleSelector from "./sc-role.selector";
import SCStatusDropdown from "./sc-status.dropdown";

describe('<SCProfile />', () => {
    let mockProps: ISCProfileProps;
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
    const mockPassedInUser: IUser = {
        email: 'passedEmail@email.com',
        userId: 0,
        firstName: 'Passedfirst',
        lastName: 'Passedlast',
        phoneNumber: '1234567',
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
            street: '987 Test St',
            alias: 'tstr',
            city: 'Seattle',
            country: 'America',
            state: 'Washington',
            zip: '98101'
        },
        userStatus: {
            statusId: 2,
            generalStatus: 'Training',
            specificStatus: 'Training',
            virtual: false
        },
        roles: []
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
            ],
            userStatus: [
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
            ],
            updateUserSC: jest.fn()
        }
    })

    // Ensure component is rendered
    it('Should render the component', () => {
        const component = shallow<SCProfile>(<SCProfile {...mockProps} />);
        expect(component).toBeDefined();
    })

    // it('Should call the componentDidMount function', () => {
    //     const mockState = {
    //         updateUser: mockUser,
    //         trainingAddresses: mockProps.trainingAddresses,
    //         userStatus: mockProps.userStatus
    //     }
    //     const component = shallow<SCProfile>(<SCProfile {...mockProps} />);
    //     const instance = component.instance();
    //     instance.componentDidMount();
    //     expect(instance.props).toEqual(mockProps);
    //     expect(instance.state).toEqual(mockProps);
    // })

    for (const inputName in inputNames) {
        const inputNameEle = inputNames[inputName];

        // Training location dropdown tests
        if (inputName === 'TRAINING_ALIASES') {
            // Ensure component is rendered
            it(`Should render the ${inputNameEle} component`, () => {
                const component = shallow(<SCProfile {...mockProps} />);
                const locationDropdown = component.find(SCLocationDropdown);
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
                const component = shallow<SCProfile>(<SCProfile {...mockProps} />);
                const instance = component.instance();
                instance.handleClickChange(simulatedEvent);
                expect(component.state('updateUser')).toEqual({ ...mockUser, trainingAddress: newTrainingAddress });
            })
        } else

            // Status dropdown tests
            if (inputName === 'STATUS_ALIASES') {
                // Ensure component is rendered
                it(`Should render the ${inputNameEle} component`, () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    const statusDropdown = component.find(SCStatusDropdown);
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
                    const component = shallow<SCProfile>(<SCProfile {...mockProps} />);
                    const instance = component.instance();
                    instance.handleClickChange(simulatedEvent);
                    expect(component.state('updateUser')).toEqual({ ...mockUser, userStatus: newStatus });
                })
            } else

                if (inputName === 'VIRTUAL_CHECKBOX') {
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
                        const component = shallow<SCProfile>(<SCProfile {...mockProps} />);
                        const instance = component.instance();
                        instance.handleClickChange(simulatedEvent);
                        expect(component.state('updateUser')).toEqual({ ...mockUser, userStatus: newStatus });
                    })
                } else

                    // Role select tests
                    if (inputName === 'ROLES') {
                        // Ensure component is rendered
                        it(`Should render the ${inputNameEle} component`, () => {
                            const component = shallow(<SCProfile {...mockProps} />);
                            const roles = component.find(SCRoleSelector);
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
                            const component = shallow<SCProfile>(<SCProfile {...mockProps} />);
                            const instance = component.instance();
                            instance.handleClickChange(simulatedEvent);
                            expect(component.state('updateUser')).toEqual({ ...mockUser, roles: [cognitoRoles.ADMIN] });
                        })
                    }

                    // All other form tests
                    else {
                        // Ensure each text box is rendered
                        it(`Should contain one ${inputNameEle} input box`, () => {
                            const component = shallow(<SCProfile {...mockProps} />);
                            const input = component.find(Input).find(`[name="${inputNameEle}"]`);
                            expect(input).toHaveLength(1);
                        })

                        // Ensure correct information is passed into text boxes
                        it(`Should contain one ${inputNameEle} input box with the current user's information if no user prop is passed in`, () => {
                            const value = mockUser[inputNameEle]
                                ? mockUser[inputNameEle]
                                : (mockUser.personalAddress[inputNameEle]);
                            const component = shallow(<SCProfile {...mockProps} />);
                            const input = component.find(Input).find(`[name="${inputNameEle}"]`)
                                .find(`[value="${value}"]`);
                            expect(input).toHaveLength(1);
                        })

                        // Ensure passed in user is shown instead of logged in user
                        it(`Should contain one ${inputNameEle} input box with the passed user's information if user prop is passed in`, () => {
                            const value = mockPassedInUser[inputNameEle]
                                ? mockPassedInUser[inputNameEle]
                                : (mockPassedInUser.personalAddress[inputNameEle]);
                            const component = shallow(<SCProfile {...{ ...mockProps, userToUpdate: mockPassedInUser }} />);
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
                                const component = shallow<SCProfile>(<SCProfile {...mockProps} />);
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

    it('Should call the onSubmit function when the form is submitted', () => {
        const simulatedEvent = {
            preventDefault: jest.fn()
        }
        const testProps = [
            mockProps,
            { ...mockProps, userToUpdate: mockPassedInUser }
        ]

        testProps.forEach(propConfiguration => {
            const component = shallow<SCProfile>(<SCProfile {...propConfiguration} />);
            const instance = component.instance();
            instance.onSubmit(simulatedEvent);
            expect(simulatedEvent.preventDefault).toHaveBeenCalled();
            if (propConfiguration.userToUpdate) {
                expect(mockProps.updateUserSC).toHaveBeenCalledWith(mockPassedInUser, propConfiguration.userToUpdate);
            } else {
                expect(mockProps.updateUserSC).toHaveBeenCalledWith(mockUser, propConfiguration.currentSMSUser, true);
            }
        })

    })
})