import { shallow } from "enzyme";
import React from "react";
import { ISCProfileProps } from "./sc-profile.component";
import { IUser } from "../../model/user.model";

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

describe('<SCProfileTrainingLocationButton />', () => {
    let mockProps: ISCProfileProps;
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
            updateUserSC: jest.fn()
        }
    })

    // Ensure component is rendered
    it('Should render the component', () => {
        const component = shallow(<SCProfileTrainingLocationButton {...mockProps} />);
        expect(component).toBeDefined();
    })

})
