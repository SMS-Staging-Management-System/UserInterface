import React from 'react'
import { Route } from 'react-router';
import createInterviewComponent from '../interview-src/component/createInterview.component';


export const interviewRouteArr = [    
    <Route path='/interview/createnew' component={createInterviewComponent} />,
];