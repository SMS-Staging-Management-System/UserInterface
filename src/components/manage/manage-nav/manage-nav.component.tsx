import * as React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import NavLink from 'reactstrap/lib/NavLink';
import Navbar from 'reactstrap/lib/Navbar';


interface IManageNavComponentProps extends RouteComponentProps{
  updateManageUsersTable: (group: string) => void,
  toggleCreateUserModal: () => void,
  // toggleViewUserModal: () => void,
  manage: string,
}

export class ManageNavComponent extends React.Component<IManageNavComponentProps, any> {
  constructor(props: IManageNavComponentProps) {
    super(props);
  }

  // returns active if the role provided in the route is the routeName provided
  isActive = (routeName: string) => ((this.props.manage === routeName) ? 'manage-user-nav-item-active' : 'manage-user-nav-item')

  render() {
    let path = '/management'
    return (
      <Navbar className="manage-users-nav" color="faded" light>
        <Nav tabs className="align-start">
          <NavItem>
            <Link to= {path +"/manage/admin"}
              className={`nav-link ${this.isActive('admin')}`}
              onClick={() => this.props.updateManageUsersTable('admin')}>Admins</Link>
          </NavItem>
          <NavItem>
            <Link to={path +"/manage/staging-manager"}
              className={`nav-link ${this.isActive('staging-manager')}`}
              onClick={() => this.props.updateManageUsersTable('staging-manager')}>Staging Managers</Link>
          </NavItem>
          <NavItem>
            <Link to={path +"/manage/trainer"}
              className={`nav-link ${this.isActive('trainer')}`}
              onClick={() => this.props.updateManageUsersTable('trainer')}>Trainers</Link>
          </NavItem>
          <NavItem>
            <Link to={path +"/manage/cohorts"}
              className={`nav-link ${this.isActive('associates')}`}>Cohorts</Link>
          </NavItem>
        </Nav>
        <Nav tabs>
          <NavItem>
            <NavLink className="cursor-hover" onClick={this.props.toggleCreateUserModal}><FaUserPlus className="rev-color" /></NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

