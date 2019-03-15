import React from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect } from 'react-router';

export class SurveyAnalyticsComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            surveyData: [],
            surveyDataLoaded: false,
            redirectTo: null
        }
    }

    componentDidMount() {
        this.loadSurveyData();
    }

    loadSurveyData = async () => {
        const surveyData = await surveyClient.findSurveyById(this.props.match.params.surveyId);
        this.setState({
            surveyData: surveyData,
            surveyDataLoaded: true
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <h2>Survey Data Page for survey {this.props.match.params.surveyId}</h2>
            // <h2>Survey Data Page for survey </h2>
        );
    }
}

export default SurveyAnalyticsComponent;