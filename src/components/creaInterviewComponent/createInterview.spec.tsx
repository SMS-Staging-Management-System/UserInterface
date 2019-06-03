import React from 'react';
import shallow from 'enzyme';
// import { CreateInterviewComponent } from './createInterview.component';

it('<CreateInterview />', () => {
        const ICreateInterviewComponentProps = {
            createInterviewComponentState: {
                allCohorts: [],
                selectedCohort: undefined,
                associatesInSelectedCohort: [],
                selectedAssociate: undefined,
                date: '',
                location: '',
                client: '',
                clientArr: []
            },
            setState: {},
            getAllClient: {}
        }
        
        expect(ICreateInterviewComponentProps).toMatchSnapshot();
});