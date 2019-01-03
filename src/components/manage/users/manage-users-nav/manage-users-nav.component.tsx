import * as React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
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

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Navbar color="faded" light>
        <Nav tabs className="align-start">
          <NavItem>
            <Link to="/manage/users/admin"><NavLink active={this.props.role === 'admin'}>Admins</NavLink></Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/staging-manager"><NavLink active={this.props.role === 'staging-manager'}>Staging Managers</NavLink></Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/trainer"><NavLink active={this.props.role === 'trainer'}>Trainers</NavLink></Link>
          </NavItem>
          <NavItem>
            <Link to="/manage/users/associate"><NavLink active={this.props.role === 'associate'}>Associates</NavLink></Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}