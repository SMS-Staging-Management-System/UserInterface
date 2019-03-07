import React from 'react'
import ReportFormComponent from '../interview-src/component/report-form/ReportForm.container';
import  ProtectedRoute  from '../components/protected-route.component/protected-route.component';
import { Switch, Route } from 'react-router';
import InterviewList from '../interview-src/component/InterviewList/InterviewList';


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
                <Route path={`${path}/list`} component={InterviewList} />
                <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path={`${path}/reports`} component={ReportFormComponent} />
            </Switch>
        )
    }
}