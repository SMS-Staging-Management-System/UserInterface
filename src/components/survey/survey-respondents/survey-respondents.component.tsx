import React, { Fragment } from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Table } from 'reactstrap';
import Loader from '../Loader/Loader';
import { Redirect, RouteComponentProps } from 'react-router';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';

interface IComponentProps extends RouteComponentProps<{}> {
    match: any
};

interface IComponentState {
    historyData: any,
    historyDataLoaded: boolean,
    redirectTo: any
};

class SurveyRespondentsComponent extends React.Component<IComponentProps, IComponentState> {
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
                        <Loader />
                    )}
            </>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(SurveyRespondentsComponent);