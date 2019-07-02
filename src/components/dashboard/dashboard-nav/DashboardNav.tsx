
import React, { Fragment } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import Navbar from 'reactstrap/lib/Navbar';
import { IAuthState } from '../../../reducers/management';
import { connect } from 'react-redux';
import { IState } from '../../../reducers';
import { getInterviews } from '../../../actions/dashboardActions/total-weekly.actions';

interface ISurveyNavComponentProps extends RouteComponentProps {
  updateSurveyTable: (group: string) => void,
  toggleCreateUserModal: () => void,
  getWeeklyInterviews: (date: number | Date) => void,
  manage: string,
  auth: IAuthState
}

class DashboardNav extends React.Component<ISurveyNavComponentProps, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getWeeklyInterviews(new Date());
  
  }
  // returns active if the role provided in the route is the routeName provided
  isActive = (routeName: string) => ((this.props.manage === routeName) ? 'manage-user-nav-item-active' : 'manage-user-nav-item')

  render() {
    let { path } = this.props.match
    return (
      <Fragment>
        {
          this.props.auth.currentUser && this.props.auth.currentUser.roles.length === 0 ?// .some(role => role !== 'staging-manager' && role !== 'admin' && role !== 'trainer') ?

            <>Only admin and manager can access to this section</>
            :
            <Navbar className="manage-users-nav" color="faded" light>
              <Nav tabs className="align-start">
                <NavItem>
                  <Link to={path + "/byStaging"}
                    className={`nav-link ${this.isActive('byStaging')}`}
                  >By Staging</Link>
                </NavItem>
                <NavItem>
                  <Link to={path + "/dropped"}
                    className={`nav-link ${this.isActive('dropped')}`}
                  >Dropped</Link>
                </NavItem>
                <NavItem>
                  <Link to={path + "/toStaging"}
                    className={`nav-link ${this.isActive('toStaging')}`}
                  >To Staging</Link>
                </NavItem>
                <NavItem>
                  <Link to={path + "/fiveOrMore"}
                    className={`nav-link ${this.isActive('fiveOrMore')}`}
                  >FiveOrMore</Link>
                </NavItem>
                <NavItem>
                  <Link to={path + "/numInterviews"}
                    className={`nav-link ${this.isActive('numInterviews')}`}
                  >NumInterviews</Link>
                </NavItem>
                <NavItem>
                  <Link to={path + "/pausedAssociates"}
                    className={`nav-link ${this.isActive('pausedAssociates')}`}
                  >PausedAssociates</Link>
                </NavItem>
                <NavItem>
                  <Link to={path + "/threeInterviews"}
                    className={`nav-link ${this.isActive('threeInterviews')}`}
                  >ThreeInterviews</Link>
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

const mapDispatchToProps = {
  getWeeklyInterviews: getInterviews
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNav);