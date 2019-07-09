import React from 'react'
import { shallow } from 'enzyme';
import { InterviewPerAssoc } from './interviewsPerAssocComponent.component';

jest.mock('../../../axios/sms-clients/interview-client', () => ({
  interviewClient: {
    interviewPerAssoc: jest.fn((pageNumber: number) => ({
      data: {
        content: [
          {
            assocName: 'Xohn Mold',
            assocEmail: 'xm@maxam.co',
            interviewCount: 1,
          },
          {
            assocName: 'Andus Aegris',
            assocEmail: 'andustrious@rim.coffee',
            interviewCount: 2,
          },
          {
            assocName: 'Captain Swab',
            assocEmail: 'svabbi@thecaptain.com',
            interviewCount: 3,
          },
          {
            assocName: 'Doctor Smear',
            assocEmail: 'svabbi@thecaptain.com',
            interviewCount: 4,
          },
        ],
        totalPages: 3
      }
    }))
  }
}))

describe('tests for Interviews Per Associate Chart', () => {
  const tableComponent = shallow(<InterviewPerAssoc />)
  it('should render with 4 users', () => {
    expect(tableComponent.state()).toMatchObject({
        assocInterviewArr: [
        {
          assocName: 'Xohn Mold',
          assocEmail: 'xm@maxam.co',
          interviewCount: 1
        },
        {
          assocName: 'Andus Aegris',
          assocEmail: 'andustrious@rim.coffee',
          interviewCount: 2,
        },
        {
          assocName: 'Captain Swab',
          assocEmail: 'svabbi@thecaptain.com',
          interviewCount: 3,
        },
        {
          assocName: 'Doctor Smear',
          assocEmail: 'svabbi@thecaptain.com',
          interviewCount: 4
        },
      ],
      totalPages: 3,
      currentPage: 0,
      pageSize: 5,

    })
  })
  it('should have 3 table rows', () => {
    expect(tableComponent.find('tr').length).toEqual(5)
  })
})
