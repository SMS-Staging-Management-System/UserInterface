import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { FeedbackChartComponent } from './charts/FeedbackChartComponent';
import {setCanvasAssociate, getInfoAssociate} from '../../actions/feedbackReq-chart/feedbackrequested.actions';
import {setCanvasManager, getInfoManager} from '../../actions/feedbackDel-chart/feedbackdelivered.actions';
import { Link } from 'react-router-dom';

interface IManagerChartProps {
    data: {
        datasets: [{
            data: [number, number],
            backgroundColor: [ string, string ],
            borderColor: [ string, string ],
        }],
        labels: [ string, string ],
        chartAction : Function
    },
}

interface IAssociateChartProps {
    data: {
        datasets: [{
            data: [number, number],
            backgroundColor: [ string, string ],
            borderColor: [ string, string ],
        }],
        labels: [ string, string ],
        chartAction : Function
    },
}

export class FeedbackReportForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    _getInfoAssociate() {
        this.props.getInfoAssociate()
    }

    _getInfoManager() {
        this.props.getInfoManager()
    }

    associateC : IAssociateChartProps = {
        data: {
            datasets: [{
                data: [0,0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 255, 1)',
                ],
            }],
            labels: [
                'Insufficient Notice',
                'Sufficient Notice',
            ],
            chartAction: getInfoManager
        },
    }

    managerC : IManagerChartProps = {
        data: {
            datasets: [{
                data: [0,0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 255, 1)',
                ],
            }],
            labels: [
                'Insufficient Notice',
                'Sufficient Notice',
            ],
            chartAction: getInfoAssociate
        },
    }

    componentWillMount(){
        this._getInfoAssociate();
        this._getInfoManager();
        this.associateC = this.props.associatesChart;
        this.managerC = this.props.managersChart;
    }

    render() { 
        return ( 
            <React.Fragment>
                <h1>Interview Feedback Information</h1>
                <hr/><h2><div className = {"paginateddata"}><Link to="/interview/report/feedback" >Paginated Data</Link></div><div className = {"visualdata"}><Link to="/interview/report/feedback/charts" >Visual Data</Link></div></h2><hr/>
                <FeedbackChartComponent chart1 = {this.associateC} chart2 = {this.managerC} chartAction1 = {getInfoAssociate} chartAction2 = {getInfoManager} canvas1 = {setCanvasAssociate} canvas2 = {setCanvasManager}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        managersChart : state.interviewState.feedbackRequestedChart,
        associatesChart : state.interviewState.feedbackDeliveredChart
    }
}

const mapDispatchToProps = {
    getInfoAssociate,
    getInfoManager,
    setCanvasAssociate,
    setCanvasManager
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackReportForm);