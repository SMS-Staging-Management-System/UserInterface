import React from 'react';
import { shallow } from 'enzyme';
import { ICreateCohortModal } from './create-cohort-modal.container';
import { CreateCohortModal } from './create-cohort-modal.component';
import { IAddress } from '../../../model/address.model';
import { Button, InputGroup, Dropdown, Modal } from 'reactstrap';

describe('CreateCohortModal', () => {

    test('There are only 2 Buttons', () => {
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

        const createCohort = shallow(<CreateCohortModal {...props} />);
        expect(createCohort.find(Button)).toHaveLength(2);
    })

    test('There are only 3 Input Groups', () => {
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

        const createCohort = shallow(<CreateCohortModal {...props} />);
        expect(createCohort.find(InputGroup)).toHaveLength(3);
    })

    test('There are only 2 Dropdowns', () => {
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

        const createCohort = shallow(<CreateCohortModal {...props} />);
        expect(createCohort.find(Dropdown)).toHaveLength(2);
    })

    test('There is only 1 modal', () => {
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

        const createCohort = shallow(<CreateCohortModal {...props} />);
        expect(createCohort.find(Modal)).toHaveLength(1);
    })

    test('There are only 2 buttons', () => {
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
            toggleModal: () => {},
            toggleLocationDropdown: () => {},
            toggleTrainerDropdown: () => {},
            saveCohort: () => {},
            updateNewCohortLocation: () => {},
            updateNewCohort: () => {},
            updateLocations: () => {},
            updateNewCohortTrainer: () => {},
            manageGetUsersByGroup: () => {},

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
                        roles: ['trainer'],
                    },
                },
                locationDropdownActive: false,
                trainerDropdownActive: false
            },
            addresses: {
                trainingAddresses: [propAddress]
            }
        }

        const createCohort = shallow(<CreateCohortModal {...props} />);
        expect(createCohort).resolves();
    })

    // test('There are only 2 buttons', () => {
    //     const propAddress: IAddress = {
    //         addressId: 1,
    //         street: 'string',
    //         alias: 'string',
    //         city: 'string',
    //         country: 'string',
    //         state: 'string',
    //         zip: 'stri'
    //     }

    //     const props: ICreateCohortModal = {
    //         toggleModal: jest.fn(),
    //         toggleLocationDropdown: jest.fn(),
    //         toggleTrainerDropdown: jest.fn(),
    //         saveCohort: jest.fn(),
    //         updateNewCohortLocation: jest.fn(),
    //         updateNewCohort: jest.fn(),
    //         updateLocations: jest.fn(),
    //         updateNewCohortTrainer: jest.fn(),
    //         manageGetUsersByGroup: jest.fn(),

    //         createCohort: {
    //             enabled: true,
    //             isSaved: false,
    //             newCohort: {
    //                 cohortId: 1,
    //                 cohortName: 'string',
    //                 cohortDescription: 'string',
    //                 cohortToken: 'ring',
    //                 address: propAddress,
    //                 startDate: 'string', // 2019-01-15
    //                 endDate: 'string', // yyyy-MM-dd
    //                 users: [],
    //                 trainer: {
    //                     email: 'string',
    //                     userId: 1,
    //                     firstName: 'string',
    //                     lastName: 'string',
    //                     phoneNumber: 'string',
    //                     trainingAddress: propAddress,
    //                     personalAddress: propAddress,
    //                     userStatus: {
    //                         statusId: 1,
    //                         generalStatus: 'string',
    //                         specificStatus: 'string',
    //                         virtual: false,
    //                     },
    //                     roles: [],
    //                 },
    //             },
    //             locationDropdownActive: false,
    //             trainerDropdownActive: false
    //         },
    //         addresses: {
    //             trainingAddresses: [propAddress]
    //         }
    //     }

    //     const createCohort = shallow(<CreateCohortModal {...props} />);
    //     expect(createCohort.find(Button)).toHaveLength(2);
    // })

    // test('There are only 2 buttons', () => {
    //     const propAddress: IAddress = {
    //         addressId: 1,
    //         street: 'string',
    //         alias: 'string',
    //         city: 'string',
    //         country: 'string',
    //         state: 'string',
    //         zip: 'stri'
    //     }

    //     const props: ICreateCohortModal = {
    //         toggleModal: jest.fn(),
    //         toggleLocationDropdown: jest.fn(),
    //         toggleTrainerDropdown: jest.fn(),
    //         saveCohort: jest.fn(),
    //         updateNewCohortLocation: jest.fn(),
    //         updateNewCohort: jest.fn(),
    //         updateLocations: jest.fn(),
    //         updateNewCohortTrainer: jest.fn(),
    //         manageGetUsersByGroup: jest.fn(),

    //         createCohort: {
    //             enabled: true,
    //             isSaved: false,
    //             newCohort: {
    //                 cohortId: 1,
    //                 cohortName: 'string',
    //                 cohortDescription: 'string',
    //                 cohortToken: 'ring',
    //                 address: propAddress,
    //                 startDate: 'string', // 2019-01-15
    //                 endDate: 'string', // yyyy-MM-dd
    //                 users: [],
    //                 trainer: {
    //                     email: 'string',
    //                     userId: 1,
    //                     firstName: 'string',
    //                     lastName: 'string',
    //                     phoneNumber: 'string',
    //                     trainingAddress: propAddress,
    //                     personalAddress: propAddress,
    //                     userStatus: {
    //                         statusId: 1,
    //                         generalStatus: 'string',
    //                         specificStatus: 'string',
    //                         virtual: false,
    //                     },
    //                     roles: [],
    //                 },
    //             },
    //             locationDropdownActive: false,
    //             trainerDropdownActive: false
    //         },
    //         addresses: {
    //             trainingAddresses: [propAddress]
    //         }
    //     }

    //     const createCohort = shallow(<CreateCohortModal {...props} />);
    //     expect(createCohort.find(Button)).toHaveLength(2);
    // })

    // test('There are only 2 buttons', () => {
    //     const propAddress: IAddress = {
    //         addressId: 1,
    //         street: 'string',
    //         alias: 'string',
    //         city: 'string',
    //         country: 'string',
    //         state: 'string',
    //         zip: 'stri'
    //     }

    //     const props: ICreateCohortModal = {
    //         toggleModal: jest.fn(),
    //         toggleLocationDropdown: jest.fn(),
    //         toggleTrainerDropdown: jest.fn(),
    //         saveCohort: jest.fn(),
    //         updateNewCohortLocation: jest.fn(),
    //         updateNewCohort: jest.fn(),
    //         updateLocations: jest.fn(),
    //         updateNewCohortTrainer: jest.fn(),
    //         manageGetUsersByGroup: jest.fn(),

    //         createCohort: {
    //             enabled: true,
    //             isSaved: false,
    //             newCohort: {
    //                 cohortId: 1,
    //                 cohortName: 'string',
    //                 cohortDescription: 'string',
    //                 cohortToken: 'ring',
    //                 address: propAddress,
    //                 startDate: 'string', // 2019-01-15
    //                 endDate: 'string', // yyyy-MM-dd
    //                 users: [],
    //                 trainer: {
    //                     email: 'string',
    //                     userId: 1,
    //                     firstName: 'string',
    //                     lastName: 'string',
    //                     phoneNumber: 'string',
    //                     trainingAddress: propAddress,
    //                     personalAddress: propAddress,
    //                     userStatus: {
    //                         statusId: 1,
    //                         generalStatus: 'string',
    //                         specificStatus: 'string',
    //                         virtual: false,
    //                     },
    //                     roles: [],
    //                 },
    //             },
    //             locationDropdownActive: false,
    //             trainerDropdownActive: false
    //         },
    //         addresses: {
    //             trainingAddresses: [propAddress]
    //         }
    //     }

    //     const createCohort = shallow(<CreateCohortModal {...props} />);
    //     expect(createCohort.find(Button)).toHaveLength(2);
    // })

    // test('There are only 2 buttons', () => {
    //     const propAddress: IAddress = {
    //         addressId: 1,
    //         street: 'string',
    //         alias: 'string',
    //         city: 'string',
    //         country: 'string',
    //         state: 'string',
    //         zip: 'stri'
    //     }

    //     const props: ICreateCohortModal = {
    //         toggleModal: jest.fn(),
    //         toggleLocationDropdown: jest.fn(),
    //         toggleTrainerDropdown: jest.fn(),
    //         saveCohort: jest.fn(),
    //         updateNewCohortLocation: jest.fn(),
    //         updateNewCohort: jest.fn(),
    //         updateLocations: jest.fn(),
    //         updateNewCohortTrainer: jest.fn(),
    //         manageGetUsersByGroup: jest.fn(),

    //         createCohort: {
    //             enabled: true,
    //             isSaved: false,
    //             newCohort: {
    //                 cohortId: 1,
    //                 cohortName: 'string',
    //                 cohortDescription: 'string',
    //                 cohortToken: 'ring',
    //                 address: propAddress,
    //                 startDate: 'string', // 2019-01-15
    //                 endDate: 'string', // yyyy-MM-dd
    //                 users: [],
    //                 trainer: {
    //                     email: 'string',
    //                     userId: 1,
    //                     firstName: 'string',
    //                     lastName: 'string',
    //                     phoneNumber: 'string',
    //                     trainingAddress: propAddress,
    //                     personalAddress: propAddress,
    //                     userStatus: {
    //                         statusId: 1,
    //                         generalStatus: 'string',
    //                         specificStatus: 'string',
    //                         virtual: false,
    //                     },
    //                     roles: [],
    //                 },
    //             },
    //             locationDropdownActive: false,
    //             trainerDropdownActive: false
    //         },
    //         addresses: {
    //             trainingAddresses: [propAddress]
    //         }
    //     }

    //     const createCohort = shallow(<CreateCohortModal {...props} />);
    //     expect(createCohort.find(Button)).toHaveLength(2);
    // })
})
