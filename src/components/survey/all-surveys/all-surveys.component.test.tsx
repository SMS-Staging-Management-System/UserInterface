import { shallow, mount, render } from 'enzyme';
import { ISurvey } from '../../../model/surveys/survey.model';
import { AllSurveysComponent } from './all-surveys.component';
import { RouteComponentProps } from 'react-router';
import { IAuthState } from '../../../reducers/management';
import { createBrowserHistory } from 'history';
import React, { Fragment, Component } from 'react';

/*  Mock Survey Data */
const today = new Date('5/30/2019')
let exampleArr: ISurvey[] = [
  {
    surveyId: 4,
    title: 'RC Survey',
    description: 'A survey for training feedback.',
    dateCreated: new Date('5/31/2019'),
    closingDate: new Date('7-2-2019'),
    template: false,
    creator: '',
    questionJunctions: [],
  },
  {
    surveyId: 5,
    title: 'Testing2',
    description: 'A survey for testing',
    dateCreated: new Date('5/31/2019'),
    closingDate: new Date('5-24-2019'),
    template: false,
    creator: '',
    questionJunctions: [],
  },
  {
    surveyId: 6,
    title: 'Testingstuff',
    description: 'A survey for more testing',
    dateCreated: new Date('5/31/2019'),
    closingDate: new Date('5-10-2019'),
    template: false,
    creator: '',
    questionJunctions: [],
  },
];

let exArr: ISurvey[] = [
  {
    surveyId: 1,
    title: 'Survey 1',
    description: 'A survey for some testing with null closing date.',
    dateCreated: new Date('5/31/2019'),
    closingDate: null,
    template: false,
    creator: '',
    questionJunctions: [],
  },
  {
    surveyId: 2,
    title: 'Survey 2',
    description: 'A survey for testing without null',
    dateCreated: new Date('5/31/2019'),
    closingDate: new Date('5-24-2019'),
    template: false,
    creator: '',
    questionJunctions: [],
  },
  {
    surveyId: 3,
    title: 'Survey 3',
    description: 'A survey for testing an active date',
    dateCreated: new Date('5/31/2019'),
    closingDate: new Date('7-10-2019'),
    template: false,
    creator: '',
    questionJunctions: [],
  },
];

/* Mock Survey Data */

interface IComponentProps extends RouteComponentProps<{}> {
    auth: IAuthState;
}
let filler: any = null;
let currentUser:IComponentProps = {
    auth: {
        currentUser: {
            email: "black.kruppa@revature.com",
            roles: ['staging-manager', 'trainer', 'admin']
        }
    },
    history: createBrowserHistory(),
    location: filler,
    match: filler
}

// Render test suite
describe('Testing component rendering', () => {
    test('All surveys will be rendered', () => {
        
       const component = shallow(<AllSurveysComponent {...currentUser} />);
       expect(component).resolves;
    })
})