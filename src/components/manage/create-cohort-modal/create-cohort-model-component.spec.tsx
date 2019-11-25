import React from 'react';
import { shallow } from 'enzyme';
import { ICreateCohortModal } from './create-cohort-modal.container';
import { CreateCohortModal } from './create-cohort-modal.component';
import { IAddress } from '../../../model/IAddress';
import { Button, InputGroup, Dropdown, Modal } from 'reactstrap';

describe('CreateCohortModal', () => {
    let createCohort;
    beforeEach(() => {
        const propAddress: IAddress = {
            addressId: 1,
            street: 'string',
            alias: 'string',
            city: 'string',
            country: 'string',
            state: 'string',
            zip: 'stri'
        }

        const props: ICreateCohortModal = {
            toggleModal: jest.fn(),
            toggleLocationDropdown: jest.fn(),
            toggleTrainerDropdown: jest.fn(),
            saveCohort: jest.fn(),
            updateNewCohortLocation: jest.fn(),
            updateNewCohort: jest.fn(),
            updateLocations: jest.fn(),
            updateNewCohortTrainer: jest.fn(),
            manageGetUsersByGroup: jest.fn(),
            manageUsers:{
                manageUsers:[],
                manageUsersCurrentPage:0,
                manageUsersPageTotal:100,
                emailSearch:'2',
                option:'option',
                componentLoaded:false,
                userTableSort:'sorting'
            },
            createCohort: {
                enabled: true,
                isSaved: false,
                newCohort: {
                    cohortId: 1,
                    cohortName: 'string',
                    cohortDescription: 'string',
                    cohortToken: 'ring',
                    address: propAddress,
                    startDate: 'string', // 2019-01-15
                    endDate: 'string', // yyyy-MM-dd
                    users: [],
                    trainer: {
                        email: 'string',
                        userId: 1,
                        firstName: 'string',
                        lastName: 'string',
                        phoneNumber: 'string',
                        trainingAddress: propAddress,
                        personalAddress: propAddress,
                        userStatus: {
                            statusId: 1,
                            generalStatus: 'string',
                            specificStatus: 'string',
                            virtual: false,
                        },
                        roles: [],
                    },
                },
                locationDropdownActive: false,
                trainerDropdownActive: false
            },
            addresses: {
                trainingAddresses: [propAddress]
            }
        }
        createCohort = shallow(<CreateCohortModal {...props} />);
    });
    
    test('There are only 2 Buttons', () => {
        expect(createCohort.find(Button)).toHaveLength(2);
    })

    test('There are only 3 Input Groups', () => {
        expect(createCohort.find(InputGroup)).toHaveLength(3);
    })

    test('There are only 2 Dropdowns', () => {
        expect(createCohort.find(Dropdown)).toHaveLength(2);
    })

    test('There is only 1 modal', () => {
        expect(createCohort.find(Modal)).toHaveLength(1);
    })

    test('This is the resolves', () => {
        expect(createCohort).resolves;
    })
})