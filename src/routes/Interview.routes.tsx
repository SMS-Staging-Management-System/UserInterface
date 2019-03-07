import React from 'react'
import ReportFormComponent from '../interview-src/component/report-form/ReportForm.container';
import  ProtectedRoute  from '../components/protected-route.component/protected-route.component';
import { Switch } from 'react-router';


export class InterviewRoutes extends React.Component<any, any> {
    constructor(props){
        super(props)
    }

    render() {
        //let {path} = this.props.match//get the path from url
        //put path in front of any sub paths
        return (
            <Switch>
            <>
            <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path="/reports" component={ReportFormComponent} />
            </>


            </Switch>
            

        )
    }
}