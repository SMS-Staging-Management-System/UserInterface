import React from 'react'
import { Route } from 'react-router';
import InterviewList from '../interview-src/component/InterviewList/InterviewList';


export class InterviewRoutes extends React.Component<any, any> {
    constructor(props){
        super(props)
    }

    render() {

        return (
            <React.Fragment>
                <Route path="/list" component={InterviewList} />
            </React.Fragment>
        )
    }
}