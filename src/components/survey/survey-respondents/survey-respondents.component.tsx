import React, { Fragment } from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Redirect } from 'react-router';
import { Table } from 'reactstrap';
import Loader from '../Loader/Loader';

export class SurveyRespondentsComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            historyData: [],
            historyDataLoaded: false,
            redirectTo: null
        }
    }

    componentWillMount() {
        this.loadSurveyRespondents();
    }

    loadSurveyRespondents = async () => {
        const historyData = await surveyClient.findHistoriesBySurveyId(this.props.match.params.surveyId);

        this.setState({
            historyData: historyData,
            historyDataLoaded: true
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        return (
            <>
                {this.state.historyDataLoaded ? (
                    <Fragment>
                        {this.state.historyData.length ? (
                            <>
                                <Table striped id="manage-users-table" className="tableUsers">
                                    <thead className="rev-background-color">
                                        <tr>
                                            <th>User Email</th>
                                            <th>Date Assigned</th>
                                            <th>Date Completed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.historyData.map(history => (
                                            <tr key={history.historyId} className="rev-table-row">
                                                <td>{history.userEmail}</td>
                                                <td>{history.dateAssigned && new Date(history.dateAssigned).toDateString()}</td>
                                                <td>{history.dateCompleted && new Date(history.dateCompleted).toDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        ) : (
                                <div>No Respondents to Display</div>
                            )}
                    </Fragment>
                ) : (
                        <Loader/>
                    )}
            </>
        );
    }
}

export default SurveyRespondentsComponent;