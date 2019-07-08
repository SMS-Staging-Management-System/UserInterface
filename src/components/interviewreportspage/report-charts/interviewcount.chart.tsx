import React, { PureComponent } from "react";
import { IState } from "../../../reducers";
import { getInterviewCountData } from '../../../actions/interview-count/interviewcount.actions'
import { connect } from "react-redux";
import { IChartProps, ReportChart } from ".";

interface IInterviewCountChartProps {
  totalAssociates: number
  data: number[]
  getInterviewCountData: () => void
}

export class InterviewCountChart extends PureComponent<IInterviewCountChartProps> {

  componentDidMount() {
    this.props.getInterviewCountData()
  }

  render() {

    const interviewcountChartProps : IChartProps = {
      data: {
        datasets: [{
          data: this.props.data,
          backgroundColor: this.props.data.map((counting, index) => (
            `rgba(${(index * 89) % 255}, ${(index * 56) % 255}, ${(index * 25) % 255}, 0.2)`
          )),
          borderColor: this.props.data.map((counting, index) => (
            `rgba(${(index * 89) % 255}, ${(index * 56) % 255}, ${(index * 25) % 255}, 1)`
          )),
        }],
        labels: this.props.data.map((counting, index) => index + ` interview${index === 1?'': 's'}`)
      },
      type: 'doughnut'
    }
    return (
      <>
        {this.props.data.length ? <>
          <ReportChart
            chartTitle={'Number of Interviews Per Associate'}
            chartProps={interviewcountChartProps}
          />
        </>
        :<>{/*put spinner here*/}</>}
      </>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  totalAssociates: state.interviewState.interviewsCountChart.totalNumber,
  data: state.interviewState.interviewsCountChart.chartData
})

const mapDispatchToProps = {
  getInterviewCountData
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewCountChart)
