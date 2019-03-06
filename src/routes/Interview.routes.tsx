import React from 'react'
import ReportFormComponent from '../interview-src/component/report-form/ReportForm.container';
import  ProtectedRoute  from '../components/protected-route.component/protected-route.component';

export class InterviewRoutes extends React.Component<any, any> {
    constructor(props){
        super(props)
    }

    render() {

        return (
            <>
            <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path="/reports" component={ReportFormComponent} />
            </>

        )
    }
}