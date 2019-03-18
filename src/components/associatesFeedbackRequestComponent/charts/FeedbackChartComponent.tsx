import React from 'react';
import { connect } from 'react-redux';
import { FeedbackRequestedChartComponent } from './FeedbackRequestedChartComponent';
import { FeedbackDeliveredChartComponent } from './FeedbackDeliveredChartComponent';
// import {getInfoAssociate} from '../../../actions/assoc-24-chart/assoc24chart.actions';
// import {getInfoManager} from '../../../actions/manager-24-chart/manager24chart.actions';
import { IState } from '../../../reducers';

export class FeedbackChartComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <div id='FeedbackRequestedChart'>
        <FeedbackRequestedChartComponent/><br/>
        <h2>Feedback requested for interviews.<hr/></h2>
      </div>
      <div id='ManagerChart'>
        <FeedbackDeliveredChartComponent/><br/>
        <h2>Feedback delivered to associates.<hr/></h2>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  return {
    // managersChart : state.interviewState.managerChart,
    // associatesChart : state.interviewState.associateChart
  }
}

const mapDispatchToProps = {
  // getInfoAssociate,
  // getInfoManager
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackChartComponent);