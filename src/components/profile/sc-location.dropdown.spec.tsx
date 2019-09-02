import { shallow } from "enzyme";
import React from "react";
import { IUser } from "../../model/user.model";
import { SCLocationDropdown, ISCLocationDropdownProps } from "./sc-location.dropdown";
import { Button, UncontrolledDropdown, DropdownToggle } from "reactstrap";

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
    STATUS_ALIASES: 'STATUS_ALIASES'
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
    STATUS_ALIASES: 'STATUS_ALIASES'
}

describe('<SCLocationDropdown />', () => {
    let mockProps: ISCLocationDropdownProps;
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

    beforeEach(() => {
        mockProps = {
            currentSMSUser: {
                ...mockUser
            },
            updateUser: {
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
            changeHandler: jest.fn()
        }
    })

    // Ensure component is rendered
    it('Should render the component', () => {
        const component = shallow(<SCLocationDropdown {...mockProps} />);
        expect(component).toBeDefined();
    })

    for (const input in inputNames) {
        if (inputNames.hasOwnProperty(input)) {
            const inputNamesEle = inputNames[input];
            if (input === 'TRAINING_ALIASES') {
                // Ensure button is disabled for users who don't have credentials
                it(`Should contain one ${input} button which is disabled`, () => {
                    const component = shallow(<SCLocationDropdown {...mockProps} />);
                    const button = component.find(Button).find(`[disabled=${true}]`);
                    expect(button).toHaveLength(1);
                })

                // Ensure dropdown is rendered
                it(`Should contain one ${input} uncontrolled dropdown that shows ${mockUser.trainingAddress.alias} initally`, () => {
                    const component = shallow(<SCLocationDropdown {...mockProps} />);
                    const uncontrolledDropdown = component.find(UncontrolledDropdown).find(`[name="${inputNamesEle}"]`);
                    expect(uncontrolledDropdown).toHaveLength(1);
                    const dropdownToggle = uncontrolledDropdown.find(DropdownToggle).render().text();
                    expect(dropdownToggle).toBe(mockUser.trainingAddress.alias);
                })
            }
        }
    }
})
