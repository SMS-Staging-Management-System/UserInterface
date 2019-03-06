import React from 'react'
import { Switch, Route } from 'react-router-dom';
// import SurveyBuildComponent from '../components/survey-service/survey-builder/survey-build.component';
import SurveyAssignComponent from '../components/SurveyComponents/SurveyAssign/SurveyAssignComponent';
// import SurveyHomeComponent from '../components/survey-service/survey-home/survey-home.component';

export class SurveyRoutes extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        let {path} = this.props.match//get path from url
        //add path to the front of any sub routes
        return (
            <Switch>
                <Route exact path={`${path}/`} component={SurveyAssignComponent} />
                {/* <Route exact path="/build" component={SurveyBuildComponent} /> */}
                {/* <Route exact path="/assign" component={SurveyAssignComponent} />
                <Route exact path="/available" component={SurveyAssignComponent} /> */}
            </Switch>
            
        )
    }
}