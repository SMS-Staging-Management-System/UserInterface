import React from 'react'
import { shallow } from 'enzyme';
import { Interview24Request } from './interview24.component';

jest.mock('../../../axios/sms-clients/interview-client', () => ({
  interviewClient: {
    fetch24: jest.fn((page: number, pageSize: number) => ({
      data: {
        content: [
          {
            assocName: 'Xohn Mold',
            assocEmail: 'xm@maxam.co',
            twentyFourAssoc: 'yes',
            twentyFourManager: 'yes',
          },
          {
            assocName: 'Andus Aegris',
            assocEmail: 'andustrious@rim.coffee',
            twentyFourAssoc: 'no',
            twentyFourManager: 'yes',
          },
          {
            assocName: 'Captain Swab',
            assocEmail: 'svabbi@thecaptain.com',
            twentyFourAssoc: 'no',
            twentyFourManager: 'no',
          },
          {
            assocName: 'Doctor Smear',
            assocEmail: 'svabbi@thecaptain.com',
            twentyFourAssoc: 'yes',
            twentyFourManager: 'no',
          },
        ],
        totalPages: 3
      }
    }))
  }
}))

describe('tests for 24 Hour Notice Chart', () => {
  const tableComponent = shallow(<Interview24Request />)
  it('should render with 5 users', () => {
    expect(tableComponent.state()).toMatchObject({
      Users: [
        {
          assocName: 'Xohn Mold',
          assocEmail: 'xm@maxam.co',
          twentyFourAssoc: 'yes',
          twentyFourManager: 'yes',
        },
        {
          assocName: 'Andus Aegris',
          assocEmail: 'andustrious@rim.coffee',
          twentyFourAssoc: 'no',
          twentyFourManager: 'yes',
        },
        {
          assocName: 'Captain Swab',
          assocEmail: 'svabbi@thecaptain.com',
          twentyFourAssoc: 'no',
          twentyFourManager: 'no',
        },
        {
          assocName: 'Doctor Smear',
          assocEmail: 'svabbi@thecaptain.com',
          twentyFourAssoc: 'yes',
          twentyFourManager: 'no',
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
