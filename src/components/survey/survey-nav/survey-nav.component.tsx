import React, { Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';
import { IAuthState } from '../../../reducers/management';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';


interface ISurveyNavComponentProps extends RouteComponentProps {
  updateSurveyTable: (group: string) => void,
  toggleCreateUserModal: () => void,
  manage: string,
  auth: IAuthState
}

class SurveyNavComponent extends React.Component<ISurveyNavComponentProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: 1,
        name: 'Dunieski',
        role: 'associate'

      }
    }
  }

  componentDidMount() {
  
  }
  // returns active if the role provided in the route is the routeName provided
  isActive = (routeName: string) => ((this.props.manage === routeName) ? 'manage-user-nav-item-active' : 'manage-user-nav-item')

  render() {
    let { path } = this.props.match
     console.log(this.props.auth.currentUser);
    return (
      <Fragment>
        {
          this.props.auth.currentUser && this.props.auth.currentUser.roles.length === 0 ?// .some(role => role !== 'staging-manager' && role !== 'admin' && role !== 'trainer') ?

            <Navbar className="manage-users-nav" color="faded" light>
              <Nav tabs className="align-start">
                <NavItem>
                  <Link to={path + "/assigned"}
                    className={`nav-link ${this.isActive('assigned')}`}
                  >Assigned</Link>
                </NavItem>
              </Nav></Navbar>
            :
            <Navbar className="manage-users-nav" color="faded" light>
              <Nav tabs className="align-start">
                <NavItem>
                  <Link to={path + "/assigned"}
                    className={`nav-link ${this.isActive('assigned')}`}
                  >Assigned</Link>
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
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IState)  => ({
  auth: state.managementState.auth
})

export default connect(mapStateToProps)(SurveyNavComponent);