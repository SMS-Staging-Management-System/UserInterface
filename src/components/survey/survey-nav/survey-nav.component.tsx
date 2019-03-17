import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';


interface ISurveyNavComponentProps extends RouteComponentProps {
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
    let { path } = this.props.match
    return (
      <Navbar className="manage-users-nav" color="faded" light>
        <Nav tabs className="align-start">
          <NavItem>
            <Link to={path + "/assigned"}
              className={`nav-link ${this.isActive('assigned')}`}
            >Assigned To Me</Link>
          </NavItem>
          <NavItem>
            <Link to={path + "/all-surveys"}
              className={`nav-link ${this.isActive('all-surveys')}`}
            >All Surveys</Link>
          </NavItem>
          <NavItem>
            <Link to={path + "/build"}
              className={`nav-link ${this.isActive('build')}`}
            >Build</Link>
          </NavItem>
          <NavItem>
            <Link to={path + "/templates"}
              className={`nav-link ${this.isActive('templates')}`}
            >Templates</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
