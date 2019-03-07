import * as React from 'react';
import {
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { ICognitoUser } from '../../../model/cognito-user.model';
import Button from 'reactstrap/lib/Button';

/**
 * {v}: dropdown with further info
 * #: hoverable props
 * 
 * Row headers:
 * |-------------------------------------------------------------------------------------------------|
 * |--Cohort.Name--|--Address.alias{v}--|--Token.(){v}-- |--StartMonth--|--trainer email-v--         |
 * |=================================================================================================|
 * |  1901-blake   |  USF               | [Get token  v] | March 2019   | [blake.kruppa@gmail.com v] |
 * |-------------------------------------------------------------------------------------------------|
 * |  1902-flake   |  Reston            | [Get token  v] | March 2019   | [flake@gmail.com v       ] |
 * |-------------------------------------------------------------------------------------------------|
 * |  1903-fake    |  USF               | [Get token  v] | March 2019   | [abatson@gmail.com v     ] |
 * |-------------------------------------------------------------------------------------------------|
 * |  1904-bake    |  Reston            | [Get token  v] | March 2019   | [fllorida.man@gmail.com v] |
 * |-------------------------------------------------------------------------------------------------|
 * |  1905-make    |  USF               | [Get token  v] | March 2019   | [blake.kruppa@gmail.com v] |
 * |-------------------------------------------------------------------------------------------------|
 *                                                                         [p1 ] [p2 ] ... [p4 ] [p5 ]                
 * 
 * {
 *   Cohort # {
 *     cohortDescription,
 *   }
 * 
 * }
 */
export interface IManageAssociatesComponentProps {
  manageUsers: ICognitoUser[];

  toggleCreateCohortModal: () => void;
}

export class ManageCohortsComponenet extends React.Component<IManageAssociatesComponentProps, any> {

  constructor(props) {
    super(props);
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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.manageUsers.map((user) =>
                <tr key={user.email} className="rev-table-row">
                  <td></td>
                  <td></td>
                  <td>{user.email}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </>
    )
  }
}