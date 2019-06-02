const mockReturn = {
    returnPassedSurveys: jest.fn(),
    returnActiveSurveys: jest.fn()
}

import { shallow, mount, render } from 'enzyme';
import { ISurvey } from '../../../model/surveys/survey.model';
import { AllSurveysComponent } from './all-surveys.component';
import { RouteComponentProps } from 'react-router';
import { IAuthState } from '../../../reducers/management';
import { createBrowserHistory } from 'history';
import React, { Fragment, Component } from 'react';

let exampleArr:ISurvey[] = [
    {
        surveyId: 4,
        title: "RC Survey",
        description: "A survey for training feedback.",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('7-2-2019'),
        template: false,
        published: true
    },
    {
        surveyId: 5,
        title: "Testing2",
        description: "A survey for testing",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('5-24-2019'),
        template: false,
        published: true
    },
    {
        surveyId: 6,
        title: "Testingstuff",
        description: "A survey for more testing",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('5-10-2019'),
        template: false,
        published: true
    }

]

let exArr:ISurvey[] = [
    {
        surveyId: 1,
        title: "Survey 1",
        description: "A survey for some testing with null closing date.",
        dateCreated: new Date('5/31/2019'),
        closingDate: null,
        template: false,
        published: true
    },
    {
        surveyId: 2,
        title: "Survey 2",
        description: "A survey for testing without null",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('5-24-2019'),
        template: false,
        published: true
    },
    {
        surveyId: 3,
        title: "Survey 3",
        description: "A survey for testing an active date",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('7-10-2019'),
        template: false,
        published: true
    }

]

let exArray:ISurvey[] = [
    {
        surveyId: 7,
        title: "Survey 7",
        description: "A survey for some testing with null closing date.",
        dateCreated: new Date('5/31/2019'),
        closingDate: null,
        template: false,
        published: true
    },
    {
        surveyId: 8,
        title: "Survey 8",
        description: "A survey for testing with null closing date",
        dateCreated: new Date('5/31/2019'),
        closingDate: null,
        template: false,
        published: true
    },
    {
        surveyId: 9,
        title: "Survey 9",
        description: "A survey for testing more null dates",
        dateCreated: new Date('5/31/2019'),
        closingDate: null,
        template: false,
        published: true
    }

]

let allPassedSurveys:ISurvey[] = [
    {
        surveyId: 1,
        title: "Survey 1",
        description: "A survey for some testing with null closing date.",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('5-24-2019'),
        template: false,
        published: true
    },
    {
        surveyId: 2,
        title: "Survey 2",
        description: "A survey for testing without null",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('5-24-2019'),
        template: false,
        published: true
    },
    {
        surveyId: 3,
        title: "Survey 3",
        description: "A survey for testing an active date",
        dateCreated: new Date('5/31/2019'),
        closingDate: new Date('5-24-2019'),
        template: false,
        published: true
    }

]

interface IComponentProps extends RouteComponentProps<{}> {
    auth: IAuthState;
}
let filler: any = null;
let d:IComponentProps = {auth: {
                            currentUser: {
                                email: "black.kruppa@revature.com",
                                roles: ['staging-manager', 'trainer', 'admin']
                            }
                        },
                        history: createBrowserHistory(),
                        location: filler,
                        match: filler
                    }

describe('Testing component rendering', () => {
    test('All surveys will be rendered', () => {
        
       const component = shallow(<AllSurveysComponent {...d}/>);
       expect(component).resolves;
    })
})


describe('All surveys should return active and closed surveys', () => {

    beforeAll(() => {
        mockReturn.returnPassedSurveys.mockImplementation((arr) => {
            let closingSurvey = arr;
            let filtered:ISurvey[] = [];
            for(let i = 0; i < closingSurvey.length; i++) {
                if(closingSurvey[i].closingDate !== null) {
                    if(new Date(closingSurvey[i].closingDate) < new Date()) {
                        filtered.push(closingSurvey[i]);
                    }
                }
            }
            return filtered;
        });

        mockReturn.returnActiveSurveys.mockImplementation((arr) => {
            let activeSurvey = arr;
            let filtered:ISurvey[] = [];
            filtered = activeSurvey.filter((survey) => {
                if(new Date(survey.closingDate) > new Date()){
                    return true;
                } else if(survey.closingDate === null){
                    return true;
                }
                return false;
            });
            return filtered;
        });
    })

    
    test('Return active should return all surveys with dates greater than current date.', () => {
        const filteredList = mockReturn.returnActiveSurveys(exampleArr);
        expect(filteredList).toEqual([
            {
                surveyId: 4,
                title: "RC Survey",
                description: "A survey for training feedback.",
                dateCreated: new Date('5/31/2019'),
                closingDate: new Date('7-2-2019'),
                template: false,
                published: true
            }
        ]);
    })
    
    test('Return active should return surveys with null and dates', () => {
        const filteredList = mockReturn.returnActiveSurveys(exArr);
        expect(filteredList).toEqual([
            {
                surveyId: 1,
                title: "Survey 1",
                description: "A survey for some testing with null closing date.",
                dateCreated: new Date('5/31/2019'),
                closingDate: null,
                template: false,
                published: true
            },
            {
                surveyId: 3,
                title: "Survey 3",
                description: "A survey for testing an active date",
                dateCreated: new Date('5/31/2019'),
                closingDate: new Date('7-10-2019'),
                template: false,
                published: true
            },
        ]);
    });

    test('Should return all surveys from exArray', () => {
        const filteredList = mockReturn.returnActiveSurveys(exArray);
        expect(filteredList).toEqual(exArray);
    });

    test('Should return no surveys from allPassedSurveys', () => {
        const filteredList = mockReturn.returnActiveSurveys(allPassedSurveys);
        expect(filteredList).toEqual([]);
    });

    test('Return passed should return all surveys with dates less than the current date.', () => {
        const filteredList = mockReturn.returnPassedSurveys(exampleArr);
        expect(filteredList).toEqual([{
            surveyId: 5,
            title: "Testing2",
            description: "A survey for testing",
            dateCreated: new Date('5/31/2019'),
            closingDate: new Date('5-24-2019'),
            template: false,
            published: true
        },
        {
            surveyId: 6,
            title: "Testingstuff",
            description: "A survey for more testing",
            dateCreated: new Date('5/31/2019'),
            closingDate: new Date('5-10-2019'),
            template: false,
            published: true
        }]);
    });

    test('Return passed should return surveys with dates.', () => {
        const filteredList = mockReturn.returnPassedSurveys(exArr);
        expect(filteredList).toEqual([
            {
                surveyId: 2,
                title: "Survey 2",
                description: "A survey for testing without null",
                dateCreated: new Date('5/31/2019'),
                closingDate: new Date('5-24-2019'),
                template: false,
                published: true
            }
        ]);
    });


    test('Should return no surveys because of the null closing dates', () => {
        const filteredList = mockReturn.returnPassedSurveys(exArray);
        expect(filteredList).toEqual([]);
    });

    test('Should return all surveys from allPassedSurveys', () => {
        const filteredList = mockReturn.returnPassedSurveys(allPassedSurveys);
        expect(filteredList).toEqual(allPassedSurveys);
    });

})