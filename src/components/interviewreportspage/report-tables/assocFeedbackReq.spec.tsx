import React from 'react'
import { AssociatesFeedbackRequest } from './associatesFeedbackRequestComponent.component';
import { shallow } from 'enzyme';

jest.mock('../../../axios/sms-clients/interview-client', () => ({
  interviewClient: {
    assocNeedFeedback: jest.fn((page: number, pageSize: number) => ({
      data: {
        content: [
          {
            userId: 1,
            firstName: 'Xohn',
            lastName: 'Mold',
            email: 'xm@maxam.co'
          },
          {
            userId: 2,
            firstName: 'Andus',
            lastName: 'Aegris',
            email: 'andustrious@rim.coffee'
          },
          {
            userId: 3,
            firstName: 'Doctor',
            lastName: 'Smear',
            email: 'smearnov@dr.org'
          },
          {
            userId: 4,
            firstName: 'Captain',
            lastName: 'Swab',
            email: 'svabbi@thecaptain.com'
          }
        ],
        totalPages: 10
      }
    }))
  }
}))

describe('tests for Associate Feedback Request Chart', () => {
  const tableComponent = shallow(<AssociatesFeedbackRequest />)
  it('should render with 4 users', () => {
    expect(tableComponent.state()).toMatchObject({
      Users: [{
        userId: 1,
        firstName: 'Xohn',
        lastName: 'Mold',
        email: 'xm@maxam.co'
      },
      {
        userId: 2,
        firstName: 'Andus',
        lastName: 'Aegris',
        email: 'andustrious@rim.coffee'
      },
      {
        userId: 3,
        firstName: 'Doctor',
        lastName: 'Smear',
        email: 'smearnov@dr.org'
      },
      {
        userId: 4,
        firstName: 'Captain',
        lastName: 'Swab',
        email: 'svabbi@thecaptain.com'
      }],
      totalPages: 10,
      currentPage: 0,
      pageSize: 4,
      redirect: false
    })
  })
  it('should have 5 table rows', () => {
    expect(tableComponent.find('tr').length).toEqual(5)
  })
})
