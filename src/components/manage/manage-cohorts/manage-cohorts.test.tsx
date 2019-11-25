import React from 'react'
import { shallow } from "enzyme";
import { ManageCohortsComponenent } from "./manage-cohorts.component";
import { ICohort } from "../../../model/ICohort";
import { IAddress } from "../../../model/IAddress";
import { IUser } from "../../../model/IUser";
import { IStatus } from "../../../model/IStatus";
import { IManageCohortsComponentProps } from './manage-cohorts.container';
import { Button, Dropdown } from 'reactstrap';


let addressOne: IAddress =
{
    addressId: 1,
    street: 'elm',
    alias: 'street',
    city: 'new Haven',
    country: 'usa',
    state: 'CT',
    zip: '06511'
}
let status: IStatus = {
    statusId: 1,
    generalStatus: 'pending',
    specificStatus: 'specifically pending',
    virtual: false
}
let userOne: IUser =
{
    email: 'string',
    userId: 2,
    firstName: 'Nae ',
    lastName: 'Chan',
    phoneNumber: '1234567890',
    trainingAddress: addressOne,
    personalAddress: addressOne,
    userStatus: status,
    roles: ['trainer', 'admin'],
    cohorts: []
}
let userArrayOne: IUser[] = [
    {
        email: 'string',
        userId: 2,
        firstName: 'Nae ',
        lastName: 'Chan',
        phoneNumber: '1234567890',
        trainingAddress: addressOne,
        personalAddress: addressOne,
        userStatus: status,
        roles: ['trainer', 'admin'],
        cohorts: []
    }
]
let cohortOne: ICohort[] = [
    {
        cohortId: 2,
        cohortName: 'Nae-Group',
        cohortDescription: 'group for naes',
        cohortToken: "loveNae",
        address: addressOne,
        startDate: '2019-01-15',
        endDate: '2019-05-15',
        users: userArrayOne,
        trainer: userOne
    }
]
const fakeProps: IManageCohortsComponentProps = {
    cohorts: cohortOne,
    currentPage: 2,
    totalPages: 2,
    updateCohorts: jest.fn().mockImplementation(() => null),
    updateCohortsByPage: jest.fn().mockImplementation(() => null),
    toggleCreateCohortModal: jest.fn().mockImplementation(() => null),
    toggleViewCohortModal: jest.fn().mockImplementation(() => null),
    hoveredCohort: jest.fn().mockImplementation(() => null),
}

describe('Cohort Component', () => {
    test('Cohort Component Resolves', () => {

        const testCohortComponentResults = shallow(<ManageCohortsComponenent {...fakeProps} />)
        expect(testCohortComponentResults).resolves;

    })
    test('number of buttons', () => {
        const testCohortComponentResults = shallow(<ManageCohortsComponenent {...fakeProps} />)
        expect (testCohortComponentResults.find('Button')).toHaveLength(3)
    })
    test('number of dropdowns', () => {
        const testCohortComponentResults = shallow(<ManageCohortsComponenent {...fakeProps} />)
        expect(testCohortComponentResults.find(Dropdown)).toHaveLength(1)
    })

})
