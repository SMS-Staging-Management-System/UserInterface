import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { IState, IAuthState } from '../../reducers';
import { connect } from 'react-redux';
import { setup, logout } from '../../actions/auth/auth.actions';
import { toast } from 'react-toastify';
import { withRouter } from "react-router";

interface IProps extends RouteComponentProps<{}> {
  logout: () => void;
  setup: () => void;
  auth: IAuthState;
}

class AppNav extends React.PureComponent<IProps, {}, {}> {

  componentDidMount() {
    this.props.setup();
  }

  logout= () => {
    this.props.logout();
    this.props.history.push('/login');
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
                  <li className="nav-item active">
                    <Link to="/checkins" className="unset-anchor nav-link">Checkins</Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/manage/cohorts" className="unset-anchor nav-link">Manage</Link>
                  </li>
                  <li className="nav-item active dropdown">
                    <a className="nav-link dropdown-toggle pointer" id="examples-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.auth.currentUser.email}</a>
                    <div className="dropdown-menu" aria-labelledby="examples-dropdown">
                      <Link to="/profile" className=" dropdown-item nav-dropdown">Profile</Link>
                      <div className="dropdown-item nav-dropdown" onClick={this.logout}>Logout</div>
                    </div>
                  </li>
                </>
                : // if there is no email show login button
                <li className="nav-item active">
                  <Link to="/login" className="unset-anchor nav-link">Log In</Link>
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
  auth: state.auth
});
const mapDispatchToProps = {
  logout,
  setup,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppNav)) as any;