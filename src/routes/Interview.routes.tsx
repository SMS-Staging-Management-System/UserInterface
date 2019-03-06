import React from 'react'
import { Route } from 'react-router';
import createInterviewComponent from '../interview-src/component/createInterview.component';


export class InterviewRoutes extends React.Component<any, any> {
    constructor(props){
        super(props)
    }

    render() {

        return (
            <>
            
            </>
        )
    }
}

export const interviewRouteArr = [    
    <Route path='/test' component={createInterviewComponent} />,
];