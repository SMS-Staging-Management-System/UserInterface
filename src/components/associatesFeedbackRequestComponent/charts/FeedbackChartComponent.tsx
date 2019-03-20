import React from 'react';
import { FeedbackRequestedChartComponent } from './FeedbackRequestedChartComponent'
import { FeedbackDeliveredChartComponent } from './FeedbackDeliveredChartComponent'

export class FeedbackChartComponent extends React.Component<any, any> {
  /*  constructor(props) {
     super(props);
   } */

  render() {
    return (
      <div>
        <div id='FeedbackRequestedChart'>
          <FeedbackRequestedChartComponent chart={this.props.chart1} chartAction={this.props.chartAction1} setCanvas={this.props.canvas1} /><br />
          <h2>Interviews with Feedback Requested<hr /></h2>
        </div>
        <div id='FeedbackReceivedChart'>
          <FeedbackDeliveredChartComponent chart={this.props.chart2} chartAction={this.props.chartAction2} setCanvas={this.props.canvas2} /><br />
          <h2>Interviews with Feedback Delivered<hr /></h2>
        </div>
      </div>
    )
  }
}