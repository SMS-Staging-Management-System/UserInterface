import React from 'react'
import { shallow } from 'enzyme';
import { JDInterviewChart } from './interviewJD.chart';

// if you can figure out why this mocking is necessary, good for you
jest.mock('../../../actions/jobDesc-chart/jobdescription.actions', () => ({
  setInfoJD: () => { }
}))

const props = {
  data: [12, 5],
  setInfoJD: () => { }
}

describe('tests for the feedback requests chart', () => {
  const jDChart = shallow(<JDInterviewChart {...props} />)
  it('should render with a ReportChart', () => {
    expect(jDChart.find('ReportChart').length).toEqual(1)
  })
  it('should no longer have a ReportChart when there is no data', () => {
    jDChart.setProps({ data: [], setInfoJD: () => { } })
    expect(jDChart.find('ReportChart').length).toEqual(0)
  })
})