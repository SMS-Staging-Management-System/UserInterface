import React from 'react'
import { ReportsPage } from './interviewreportspage';
import { shallow } from 'enzyme';


describe('Tests for the interview reports base page', () => {
  const reportsPage = shallow(<ReportsPage />)
  it('renders successfully with expected state', () => {
    expect(reportsPage.state()).toMatchObject( { report: 0, table: true } )
  })
})