import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { ChartComponent } from './charts/ChartComponent';
import {setCanvasJD, getInfoJD} from '../../actions/jobDesc-chart/jobdescription.actions';

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

export class JDReportForm extends React.PureComponent<any> {    
    _getInfoAssociate() {
        this.props.getInfoJD()
    }

    _getInfoManager() {
        this.props.getInfoJD()
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
            chartAction: getInfoJD
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
            chartAction: getInfoJD
        },
    }

    componentWillMount(){
		this._getInfoAssociate();
        this._getInfoManager();
        this.associateC = this.props.jobDescriptionsChart;
    }
    render() { 
        return ( 
            <React.Fragment>
                <ChartComponent chart1 = {this.associateC} chartAction1 = {getInfoJD} canvas1 = {setCanvasJD}/>
            </React.Fragment>		
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        managersChart : state.interviewState.feedbackRequestedChart,
        associatesChart : state.interviewState.feedbackDeliveredChart,
		jobDescriptionsChart : state.interviewState.jobDescriptionChart,
    }
}

const mapDispatchToProps = {
    getInfoJD,
    setCanvasJD,
}

export default connect(mapStateToProps, mapDispatchToProps)(JDReportForm);