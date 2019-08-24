import React from 'react'
import { Switch, Route } from 'react-router-dom';
import  Dashboard  from '../components/dashboard/Dashboard';

export class DashboardRoutes extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    render() {
        // let { path } = this.props.match//get path from url
        //add path to the front of any sub routes
        return (
            <Switch>
                {/* <Route path={`${path}/assign`} component={SurveyAssignComponent} />
                <Route path={`${path}/build`} component={SurveyBuildComponent} /> */}
                {/* <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path={`${path}`} component={(SurveyComponent as ConnectedComponentClass<any, any>)} /> */}
                <Route component={Dashboard} />
            </Switch>

        )
    }
}