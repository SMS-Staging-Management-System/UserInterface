import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { setInfoAssoc } from '../../../actions/feedbackReq-chart/feedbackrequested.actions'
import { IChartProps, ReportChart } from '.';


interface IFeedbackChartProps {
  data: any
  setInfoAssoc: () => void
}

export class FeedbackChart extends PureComponent<IFeedbackChartProps> {

  componentDidMount() {
    this.props.setInfoAssoc()
  }

  render() {
    const chartProps: IChartProps = {
      data: {
        datasets: [{
          data: this.props.data,
          // typescript does not like the spread operator
          backgroundColor: [
            'rgba(01, 01, 01, 0.2)',
            'rgba(54, 162, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(01, 01, 01, 1)',
            'rgba(54, 162, 255, 1)',
            'rgba(255,99,132,1)',
          ]
        }],
        labels: [
          'Feedback not Requested',
          'Feedback Requested and Delivered',
          'Feedback Requested and not Delivered',
        ]
      },
      type: 'doughnut'
    }
    return (
      <>
        {
          // the following .reduce finds whether there is some data to show
          this.props.data.reduce((prev, curr) => (prev + curr), 0) ?
            <ReportChart chartTitle={'Interviews And Feedback'} chartProps={chartProps} />
            : <>put spinner here</>
        }
      </>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  data: state.interviewState.feedbackRequestedChart.chartData,
})

const mapDispatchToProps = {
  setInfoAssoc
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackChart)
