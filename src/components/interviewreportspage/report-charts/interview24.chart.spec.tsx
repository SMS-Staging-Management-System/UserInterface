import React from 'react'
import { shallow } from 'enzyme';
import { Interview24Chart } from './interview24.chart';

// if you can figure out why this mocking is necessary, good for you
jest.mock('../../../actions/assoc-24-chart/assoc24chart.actions', () => ({
  setNoticeDataAssoc: () => { },
}))
jest.mock('../../../actions/manager-24-chart/manager24chart.actions', () => ({
  setNoticeDataManager: () => { },
}))

const props = {
  dataAssoc: [12, 1],
  dataManager: [14, 2],
  setNoticeDataAssoc: () => { },
  setNoticeDataManager: () => { },
}

describe('tests for the feedback requests chart', () => {
  const chart24 = shallow(<Interview24Chart {...props} />)
  it('should render with two ReportCharts', () => {
    expect(chart24.find('ReportChart').length).toEqual(2)
  })
  it('should no longer have any ReportCharts when there is no data', () => {
    chart24.setProps({
      dataAssoc: [],
      dataManager: [],
      setNoticeDataAssoc: () => { },
      setNoticeDataManager: () => { },
    })
    expect(chart24.find('ReportChart').length).toEqual(0)
  })
})