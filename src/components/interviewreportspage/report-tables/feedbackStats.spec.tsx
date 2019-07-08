import React from 'react'
import { shallow } from 'enzyme';
import { FeedbackStatsTable } from './feedbackStats.component';

jest.mock('../../../axios/sms-clients/interview-client', () => ({
  interviewClient: {
    fetchFeedbackStats: jest.fn((page: number, pageSize: number) => ({
      data: {
        content: [
          {
            id: 1,
            managerName: 'Xohn Mold',
            managerEmail: 'xm@maxam.co',
            associateName: 'Andus Aegris',
            associateEmail: 'andustrious@rim.coffee',
            feedbackRequested: new Date('10-10-2010'),
            feedbackRecieved: null,
            feedbackDelivered: null,
          },
          {
            id: 2,
            managerName: 'Captain Swab',
            managerEmail: 'svabbi@thecaptain.com',
            associateName: 'Doctor Smear',
            associateEmail: 'smearnov@dr.org',
            feedbackRequested: new Date('10-10-2019'),
            feedbackRecieved: new Date('10-14-2019'),
            feedbackDelivered: new Date('10-15-2020'),
          }
        ],
        totalPages: 1
      }
    }))
  }
}))

describe('tests for Associate Feedback Stats Chart', () => {
  const tableComponent = shallow(<FeedbackStatsTable />)
  it('should render with 2 users', () => {
    expect(tableComponent.state()).toMatchObject({
      feedback: [
        {
          id: 1,
          managerName: 'Xohn Mold',
          managerEmail: 'xm@maxam.co',
          associateName: 'Andus Aegris',
          associateEmail: 'andustrious@rim.coffee',
          feedbackRequested: new Date('10-10-2010'),
          feedbackRecieved: null,
          feedbackDelivered: null,
        },
        {
          id: 2,
          managerName: 'Captain Swab',
          managerEmail: 'svabbi@thecaptain.com',
          associateName: 'Doctor Smear',
          associateEmail: 'smearnov@dr.org',
          feedbackRequested: new Date('10-10-2019'),
          feedbackRecieved: new Date('10-14-2019'),
          feedbackDelivered: new Date('10-15-2020'),
        }
      ],
      totalPages: 1,
      currentPage: 0,
      pageSize: 4,
    })
  })
  it('should have 3 table rows', () => {
    expect(tableComponent.find('tr').length).toEqual(3)
  })
})
