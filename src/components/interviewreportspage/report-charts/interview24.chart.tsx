import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { setNoticeDataAssoc } from '../../../actions/assoc-24-chart/assoc24chart.actions'
import { setNoticeDataManager } from '../../../actions/manager-24-chart/manager24chart.actions'
import { IChartProps, baseChartColors, ReportChart } from '.';


interface IInterview24ChartProps {
  dataAssoc: any
  dataManager: any
  setNoticeDataAssoc: () => void
  setNoticeDataManager: () => void
}

export class Interview24Chart extends PureComponent<IInterview24ChartProps> {

  componentDidMount() {
    this.props.setNoticeDataAssoc()
    this.props.setNoticeDataManager()
  }

  render() {
    const chartAssocProps: IChartProps = {
      data: {
        datasets: [{
          data: this.props.dataAssoc,
          ...baseChartColors
        }],
        labels: [
          'Insufficient Notice',
          'Sufficient Notice'
        ]
      },
      type: 'doughnut'
    }
    const chartManagerProps: IChartProps = {
      ...chartAssocProps,
      data: {
        ...chartAssocProps.data,
        datasets: [{
          data: this.props.dataManager,
          ...baseChartColors
        }]
      }
    }
    return (
      <>
        {
          // the following .reduce finds whether there is some data to show
          this.props.dataAssoc.reduce((prev, curr) => (prev + curr), 0) ?
            <ReportChart chartTitle={'Associate\'s Claims'} chartProps={chartAssocProps} />
            : <>Loading...</>
        }
        {
          // the following .reduce finds whether there is some data to show
          this.props.dataManager.reduce((prev, curr) => (prev + curr), 0) ?
            <ReportChart chartTitle={'Manager\'s Claims'} chartProps={chartManagerProps} />
            : <>Loading...</>
        }
      </>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  dataAssoc: state.interviewState.associateChart.chartData,
  dataManager: state.interviewState.managerChart.chartData
})

const mapDispatchToProps = {
  setNoticeDataAssoc,
  setNoticeDataManager
}

export default connect(mapStateToProps, mapDispatchToProps)(Interview24Chart)
