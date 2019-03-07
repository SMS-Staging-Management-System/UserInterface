import React from 'react'
import InterviewList from '../interview-src/component/interviewList/InterviewList';
import { Switch, Route} from 'react-router';
import  ProtectedRoute  from '../components/protected-route.component/protected-route.component';

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
            <>
            <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path="/reports" component={ReportFormComponent} />
            </>
                <Route path={`${path}/list`} component={InterviewList} />
            </Switch>
        )
    }
}