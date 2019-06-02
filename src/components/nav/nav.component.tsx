import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { IState, } from '../../reducers';
import { IAuthState } from '../../reducers/management'
import { connect } from 'react-redux';
import { setup, logout } from '../../actions/auth/auth.actions';
import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import { FaUserAlt, FaDatabase, FaClock, FaThumbsUp, FaComment, FaListOl } from 'react-icons/fa';
import { cognitoRoles } from '../../model/cognito-user.model';

interface IProps extends RouteComponentProps<{}> {
  logout: () => void;
  setup: () => void;
  auth: IAuthState;
}

class AppNav extends React.PureComponent<IProps, {}, {}> {

  componentDidMount() {
    this.props.setup();
  }

  logout = () => {
    this.props.logout();
    this.props.history.push('/management/login');
    toast.success('Successfully logged out');
  }

  public render() {
    const props = this.props;
    return (
      <div>
        <nav className="app-nav navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
          <div className="navbar-header c-pointer shift-left">
            <Link to="/home" className="unset-anchor">
              <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
            </Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample04">

            <ul className="navbar-nav ml-auto margin-nav">
              {props.auth.currentUser.email
                ? // if ther is a email show the nav elements 

                <>
                  {
                    this.props.auth.currentUser.roles.length === 0 ?
                      <li className="nav-item active"><Link to="/surveys" className="unset-anchor nav-link">Surveys</Link></li> : null
                  }
                  {

                    this.props.auth.currentUser.roles.some(role => role === cognitoRoles.STAGING_MANAGER || role === cognitoRoles.ADMIN || role === cognitoRoles.TRAINER) &&
                    <>
                      <li className="nav-item active">
                        <Link to="/surveys" className="unset-anchor nav-link">Surveys</Link>
                      </li>
                      <li className="nav-item active">
                        <Link to="/management/manage/cohorts" className="unset-anchor nav-link">Manage</Link>
                      </li>
                      <li className="nav-item active dropdown">
                        <a className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FaDatabase /> Interviews </a>
                        <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                          <Link to="/interview/new" className=" dropdown-item nav-dropdown"> New Interview</Link>
                          <Link to="/interview/list" className=" dropdown-item nav-dropdown"> Interview List </Link>
                        </div>
                      </li>
                      <li className="nav-item active dropdown">
                        <a className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FaDatabase /> Reports</a>
                        <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                          <Link to="/interview/report/feedback" className=" dropdown-item nav-dropdown"><FaThumbsUp /> Feedback Given Report...</Link>
                          <Link to="/interview/report/24hour" className=" dropdown-item nav-dropdown"><FaClock /> Given 24 Hour Notice Report...</Link>
                          <Link to="/interview/report/jobDesc" className=" dropdown-item nav-dropdown"><FaComment /> Job Description Given Report...</Link>
                          <Link to="/interview/report/AssociateInterviews" className=" dropdown-item nav-dropdown"><FaListOl /> Interviews Per Associate Report...</Link>
                        </div>
                      </li>

                    </>
                  }
                  {
                    (this.props.auth.currentUser.roles.length === 0) &&
                    <li>
                      <Link to="/interview/list" className=" dropdown-item"> Interview List </Link>
                    </li>
                  }
                  <li className="nav-item active dropdown">
                    <a className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FaUserAlt />  {props.auth.currentUser.email}</a>
                    <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                      <Link to="/management/profile" className=" dropdown-item nav-dropdown">Profile</Link>


                      <div className="dropdown-item nav-dropdown" onClick={this.logout}>Logout</div>
                    </div>
                  </li>
                </>
                : // if there is no email show login button
                <li className="nav-item active">
                  <Link to="/management/login" className="unset-anchor nav-link"><FaUserAlt /> Log In</Link>
                </li>
              }
            </ul>
          </div>
        </nav>
      </div >
    );
  }
}

const mapStateToProps = (state: IState) => ({
  auth: state.managementState.auth
});
const mapDispatchToProps = {
  logout,
  setup,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppNav)) as any;