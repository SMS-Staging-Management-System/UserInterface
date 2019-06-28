import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { setInfoJD } from '../../../actions/jobDesc-chart/jobdescription.actions'
import { IChartProps, baseChartColors, ReportChart } from '.';


interface IFeedbackChartProps {
  data: any
  setInfoJD: () => void
}

export class FeedbackChart extends PureComponent<IFeedbackChartProps> {

  componentDidMount() {
    this.props.setInfoJD()
  }

  render() {
    const chartProps: IChartProps = {
      data: {
        datasets: [{
          data: this.props.data,
          ...baseChartColors
        }],
        labels: [
          'Placeholder chart',
          'Placeholder chart'
        ]
      },
      type: 'doughnut'
    }
    return (
      <>
        {
          // the following .reduce finds whether there is some data to show
          this.props.data.reduce((prev, curr) => (prev + curr), 0)?
          <ReportChart chartTitle={'Placeholder Chart'} chartProps={chartProps} />
          : <>put spinner here</>
        }
      </>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  data: state.interviewState.jobDescriptionChart.JDdata,
})

const mapDispatchToProps = {
  setInfoJD
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackChart)
