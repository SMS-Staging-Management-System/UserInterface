import React from 'react'
import { Switch, Route } from 'react-router-dom';
import SurveyAssignComponent from '../components/SurveyComponents/SurveyAssign/SurveyAssignComponent';
import SurveyBuildComponent from '../components/SurveyComponents/SurveyBuild/SurveyBuildComponent';
import SurveyHomeComponent from '../components/SurveyComponents/SurveyHomeComponent';

export class SurveyRoutes extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        let {path} = this.props.match//get path from url
        //add path to the front of any sub routes
        return (
            <Switch>
                <Route exact path={`${path}/`} component={SurveyHomeComponent} />
                <Route path={`${path}/assign`} component={SurveyAssignComponent} />
                <Route path={`${path}/build`} component={SurveyBuildComponent} />
                <Route component={SurveyHomeComponent} />
            </Switch>
            
        )
    }
}