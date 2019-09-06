import React, { PureComponent, createRef } from 'react'
import Chart from 'chart.js'

export interface IChartProps {
  data: {
    datasets: [{
      data: number[],
      backgroundColor: string[],
      borderColor: string[],
    }],
    labels: string[]
  }
  type: string
}

export const baseChartColors = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 255, 0.2)',
  ],
  borderColor: [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 255, 1)',
  ]
}

const options = {
  legend: {
    labels: {
      defaultFontSize: 18,
      fontSize: 18
    }
  },
  pointLabels: {
    fontSize: 18
  }
}

interface IReportChartProps {
  chartTitle: string
  chartProps: IChartProps
}

export class ReportChart extends PureComponent<IReportChartProps> {

  chartRef: any

  constructor(props) {
    super(props)
    this.chartRef = createRef()
  }

  componentDidMount() {
    const ctx = this.chartRef.current.getContext('2d')
    new Chart(ctx, {
      ...this.props.chartProps,
      options: options
    })
  }

  render() {
    return (
      <div>
        <h4 className="chart-title"><b>{this.props.chartTitle}</b></h4>
        <canvas ref={this.chartRef}></canvas>
      </div>
    )
  }
}