import React from 'react'
import { Switch } from 'react-router-dom';
// import SurveyAssignComponent from '../components/survey/SurveyAssign/SurveyAssignComponent';
// import SurveyBuildComponent from '../components/survey/SurveyBuild/SurveyBuildComponent';
import  ProtectedRoute  from '../components/protected-route.component/protected-route.component';
import { SurveyComponent } from '../components/survey/survey.component';

export class SurveyRoutes extends React.Component<any, any> {
    constructor(props:any){
        super(props)
    }

    render() {
        let {path} = this.props.match//get path from url
        //add path to the front of any sub routes
        return (
            <Switch>
                {/* <Route path={`${path}/assign`} component={SurveyAssignComponent} />
                <Route path={`${path}/build`} component={SurveyBuildComponent} /> */}
                <ProtectedRoute allowedRoles={['admin', 'staging-manager', 'trainer']} path={`${path}`} component={SurveyComponent} />
                
            </Switch>
            
        )
    }
}