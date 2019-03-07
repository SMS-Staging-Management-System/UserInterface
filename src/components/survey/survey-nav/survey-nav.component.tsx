import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';


interface ISurveyNavComponentProps extends RouteComponentProps{
  updateSurveyTable: (group: string) => void,
  toggleCreateUserModal: () => void,
  manage: string,
}  

export class SurveyNavComponent extends React.Component<ISurveyNavComponentProps, any> {
  constructor(props) {
    super(props);
  }

  // returns active if the role provided in the route is the routeName provided
  isActive = (routeName: string) => ((this.props.manage === routeName) ? 'manage-user-nav-item-active' : 'manage-user-nav-item')

  render() {
    let {path} = this.props.match
    return (
      <Navbar className="manage-users-nav" color="faded" light>
        <Nav tabs className="align-start">
          <NavItem>
            <Link to= {path + "/build"}
              className={`nav-link ${this.isActive('admin')}`}
            //   onClick={() => this.props.updateSurveyTable('admin')}
              >Build</Link>
          </NavItem>
          <NavItem>
            <Link to={path + "/assign"}
              className={`nav-link ${this.isActive('staging-manager')}`}
            //   onClick={() => this.props.updateSurveyTable('staging-manager')}
              >Assign</Link>
          </NavItem>
          <NavItem>
            <Link to={path + "/analytics"}
              className={`nav-link ${this.isActive('trainer')}`}
            //   onClick={() => this.props.updateSurveyTable('trainer')}
              >Analytics</Link>
          </NavItem>
          <NavItem>
            <Link to={path + "/available"}
              className={`nav-link ${this.isActive('associates')}`}
            //   onClick={() => this.props.updateSurveyTable('trainer')}
              >Available</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
