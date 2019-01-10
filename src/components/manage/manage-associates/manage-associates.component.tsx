import * as React from 'react';
import {
  Table,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { ICognitoUser } from '../../../model/cognito-user.model';

export interface IManageAssociatesComponentProps {
  manageUsers: ICognitoUser[];
}

export class ManageAssociatesComponenet extends React.Component<IManageAssociatesComponentProps, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div id="manage-associates-nav" className="rev-background-color">
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