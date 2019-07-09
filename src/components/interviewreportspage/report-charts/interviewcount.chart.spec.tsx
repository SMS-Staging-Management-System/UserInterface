import React from 'react'
import { shallow } from 'enzyme';
import { InterviewCountChart } from './interviewcount.chart';

// if you can figure out why this mocking is necessary, good for you
jest.mock('../../../actions/interview-count/interviewcount.actions', () => ({
  getInterviewCountData: () => { }
}))

const props = {
  totalAssociates: 0,
  data: [12, 5],
  getInterviewCountData: () => { }
}

describe('tests for the feedback requests chart', () => {
  const countChart = shallow(<InterviewCountChart {...props} />)
  it('should render with a ReportChart', () => {
    expect(countChart.find('ReportChart').length).toEqual(1)
  })
  it('should no longer have a ReportChart when there is no data', () => {
    countChart.setProps({ totalAssociates: 0, data: [], getInterviewCountData: () => { } })
    expect(countChart.find('ReportChart').length).toEqual(0)
  })
})