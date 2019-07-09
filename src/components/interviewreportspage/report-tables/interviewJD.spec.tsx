import React from 'react'
import { shallow } from 'enzyme';
import { InterviewJDRequest } from './interviewJD.component';

jest.mock('../../../axios/sms-clients/interview-client', () => ({
  interviewClient: {
    interviewJD: jest.fn((page: number, pageSize: number) => ({
      data: {
        content: [
          {
            assocName: 'Xohn Mold',
            assocEmail: 'xm@maxam.co',
            jd: true,
          },
          {
            assocName: 'Andus Aegris',
            assocEmail: 'andustrious@rim.coffee',
            jd: false,
          },
          {
            assocName: 'Captain Swab',
            assocEmail: 'svabbi@thecaptain.com',
            jd: true,
          },
          {
            assocName: 'Doctor Smear',
            assocEmail: 'svabbi@thecaptain.com',
            jd: false,
          },
        ],
        totalPages: 3
      }
    }))
  }
}))

describe('tests for Interview Job Description Chart', () => {
  const tableComponent = shallow(<InterviewJDRequest />)
  it('should render with 5 users', () => {
    expect(tableComponent.state()).toMatchObject({
      Users: [
        {
          assocName: 'Xohn Mold',
          assocEmail: 'xm@maxam.co',
          jd: true
        },
        {
          assocName: 'Andus Aegris',
          assocEmail: 'andustrious@rim.coffee',
          jd: false,
        },
        {
          assocName: 'Captain Swab',
          assocEmail: 'svabbi@thecaptain.com',
          jd: true,
        },
        {
          assocName: 'Doctor Smear',
          assocEmail: 'svabbi@thecaptain.com',
          jd: false
        },
      ],
      totalPages: 3,
      currentPage: 0,
      pageSize: 4,
      redirect: false,
    })
  })
  it('should have 3 table rows', () => {
    expect(tableComponent.find('tr').length).toEqual(5)
  })
})
