import * as React from 'react';
import { Nav, NavItem } from 'reactstrap';
import ProtectedRoute from '../protected-route.component/protected-route.component';
import  ManageUsersComponenet  from './users/manage-users.container';
import { Link } from 'react-router-dom';
import CreateUserModal from './create-user-modal/create-user-modal.container';
import '../../actions/address/address.actions';


export class ManageComponent extends React.Component<any, any> {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <>
        <div>
          <Nav tabs>
            <NavItem>
              <Link to="/manage/cohorts" className="rev-btn-tab">Cohorts</Link>
            </NavItem>
            <NavItem>
              <Link to="/manage/users/staging-manager"className="rev-btn-tab">Users</Link>
            </NavItem>
          </Nav>
        </div>
        <ProtectedRoute component={ManageUsersComponenet} path="/manage/users/:group" allowedRoles={['admin']} />
        <CreateUserModal />
      </>
    )
  }
}