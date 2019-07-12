import React from 'react'
import { FeedbackChart } from './feedback.chart';
import { shallow } from 'enzyme';

// if you can figure out why this mocking is necessary, good for you
jest.mock('../../../actions/feedbackReq-chart/feedbackrequested.actions', () => ({
  setInfoAssoc: () => { }
}))

const props = {
  data: [12, 5],
  setInfoAssoc: () => { }
}

describe('tests for the feedback requests chart', () => {
  const feedbackChart = shallow(<FeedbackChart {...props} />)
  it('should render with a ReportChart', () => {
    expect(feedbackChart.find('ReportChart').length).toEqual(1)
  })
  it('should no longer have a ReportChart when there is no data', () => {
    feedbackChart.setProps({ data: [], setInfoAssoc: () => { } })
    expect(feedbackChart.find('ReportChart').length).toEqual(0)
  })
})