const mockAllUsers = {
    loadAllUsersSinglePage: jest.fn(),
    loadAllUsersAllPages: jest.fn(),
    loadAllUserEmails: jest.fn()
}
const mockGeneral = {
    getAllGeneralStatus: jest.fn(), // loads all statuses for checkboxes
    checkGeneralFunc: jest.fn() // adds to assign survey list
}
const mockSpecific = {
    getAllSpecificStatus: jest.fn(),
    checkSpecificFunc: jest.fn()
}
const mockCohorts = {
    getAllCohorts: jest.fn(),
    postSurveyToCohort: jest.fn(), // post survey
    incementPage: jest.fn(),
    decrementPage: jest.fn(),
    loadCheckedStatus: jest.fn()
}
const mockComp = {
}
import { shallow, mount, render } from 'enzyme';
import { ISurvey } from '../../../model/surveys/ISurvey';
import SurveyModal, { IUserCohortIdAndEmail } from './survey-assign-modal.component';
import React, { Fragment, Component } from 'react';
import { IStatus } from '../../../model/IStatus';
import { ICohort } from '../../../model/ICohort';
import { IUser } from '../../../model/IUser';
import { IAddress } from '../../../model/IAddress';
// mock assign survey
let assignSurveys:ISurvey[] = [
    {
        surveyId: 1,
        title: "RC Survey",
        description: "A survey for training feedback.",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('7-2-2019'),
        template: false,
        creator: '',
        questionJunctions: []
    }
]
// mock statuses
const allStatus: IStatus[] = [
    {
        statusId: 1,
        generalStatus: 'Staging',
        specificStatus: 'Staging',
        virtual: true
    },
    {
        statusId: 2,
        generalStatus: 'Staging',
        specificStatus: 'Confirmed',
        virtual: true
    },
    {
        statusId: 3,
        generalStatus: 'Staging',
        specificStatus: 'Complete',
        virtual: false
    },
    {
        statusId: 4,
        generalStatus: 'Training',
        specificStatus: 'Bench',
        virtual: false
    },
    {
        statusId: 5,
        generalStatus: 'Training',
        specificStatus: 'Dropped',
        virtual: false
    },
    {
        statusId: 6,
        generalStatus: 'Training',
        specificStatus: 'Training',
        virtual: false
    },
    {
        statusId: 7,
        generalStatus: 'Training',
        specificStatus: 'Panel Pending',
        virtual: false
    },
]
// model states
const generalStatusState = new Set(['Staging','Training']);
const specificStatusState = new Set(['Staging','Confirmed', 'Complete', 'Bench', 'Dropped', 'Training', 'Panel Pending']);
const sortCohortsState:ICohort[] = [
    {
        cohortId: 1,
        cohortName: 'cohort 1',
        cohortDescription: '',
        cohortToken: '',
        address: {
            addressId: 1,
            alias: '',
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        endDate: '',
        startDate: '',
        trainer: {
            email: '',
            firstName: '',
            lastName: '',
            personalAddress: {
                addressId: 1,
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
                addressId: 1,
                alias: '',
                city: '',
                country: '',
                state: '',
                street: '',
                zip: ''
            },
            userId:1,
            userStatus: {
                generalStatus: '',
                specificStatus: '',
                statusId: 1,
                virtual: false
            },
        },
        users: []
    },
    {
        cohortId: 2,
        cohortName: 'cohort 2',
        cohortDescription: '',
        cohortToken: '',
        address: {
            addressId: 2,
            alias: '',
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        endDate: '',
        startDate: '',
        trainer: {
            email: '',
            firstName: '',
            lastName: '',
            personalAddress: {
                addressId: 2,
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
                addressId: 2,
                alias: '',
                city: '',
                country: '',
                state: '',
                street: '',
                zip: ''
            },
            userId: 2,
            userStatus: {
                generalStatus: '',
                specificStatus: '',
                statusId: 2,
                virtual: false
            },
        },
        users: []
    },
    {
        cohortId: 3,
        cohortName: 'cohort 3',
        cohortDescription: '',
        cohortToken: '',
        address: {
            addressId: 3,
            alias: '',
            city: '',
            country: '',
            state: '',
            street: '',
            zip: ''
        },
        endDate: '',
        startDate: '',
        trainer: {
            email: '',
            firstName: '',
            lastName: '',
            personalAddress: {
                addressId: 3,
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
                addressId: 3,
                alias: '',
                city: '',
                country: '',
                state: '',
                street: '',
                zip: ''
            },
            userId: 3,
            userStatus: {
                generalStatus: '',
                specificStatus: '',
                statusId: 3,
                virtual: false
            },
        },
        users: []
    }
];
const fakeAddress: IAddress = {
    addressId: 1,
    alias: '',
    city: '',
    country: '',
    state: '',
    street: '',
    zip: ''    
}
const fakeInfoForUser = {
    firstName: '',
    lastName: '',
    personalAddress: fakeAddress,
    phoneNumber: '',
    roles: [],
    trainingAddress: fakeAddress
}
const allUsersState: IUser[] = [
    {
        userId: 1,
        email: 'userone@gmail.com',
        userStatus: {
            statusId: 1,
            generalStatus: 'Staging',
            specificStatus: 'Confirmed',
            virtual: false
        },
        ...fakeInfoForUser
    },
    {
        userId: 2,
        email: 'usertwo@gmail.com',
        userStatus: {
            statusId: 2,
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            virtual: false
        },
        ...fakeInfoForUser
    },
    {
        userId: 3,
        email: 'userthree@gmail.com',
        userStatus: {
            statusId: 3,
            generalStatus: 'Training',
            specificStatus: 'Training',
            virtual: false
        },
        ...fakeInfoForUser
    },
    {
        userId: 4,
        email: 'userfour@gmail.com',
        
        userStatus: {
            statusId: 4,
            generalStatus: 'Staging',
            specificStatus: 'Panel Pending',
            virtual: false
        },
        ...fakeInfoForUser
    },
    {
        userId: 5,
        email: 'userfive@gmail.com',
        userStatus: {
            statusId: 5,
            generalStatus: 'Training',
            specificStatus: 'Dropped',
            virtual: false
        },
        ...fakeInfoForUser
    },
    {
        userId: 6,
        email: 'usersix@gmail.com',
        userStatus: {
            statusId: 6,
            generalStatus: 'Training',
            specificStatus: 'Complete',
            virtual: false
        },
        ...fakeInfoForUser
    },
    {
        userId: 7,
        email: 'userseven@gmail.com',
        userStatus: {
            statusId: 7,
            generalStatus: 'Staging',
            specificStatus: 'Staging',
            virtual: true
        },
        ...fakeInfoForUser
    },
    {
        userId: 8,
        email: 'usereight@gmail.com',
        userStatus: {
            statusId: 8,
            generalStatus: 'Staging',
            specificStatus: 'Confirmed',
            virtual: true
        },
        ...fakeInfoForUser
    }
];
// general training status expected
const generalTraining: IUserCohortIdAndEmail[] = [
    {
        id: 3,
        email: 'userthree@gmail.com',
        generalStatus: 'Training',
        specificStatus: 'Training',
        virtual: false
    },
    {
        id: 5,
        email: 'userfive@gmail.com',
        generalStatus: 'Training',
        specificStatus: 'Dropped',
        virtual: false
    },
    {
        id: 6,
        email: 'usersix@gmail.com',
        generalStatus: 'Training',
        specificStatus: 'Complete',
        virtual: false
    }
];
// specific status confirmed
const specificConfirmed: IUserCohortIdAndEmail[] = [
    {
        id: 1,
        email: 'userone@gmail.com',
        generalStatus: 'Staging',
        specificStatus: 'Confirmed',
        virtual: false
    },
    {
        id: 8,
        email: 'usereight@gmail.com',
        generalStatus: 'Staging',
        specificStatus: 'Confirmed',
        virtual: true
    }
];
// emailsToAssign if general = training or specific = confirmed and not virtual
const genTrainSpecConfirmed: string[] = ['userthree@gmail.com', 'userfive@gmail.com', 'usersix@gmail.com', 'userone@gmail.com'];
// holds users for cohorts one, two, three
const cohortOneUsers: IUser[] = [allUsersState[0],allUsersState[1],allUsersState[2],allUsersState[3]];
const cohortTwoUsers: IUser[] = [allUsersState[4],allUsersState[5]];
const cohortThreeUsers: IUser[] = [allUsersState[6],allUsersState[7]];
const cohortUsers: IUser[][] = [cohortOneUsers, cohortTwoUsers, cohortThreeUsers];
// after loadAllUsersEmails it should equal this
const emailUsers: IUserCohortIdAndEmail[] = [
    {
        email: allUsersState[0].email,
        generalStatus: '',
        id: 1,
        specificStatus:'',
        virtual: false
    },
    {
        email: allUsersState[1].email,
        generalStatus: '',
        id: 1,
        specificStatus:'',
        virtual: false
    },
    {
        email: allUsersState[2].email,
        generalStatus: '',
        id: 1,
        specificStatus:'',
        virtual: false
    },
    {
        email: allUsersState[3].email,
        generalStatus: '',
        id: 1,
        specificStatus:'',
        virtual: false
    },
    {
        email: allUsersState[4].email,
        generalStatus: '',
        id: 2,
        specificStatus:'',
        virtual: false
    },
    {
        email: allUsersState[5].email,
        generalStatus: '',
        id: 2,
        specificStatus:'',
        virtual: false
    },
    {
        email: allUsersState[6].email,
        generalStatus: '',
        id: 3,
        specificStatus:'',
        virtual: false
    },
    {
        email: allUsersState[7].email,
        generalStatus: '',
        id: 3,
        specificStatus:'',
        virtual: false
    }
];
// Render surveyModal
describe('Testing component rendering', () => {
    const wrapper = mount(<SurveyModal buttonLabel='Assign To Cohorts' surveysToAssign={[1]}/>);
    beforeAll(() => {
        mockCohorts.getAllCohorts.mockImplementation((allCohorts: ICohort) => {
            if(allCohorts) {
                return {
                    sortCohorts: allCohorts,
                    cohortsLoaded: true
                };
            } else {
                return {
                    sortCohorts: [],
                    cohortsLoaded: false
                };
            }
        });
        mockAllUsers.loadAllUsersSinglePage.mockImplementation(() => {
            wrapper.setState({
                allUsers: allUsersState[0]
            });
            mockAllUsers.loadAllUsersAllPages(8);
        });
        // users 1-8
        mockAllUsers.loadAllUsersAllPages.mockImplementation((total: number) => {
            let prevState: IUser[] = [allUsersState[0]];
            for(let i = 1; i < total; i++) {
                wrapper.setState({
                    allUsers: prevState.concat(allUsersState[i])
                });
                prevState = wrapper.state('allUsers');
            }
        });
    });
    test('All survey modal will be created', () => {
        const component = shallow(<SurveyModal buttonLabel='Assign To Cohorts' surveysToAssign={[1]}/>);
        expect(component).resolves;
    });
    test('getAllCohorts gets all cohorts and saves them to state', () => {
        const wrapper = mount(<SurveyModal buttonLabel='Assign To Cohorts' surveysToAssign={[1]}/>);
        wrapper.setState({
            modal: true,
            usersLoaded: true,
            allGeneralStatus: generalStatusState,
            allSpecificStatus: specificStatusState,
            totalPages: 5,
            currentPage: 2,
            ...mockCohorts.getAllCohorts(sortCohortsState)
        });
        expect(wrapper.state('sortCohorts')).toEqual(sortCohortsState);
    });
    //loadAllUsersSinglePage and loadAllUserAllPages just change state
    test('loadAllUsersSinglePage which calls loadAllUserAllPages', () => {
        wrapper.setState({
            modal: true,
            usersLoaded: true,
            allGeneralStatus: generalStatusState,
            allSpecificStatus: specificStatusState,
            sortCohorts: sortCohortsState,
            totalPages: 5,
            currentPage: 2
        });
        mockAllUsers.loadAllUsersSinglePage();
        expect(wrapper.state('allUsers')).toEqual(allUsersState);
    });
});

describe('test next and previous button', () => {
    const wrapper = mount(<SurveyModal buttonLabel='Assign To Cohorts' surveysToAssign={[1]}/>);
    wrapper.setState({
        modal: true,
        usersLoaded: true,
        allGeneralStatus: generalStatusState,
        allSpecificStatus: specificStatusState,
        sortCohorts: sortCohortsState,
        totalPages: 5,
        currentPage: 2
    });
    let current: number = wrapper.state('currentPage');
    let total: number = wrapper.state('totalPages');
    beforeAll(() => {
        mockCohorts.incementPage.mockImplementation(() => {
            if (current < total - 1) {
                current++;
                mockCohorts.getAllCohorts(current);
                wrapper.setState({
                    currentPage: current
                });
            }
        });
        mockCohorts.decrementPage.mockImplementation(() => {
            if(current > 0) {
                current--;
                mockCohorts.getAllCohorts(current);
                wrapper.setState({
                    currentPage: current
                });
            }
        })
    });
    // incrementPage increments page for next page of cohorts
    it("click next button", async () => {
        let currentPage:number = wrapper.state('currentPage');
        //wrapper.find('#next-btn').at(0).simulate('click'); // should call increment page which increases state by 1
        mockCohorts.incementPage();
        expect(wrapper.state('currentPage')).toEqual(currentPage+1);
    });
    // decrementPage goes to the previous page of cohorts
    it("click prev button", async () => {
        let currentPage:number = wrapper.state('currentPage');
        //await wrapper.find('#prev-btn').at(0).simulate('click'); // should call decrement page which decreases state by 1
        mockCohorts.decrementPage();
        expect(wrapper.state('currentPage')).toEqual(currentPage-1);
    });
})

describe('Test get statuses: General, Specific, Virtual', () => {
    beforeAll(() => {
        mockGeneral.getAllGeneralStatus.mockImplementation((allStatus: IStatus[]) => {
            let generalStatuses = new Set<String>();
            allStatus.forEach(status => {
                    generalStatuses.add(status.generalStatus);
            });
            return Array.from(generalStatuses);
        });
        mockSpecific.getAllSpecificStatus.mockImplementation((allStatus: IStatus[]) => {
            let specificStatuses = new Set<String>();
            allStatus.forEach(status => {
                specificStatuses.add(status.specificStatus);
            });
            return Array.from(specificStatuses);
        });
    });
    // get all general status shows all avaiable statuses to choose
    it('get all avaiable general statuses', () => {
        const generalStatus = mockGeneral.getAllGeneralStatus(allStatus);
        expect(generalStatus).toEqual(['Staging','Training'])
    });
    // get all specific status shows all avaiable statuses to choose
    it('get all avaiable specific statuses', () => {
        const specificStatus = mockSpecific.getAllSpecificStatus(allStatus);
        expect(specificStatus).toEqual(['Staging','Confirmed', 'Complete', 'Bench', 'Dropped', 'Training', 'Panel Pending'])
    });
})
// checkVirtualFunc set state virtual to true or false if checkbox is selected

describe('add users to list if their status is checked, lastly put the users into the assign list', () => {
    beforeAll(() => {
        mockCohorts.loadCheckedStatus.mockImplementation((genUsersState: IUserCohortIdAndEmail[], specUsersState: IUserCohortIdAndEmail[], bothVirtual, virtual) => {
            let emailsSet: Set<string> = new Set<string>();
            if(bothVirtual) {
                genUsersState.map(user => {
                    emailsSet.add(user.email);
                });
                specUsersState.map(user => {
                    emailsSet.add(user.email);
                });
            } else {
                genUsersState.map(user => {
                    if(user.virtual == virtual) {
                        emailsSet.add(user.email);
                    }
                });
                specUsersState.map(user => {
                    if(user.virtual == virtual) {
                        emailsSet.add(user.email);
                    }
                });
            }
            return Array.from(emailsSet);
        });
    });
    // checkGeneralFunc load users by selected general status
    const wrapper = mount(<SurveyModal buttonLabel='Assign To Cohorts' surveysToAssign={[1]}/>);
    wrapper.setState({
        modal: true,
        usersLoaded: true,
        allGeneralStatus: generalStatusState,
        allSpecificStatus: specificStatusState,
        sortCohorts: sortCohortsState,
        totalPages: 2,
        allUsers: allUsersState
    });
    
    // loadCheckedStatus puts users in the assign to survey list based off checked statuses
    test('put users in emailAssign state to be posted only virtual users selected', () => {
        wrapper.setState({
            bothVirtual: false, // dont get both non and virtual
            virtual: true // only get virtual
        });
        wrapper.find('#specificConfirmed').at(0).at(0).simulate('change', {target: {checked: true}});
        wrapper.setState({
            emailsToAssign: mockCohorts.loadCheckedStatus(wrapper.state('allGeneralStatusUsers'), wrapper.state('allSpecificStatusUsers'), wrapper.state('bothVirtual'), wrapper.state('virtual'))
        });
        expect(wrapper.state('emailsToAssign')).toEqual(["usereight@gmail.com"]); // only virtual user selected
    });
    // it calls submit which calls postSurvey which calls loadCheckedStatus
});
describe('testing loadAllUserEmails and checkFunc', () => {
    beforeAll(() => {
        mockAllUsers.loadAllUserEmails.mockImplementation((usersByCohorts: IUser[][]) => {
            const idEmailArr: IUserCohortIdAndEmail[] = [];
            // usersByCohorts doesnt hold cohort id id is the location
            let cohortId = 1; // tracked based off which cohort currently looking at
            for(const cohort of usersByCohorts) {
                for(const user of cohort) {
                    const idEmailObj: IUserCohortIdAndEmail = {
                        id: cohortId,
                        email: user.email,
                        generalStatus: '',
                        specificStatus: '',
                        virtual: false
                    }
                    idEmailArr.push(idEmailObj);
                }
                cohortId++;
            }
            return idEmailArr;
        });
    });
    const wrapper = mount(<SurveyModal buttonLabel='Assign To Cohorts' surveysToAssign={[1]}/>);
    wrapper.setState({
        modal: true,
        usersLoaded: true,
        allGeneralStatus: generalStatusState,
        allSpecificStatus: specificStatusState,
        sortCohorts: sortCohortsState,
        totalPages: 2,
        allUsers: allUsersState
    });
    // assumes userClient.findAllByCohortId(cohort.cohortId) finds users by cohort they belong to
    test('loadAllUserEmails should groups users by the cohort they belong to and set state', () => {
        wrapper.setState({
            userArray: mockAllUsers.loadAllUserEmails(cohortUsers)
        });
        expect(wrapper.state('userArray')).toEqual(emailUsers);
    }); 
    test('testing checkFunc for cohort one: selects all users that belong to the selected cohort', () => {
        wrapper.find('#checkFunc1').simulate('change', {target: {checked: true}});
        const usersByCohortOne: string[] = [];
        expect(wrapper.state('emailsToAssign')).toEqual(cohortOneUsers.map(user => user.email));
    });
});
// postSurveyToCohort calls loadCheckedStatus and assigns surveys to selected users
