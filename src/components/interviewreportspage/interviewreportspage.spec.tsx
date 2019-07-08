import React from 'react'
import { ReportsPage } from './interviewreportspage';
import { shallow } from 'enzyme';

jest.mock('./reportspagecontent', () => ({
  pageContent: [
    {
      title: <></>,
      table: <></>,
      chart: <></>,
    },
    {
      title: <></>,
      table: <></>,
      chart: <></>,
    },
    {
      title: <></>,
      table: <></>,
      chart: <></>,
    },
    {
      title: <></>,
      table: <></>,
      chart: <></>,
    },
  ]
}))

describe('Tests for the interview reports base page', () => {
  const reportsPage = shallow(<ReportsPage />)
  it('renders successfully with expected state', () => {
    expect(reportsPage.state()).toMatchObject({ report: 0, table: true })
  })
  it('should have 4 items on the sidebar', () => {
    expect(reportsPage.find('ListGroupItem').length).toEqual(4)
  })
})