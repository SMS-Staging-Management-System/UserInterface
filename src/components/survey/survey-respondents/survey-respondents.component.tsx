import React, { Fragment } from 'react';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { Table } from 'reactstrap';
import Loader from '../Loader/Loader';
import { Redirect, RouteComponentProps } from 'react-router';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import Button from 'reactstrap/lib/Button';

interface IComponentProps extends RouteComponentProps<{}> {
    match: any
};

interface IComponentState {
    historyData: any,
    historyDataLoaded: boolean,
    redirectTo: any,
    pageNumber: number,
    totalPage: number
};

class SurveyRespondentsComponent extends React.Component<IComponentProps, IComponentState> {
    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            historyData: [],
            historyDataLoaded: false,
            redirectTo: null,
            pageNumber: 0,
            totalPage: 0
        }
    }

    componentWillMount() {
        this.loadSurveyRespondents(this.state.pageNumber);
    }

    incrementCounter = async () => {
        if (this.state.pageNumber < this.state.totalPage - 1) {
            this.setState({
                pageNumber: this.state.pageNumber + 1
            })
            await this.loadSurveyRespondents(this.state.pageNumber + 1);
        }

    }

    decrementCounter = async () => {
        if (this.state.pageNumber > 0) {
            this.setState({
                pageNumber: this.state.pageNumber - 1
            })
            await this.loadSurveyRespondents(this.state.pageNumber - 1);
        }
    }

    loadSurveyRespondents = async (page: number) => {
        const history = await surveyClient.findHistoriesBySurveyId(this.props.match.params.surveyId, page);
        const historyData = history.content;
        console.log("The history data brought in is: ", historyData);

        this.setState({
            historyData: historyData,
            historyDataLoaded: true,
            totalPage: history.totalPages
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
                        {this.state.historyData ? (
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
                                <ul>
                                    <div className="div-fixed">
                                        <tr className= "row-border">
                                            <td><Button variant="button-color" className="rev-background-color div-child" onClick={this.decrementCounter}>Prev</Button></td>
                                            <td><h6 className="div-child text-style" >Page {this.state.pageNumber + 1} of {this.state.totalPage}</h6></td>
                                            <td><Button variant="button-color" className="rev-background-color div-child" onClick={this.incrementCounter}>Next</Button></td>
                                        </tr>
                                    </div>
                                </ul>
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