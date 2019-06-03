import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
//import { Link } from 'react-router-dom';
import { ChartComponent } from './charts/ChartComponent';
import {setCanvasAssociate, getInfoAssociate} from '../../actions/assoc-24-chart/assoc24chart.actions';
import {setCanvasManager, getInfoManager} from '../../actions/manager-24-chart/manager24chart.actions';
import { Redirect } from 'react-router-dom';

interface IManagerChartProps {
    data :  {
        datasets: [{
            data: [number, number],
            backgroundColor: [ string, string ],
            borderColor : [ string, string ],
        }],
        labels : [ string, string ],
        chartAction : Function
    },
}

interface IAssociateChartProps {
    data :  {
        datasets: [{
            data: [number, number],
            backgroundColor: [ string, string ],
            borderColor : [ string, string ],
        }],
        labels : [ string, string ],
        chartAction : Function
    },
}

export class ReportForm extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
    }

    _getInfoAssociate(){
        this.props.getInfoAssociate()
    }

    _getInfoManager(){
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
                    'rgba(0, 255, 108, 0.2)',
                    'rgba(100, 162, 255, 0.2)',
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

       // managerC : IManagerChartProps = {
    //     data: {
    //         datasets: [{
    //             data: [0,0],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 255, 0.2)',
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 255, 1)',
    //             ],
    //         }],
    //         labels: [
    //             'Insufficient Notice',
    //             'Sufficient Notice',
    //         ],
    //         chartAction: getInfoAssociate
    //     },
    // }

    componentWillMount() {
        this._getInfoAssociate();
        this._getInfoManager();
        this.associateC = this.props.associatesChart;
        this.managerC = this.props.managersChart;
    }

    updateRedirecrt = (redirecting: boolean) => {
        console.log('redirect');
        this.setState({ redirect: redirecting })
    }

    render() { 

        if (this.state.redirect) {
            this.updateRedirecrt(false)
            return <Redirect push to="/interview/report/24hour" />;
        }

        return ( 
            <React.Fragment>
                <h1><b>Interviews 24 Hour Notice</b></h1>

                 {/* <div className = {""}>
                    <Link to="/interview/report/24hour" >Paginated Data</Link>
                </div> */}

                <ChartComponent chart1 = {this.associateC} chart2 = {this.managerC} chartAction1 = {getInfoAssociate} chartAction2 = {getInfoManager} canvas1 = {setCanvasAssociate} canvas2 = {setCanvasManager}/>
                <div>
                <button className="btn btn-lg btn-primary btn-block" onClick={() => this.updateRedirecrt(true)}>Form Data</button>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        managersChart : state.interviewState.managerChart,
        associatesChart : state.interviewState.associateChart,
    }
}

const mapDispatchToProps = {
    getInfoAssociate,
    getInfoManager,
    setCanvasAssociate,
    setCanvasManager,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);