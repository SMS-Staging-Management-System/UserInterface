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
        <div className='FeedbackRequestedChart'>
        <h4 className="chart-title">Interviews with Feedback Requested<hr /></h4>
          <FeedbackRequestedChartComponent chart={this.props.chart1} chartAction={this.props.chartAction1} setCanvas={this.props.canvas1} /><br />
        </div>
        <div className='FeedbackReceivedChart'>
        <h4 className="chart-title">Interviews with Feedback Requested<hr /></h4>
          <FeedbackDeliveredChartComponent chart={this.props.chart2} chartAction={this.props.chartAction2} setCanvas={this.props.canvas2} /><br />

        </div>
      </div>
    )
  }
}