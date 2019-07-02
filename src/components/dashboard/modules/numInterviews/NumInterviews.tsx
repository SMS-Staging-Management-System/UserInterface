import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import { getInterviews } from '../../../../actions/dashboardActions/total-weekly.actions';
import { Interview } from '../../../../model/Interview.model';
import NumInterviewsChart from './NumInterviewsChart';
import './NumInterviews.scss';

interface INumInterviewsProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
    interviewList: Interview[];
    totalScheduled: number;
    totalNotified: number;
    totalReviewed: number;
    getWeeklyInterviews: (date: number | Date) => void;
}

interface INumInterviewsState {
    currentWeek: Date;
    places: object;
    clients: object;
}

class NumInterviews extends Component<INumInterviewsProps,INumInterviewsState> {
    constructor(props: INumInterviewsProps) {
        super(props);
        this.state = {
            currentWeek: new Date(),
            places: [],
            clients: []
        }
    }

    getWeekOf = (date: Date) => {
        const newDate = new Date(
            date.getTime() - // Start with current time
            date.getDay() * 86400000 - // Get sunday
            date.getHours() * 3600000 - // Get midnight
            date.getMinutes() * 60000 - // Get beginning of hour
            date.getSeconds() * 1000 - // Get beginning of minute
            date.getMilliseconds()); // Get beginning of second
        
        return newDate.toDateString().substr(4);
    }

    getNextWeeklySummary = (date: Date) => {
        date.setDate(date.getDate() + 7);
        this.getWeeklySummary(date);
    }

    getPreviousWeeklySummary = (date: Date) => {
        date.setDate(date.getDate() - 7);
        this.getWeeklySummary(date);
    }

    getWeeklySummary = (date: Date) => {
        this.props.getWeeklyInterviews(date);
        this.setState({
            ...this.state,
            currentWeek: date
        });
    }

    listToBuildable = (): object => {
        let buildable = {};
        buildable["Total Scheduled"] = this.props.totalScheduled;
        buildable["Total Notified"] = this.props.totalNotified;
        buildable["Total Reviewed"] = this.props.totalReviewed;
        return buildable;
    }

    buildBarProps = (buildable: object, title: string, sub: string) => {
        let keys: string[] = Object.keys(buildable);
        let values: number[] = Object.values(buildable);
        let possibleColors = [
            'rgba(127, 255, 63, 0.6)',
            'rgba(63, 127, 255, 0.6)',
            'rgba(255, 63, 127, 0.6)',
            'rgba(63, 255, 127, 0.6)',
            'rgba(127, 63, 255, 0.6)',
            'rgba(255, 127, 63, 0.6)'
        ]
        let backgroundColor: string[] = []
        for (let i = 0; i < keys.length; i++) {
            backgroundColor.push(possibleColors[i % 6])
        }
        let data = {
            labels: keys,
            datasets: [{
                label: [sub],
                data: values,
                backgroundColor
            }]
        };
        let options = {
            title: {
                display: true,
                text: title,
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'bottom'
            },
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        return {data, options};
    }

    render() {
        let places: object = {};
        let clients: object = {};
        for (let interview of this.props.interviewList) {
            let { place } = interview;
            let { clientName } = interview.client;
            if (places[place]) {
                places[place]++;
            } else {
                places[place] = 1;
            }
            if (clients[clientName]) {
                clients[clientName]++;
            } else {
                clients[clientName] = 1;
            }
        }
        return (
            <div className="NumInterviews">
                <div className="title rev-background-color">
                    Total number of interviews for the week of <u>{this.getWeekOf(this.state.currentWeek)}</u>
                </div>
                <br />
                <div className="nav">
                    <button type="button" className="rev-background-color div-child btn btn-secondary" onClick={() => this.getPreviousWeeklySummary(this.state.currentWeek)}>Prev</button>&nbsp;
                    <button type="button" className="rev-background-color div-child btn btn-secondary" onClick={() => this.getWeeklySummary(new Date())}>Current Week</button>&nbsp;
                    <button type="button" className="rev-background-color div-child btn btn-secondary" onClick={() => this.getNextWeeklySummary(this.state.currentWeek)}>Next</button>
                </div>
                <div className="content">
                    {this.props.interviewList.length <= 0 ?
                    <div className="no-data">
                        <h1 className="no-data">No data to display</h1>
                        <p>There is no interview information for this week.</p>
                        <p>Use the <b>Prev</b> and <b>Next</b> buttons to go to other weeks.</p>
                    </div> :
                    <div className="chart">
                        <NumInterviewsChart info={this.buildBarProps(this.listToBuildable(), "Weekly Interview Summary", "Total Weekly Interview Summary")} />
                        <NumInterviewsChart info={this.buildBarProps(places, "Branch Information", "Interview Reporting By Branch")} />
                        <NumInterviewsChart info={this.buildBarProps(clients, "Client Breakdown", "Weekly Client Interviews")} />
                    </div>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth,
    interviewList: state.dashboardState.totalWeekly.interviewList,
    totalScheduled: state.dashboardState.totalWeekly.totalScheduled,
    totalNotified: state.dashboardState.totalWeekly.totalNotified,
    totalReviewed: state.dashboardState.totalWeekly.totalReviewed
});

const mapDispatchToProps = {
    getWeeklyInterviews: getInterviews // using a different name locally for clarity
}

export default connect(mapStateToProps, mapDispatchToProps)(NumInterviews);