import React from 'react'
import {ReportForm} from "../interview-src/component/report-form/ReportForm.container"
import { Switch, Route } from 'react-router';
import InterviewList from '../interview-src/component/InterviewList/InterviewList';
import createInterviewComponent from '../interview-src/component/creaInterviewComponent/createInterview.component';


export class InterviewRoutes extends React.Component<any, any> {
    constructor(props){
        super(props)
    }

    render() {
        //let {path} = this.props.match//get the path from url
        //put path in front of any sub paths
        let {path} =this.props.match
        return (
            <Switch>
                <Route path={`${path}/reports`} component={ReportForm} />
                <Route path={`${path}/list`} component={InterviewList} />
                <Route path={`${path}/new`} component={createInterviewComponent} />
             </Switch>
        )
    }
}