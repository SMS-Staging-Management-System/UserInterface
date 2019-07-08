import React from 'react'
import { ReportChart, IChartProps } from '.';
import { render } from 'enzyme';

const chartProps:IChartProps = {
  data: {
    datasets: [{
      data: [5, 4],
      backgroundColor: ['#123456', '#3ce278'],
      borderColor: ['#123456', '#3ce278'],
    }],
    labels: ['lable1', 'lable2']
  },
  type: 'donaught'
}

const props = {
  chartTitle: 'title',
  chartProps,
}


describe('tests for chart', () => {
  const reportChart = render(<ReportChart {...props} />)
  it('should render with a single canvas', () => {
    expect(reportChart.find('canvas')).toHaveLength(1)
  })
})