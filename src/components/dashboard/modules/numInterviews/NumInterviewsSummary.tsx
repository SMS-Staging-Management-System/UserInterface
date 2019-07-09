import React, { Component } from 'react';
import { RouteComponentProps } from "react-router";
import { Interview } from "../../../../model/Interview.model";
import { IState } from '../../../../reducers';
import { getInterviews } from '../../../../actions/dashboardActions/total-weekly.actions';
import { connect } from 'react-redux';
import NumInterviewsChart from './NumInterviewsChart';

interface INumInterviewsSummaryProps extends RouteComponentProps<{}> {
  interviewList: Interview[];
  totalScheduled: number;
  totalNotified: number;
  totalReviewed: number;
  history: any;
  getWeeklyInterviews: (date: number | Date) => void;
}

interface INumInterviewsSummaryState {
  currentWeek: Date;
}

class NumInterviewsSummary extends Component<INumInterviewsSummaryProps, INumInterviewsSummaryState> {
  constructor(props: INumInterviewsSummaryProps) {
    super(props);
    this.state = {
      currentWeek: new Date()
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

  componentDidMount() {
    this.props.getWeeklyInterviews(new Date());
  }

  render() {
    return (
      <div style={{cursor: "pointer"}} onClick={() => this.props.history.push('/dashboard/numInterviews')} className="NumInterviewsSummary">
        <NumInterviewsChart info={this.buildBarProps(this.listToBuildable(), "Weekly Interview Summary", "Total Weekly Interview Summary")} />
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
  getWeeklyInterviews: getInterviews
};

export default connect(mapStateToProps, mapDispatchToProps)(NumInterviewsSummary);