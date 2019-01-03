import * as React from 'react';
import { Nav, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';
import { Link } from 'react-router-dom';

export class ManageUserNavComponent extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  // returns active if the role provided in the route is the routeName provided
  isActive =(routeName: string) => ((this.props.role === routeName) ? 'manage-user-nav-item-active' : 'manage-user-nav-item')


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Navbar id="manage-users-nav" color="faded" light>
        <Nav tabs className="align-start">
          <NavItem>
            <Link to="/manage/users/admin" className={`nav-link ${this.isActive('admin')}`}>Admins</Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/staging-manager" className={`nav-link ${this.isActive('staging-manager')}`}>Staging Managers</Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/trainer" className={`nav-link ${this.isActive('trainer')}`}>Trainers</Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/associate" className={`nav-link ${this.isActive('associate')}`}>Associates</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}