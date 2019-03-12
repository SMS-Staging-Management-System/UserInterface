import * as React from 'react';
import {
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import Button from 'reactstrap/lib/Button';
import { IManageCohortsComponentProps } from './manage-cohorts.container';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { ICohort } from '../../../model/cohort';

/**
 * {v}: dropdown with further info
 * #: hoverable props
 * [... ]: button
 * 
 * `Row headers:
 * |-----------\|---------------------\|-------------\|===========\
 * |--'Admins'--|--'Staging Managers'--|--'Trainers'--|--Cohorts--|                              [*+ ]
 * [ *********************************************************************************************** ]
 * [--Cohort.Name--|--Address.alias{v}--|--Token.(){v}-- |--StartMonth--|--trainer email-v--         ]
 * [=================================================================================================|
 * [  1901-blake   |  USF               | [Get token  v] | March 2019   | [blake.kruppa@gmail.com v] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1902-flake   |  Reston            | [Get token  v] | March 2019   | [flake@gmail.com v       ] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1903-fake    |  USF               | [Get token  v] | March 2019   | [abatson@gmail.com v     ] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1904-bake    |  Reston            | [Get token  v] | March 2019   | [fllorida.man@gmail.com v] |
 * [-------------------------------------------------------------------------------------------------|
 * [  1905-make    |  USF               | [Get token  v] | March 2019   | [blake.kruppa@gmail.com v] |
 * [ *********************************************************************************************** |
 *                                                                         [p1 ] [p2 ] ... [p4 ] [p5 ]                
 * `
 * {
 *   Cohort # {
 *     cohortDescription,
 *   }
 * 
 * }
 */


export class ManageCohortsComponenent extends React.Component<IManageCohortsComponentProps, any> {

  constructor(props) {
    super(props);
  }

  getAllCohorts = async (): Promise<ICohort[]> => {
    const resp = await cohortClient.findAll();
    const data = await resp.data
    return data
  }

  async componentDidMount () {

     const data = await this.getAllCohorts();
     console.log('calling getAllCohorts in componentDidMount')
     console.log(data);
     this.props.updateCohorts(data)

    // const fakeCohortData = [{
    //   cohortId: 100,
    //   cohortName: 'cohort name',
    //   cohortDescription: 'cohort desc',
    //   cohortToken: 'cohort token',
    //   address: {addressId: 200, street: 'address street', alias: 'address alias',
    //             city: 'address city', country: 'address country', state: 'address state', zip: 'address zip'},
    //   startDate: 'cohort start',
    //   endDate: 'cohort end',
    //   users: [],
    //   trainer: {email: 'trainer email', userId: 201, firstName: 'trainer first', lastName: 'trainer last',
    //             mobile: 'trainer mobile',
    //             roles: [], 
    //             address: {addressId: 300, street: 'trainer address street',
    //                       alias: 'trainer address alias',
    //                       city: 'trainer address city', country: 'trainer address country',
    //                       state: 'trainer address state', zip: 'trainer address zip'}
    //   }
    // }]
  }

  render() {
    return (
      <>
        <div id="manage-cohorts-nav" className="rev-background-color">
          <div id="manage-cohorts-view-selection-container">
            <div>View By:</div>
            <Dropdown color="success" className="responsive-modal-row-item rev-btn"
              isOpen={false}>
              {/* toggle={this.props.toggleLocationDropdown}> */}
              <DropdownToggle caret>
                Selection
                </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Year</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Trainer</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Location</DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </Dropdown>
          </div>

          <div>
            <Button className="responsive-modal-row-item rev-btn" onClick={this.props.toggleCreateCohortModal}>New Cohort</Button>
          </div>
        </div>
        <Table striped >
          <thead className="rev-background-color">
            <tr>
              <th>Cohort Name</th>
              <th>Location</th>
              <th>Token</th>
              <th>Start Month</th>
              <th>Trainer email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.cohorts.map((cohort) =>
                <tr key={cohort.cohortToken} className="rev-table-row">
                  <td>{cohort.cohortName}</td>
                  <td>{cohort.address? cohort.address.alias: ''}</td>
                  <td>{cohort.cohortToken}</td>
                  <td>{cohort.startDate}</td>
                  <td>{cohort.trainer? cohort.trainer.email: ''}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </>
    )
  }
}