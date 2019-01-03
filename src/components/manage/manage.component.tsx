import * as React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import ProtectedRoute from '../protected-route.component.tsx/protected-route.component';
import { ManageUsersComponenet } from './users/manage-users.component';
import { Link } from 'react-router-dom';


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
              <Link className="" to="/manage/cohorts"><NavLink className="rev-btn-tab">Cohorts</NavLink></Link>
            </NavItem>
            <NavItem>
              <Link className="" to="/manage/users/staging-manager"><NavLink className="rev-btn-tab" >Users</NavLink></Link>
            </NavItem>
          </Nav>
        </div>
        <ProtectedRoute component={ManageUsersComponenet} path="/manage/users/:role" allowedRoles={['admin']} />
      </>
    )
  }
}