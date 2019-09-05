import { shallow } from "enzyme";
import React from 'react';
import { Input } from 'reactstrap';
import { ISCProfileProps, SCProfile } from "./sc-profile.component";
import { IUser } from "../../model/user.model";
import { SCLocationDropdown } from "./sc-location.dropdown";
import { SCStatusDropdown } from "./sc-status.dropdown";
import { SCRoleSelector } from "./sc-role.selector";


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
    ROLES: 'ROLES'
}

describe('<SCProfile />', () => {
    let mockProps: ISCProfileProps;
    const mockUser: IUser = {
        email: inputNames.EMAIL,
        userId: 0,
        firstName: inputNames.FIRST_NAME,
        lastName: inputNames.LAST_NAME,
        phoneNumber: inputNames.PHONE,
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
            street: inputNames.STREET,
            alias: 'tstr',
            city: inputNames.CITY,
            country: inputNames.COUNTRY,
            state: inputNames.STATE,
            zip: inputNames.ZIP
        },
        userStatus: {
            statusId: 2,
            generalStatus: 'Training',
            specificStatus: 'Training',
            virtual: false
        },
        roles: []
    }
    const mockPassedInUser: IUser = {
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

    beforeEach(() => {
        mockProps = {
            currentSMSUser: {
                ...mockUser
            },
            trainingAddresses: {
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
                ]
            },
            userStatus: {
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
                ]
            },
            updateUserSC: jest.fn()
        }
    })

    // Ensure component is rendered
    it('Should render the component', () => {
        const component = shallow(<SCProfile {...mockProps} />);
        expect(component).toBeDefined();
    })

    for (const inputName in inputNames) {
        if (inputNames.hasOwnProperty(inputName)) {
            const inputNamesEle = inputNames[inputName];
            const passedInEle = passedInputNames[inputName];
            if (inputName === 'TRAINING_ALIASES') {
                // Ensure component is rendered
                it(`Should render the ${inputName} component`, () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    const locationDropdown = component.find(SCLocationDropdown);
                    expect(locationDropdown).toBeDefined();
                })
                // Ensure the  is working properly 
                it('Should update the training dropdown based on event given', () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    component.setState({
                        updateUser: mockUser
                    })
                    expect(component).toBeDefined();
                    const input = component.find(SCLocationDropdown);
                        const simulatedEvent = {
                            target: {
                                name: inputName,
                                value: 'USF'
                            }
                        }
                    input.simulate("changeHandler", simulatedEvent);
                    const newInput = component.find(SCLocationDropdown);
                    expect(newInput).toHaveLength(1);
                })
            } else if (inputName === 'STATUS_ALIASES') {
                // Ensure component is rendered
                it(`Should render the ${inputName} component`, () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    const statusDropdown = component.find(SCStatusDropdown);
                    expect(statusDropdown).toBeDefined();
                })
            } else if (inputName === 'ROLES') {
                // Ensure component is rendered
                it(`Should render the ${inputName} component`, () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    const roles = component.find(SCRoleSelector);
                    expect(roles).toBeDefined();
                })
            } else {
                // Ensure each text box is rendered
                it(`Should contain one ${inputName} input box`, () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    const input = component.find(Input).find(`[name="${inputNamesEle}"]`);
                    expect(input).toHaveLength(1);
                })

                // Ensure correct information is passed into text boxes
                it(`Should render the current user's ${inputName} if no user prop is passed in`, () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    const input = component.find(Input).find(`[name="${inputNamesEle}"]`)
                        .find(`[value="${inputNamesEle}"]`);
                    expect(input).toHaveLength(1);
                })

                // Ensure passed in user is shown instead of logged in user
                it(`Should render the passed in user's ${inputName} if user prop is passed in`, () => {
                    const component = shallow(<SCProfile {...{ ...mockProps, userToUpdate: mockPassedInUser }} />);
                    const input = component.find(Input).find(`[name="${inputNamesEle}"]`)
                        .find(`[value="${passedInEle}"]`);
                    expect(input).toHaveLength(1);
                })
                // Ensure the onChange function is working properly 
                it(`Should update the ${inputName} state based on event given`, () => {
                    const component = shallow(<SCProfile {...mockProps} />);
                    component.setState({
                        updateUser: mockUser
                    })
                    expect(component).toBeDefined();
                    const input = component.find(Input).find(`[name="${inputNamesEle}"]`)
                        .find(`[value="${inputNamesEle}"]`);
                    console.log(input.debug());
                        // const infoChange = spyOn(component.instance(), 'onUserInfoChangeHandler');
                    const simulatedEvent = {
                    target: {
                        name: inputName,
                        value: 'changed'
                    }
                }
                    // component.onUserInfoChangeHandler(simulatedEvent);
                    // expect(infoChange).toBeCalled();
                    input.simulate("change", simulatedEvent);
                    const newInput = component.find(Input).find(`[name="${inputNamesEle}"]`)
                        .find(`[value="changed"]`);
                    console.log(newInput.debug());
                    expect(newInput).toHaveLength(1);
                })
            }
        }
    }
})