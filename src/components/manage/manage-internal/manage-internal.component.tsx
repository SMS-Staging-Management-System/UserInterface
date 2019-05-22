import * as React from 'react';
import { Table } from 'reactstrap';
import { ICognitoUser } from '../../../model/cognito-user.model';
import ViewUserModal from '../view-user-modal/view-user-modal.container';


export interface IManageInternalComponentProps {
  manageUsers: ICognitoUser[];
  toggleViewUserModal: () => void;
  /**
   * Handles what happens when a user is hovered
   * 
   * @param email: The email address of the hovered user
   */
  hoveredUser: (email: string) => void;
}
/**
 * {v}: dropdown with further info
 * #: hoverable props
 * [... ]: button
 * 
 * `Row headers:
 * |-----------\|---------------------\|-------------\|----------\
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

export class ManageInternalComponenet extends React.Component<IManageInternalComponentProps, any> {

  constructor(props: IManageInternalComponentProps) {
    super(props);
  }
  

  render() {
    return (
        <Table striped id="manage-users-table">
        <ViewUserModal/>
          <thead className="rev-background-color">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              /**
               * onMouseEnter should set the hoveredUser in
               * some state this component is subscribed to
               * to be some user,
               * 
               * then the modal can reuse that same user in its state
               * and it all be goouchi
               * 
               * eventually call this.props.updateUserInfo(e)
               * 
               * One way to solve it is to use this, but it does the operation in render and we do NOT want tha
               * () => userClient.findOneByEmail(user.email).then(resp => this.props.updateUserInfo(resp.data))
               */
              this.props.manageUsers.map((user) =>
                <tr key={user.email} className="rev-table-row" onClick={this.props.toggleViewUserModal} onMouseEnter={()=>this.props.hoveredUser(user.email)}>
                  <td></td>
                  <td></td>
                  <td>{user.email}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
        
    )
  }
}