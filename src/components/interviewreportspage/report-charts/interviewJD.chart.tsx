import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { setInfoJD } from '../../../actions/jobDesc-chart/jobdescription.actions'
import { IChartProps, baseChartColors, ReportChart } from '.';


interface IJDInterviewChartProps {
  data: any
  setInfoJD: () => void
}

export class JDInterviewChart extends PureComponent<IJDInterviewChartProps> {

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
          'No Job Description',
          'Job Description Given'
        ]
      },
      type: 'doughnut'
    }
    return (
      <>
        {
          // the following .reduce finds whether there is some data to show
          this.props.data.reduce((prev, curr) => (prev + curr), 0) ?
          <ReportChart chartTitle={'Job Description Information'} chartProps={chartProps} />
          : <>put spinner here</>
        }
      </>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  data: state.interviewState.jobDescriptionChart.chartData,
})

const mapDispatchToProps = {
  setInfoJD
}

export default connect(mapStateToProps, mapDispatchToProps)(JDInterviewChart)
