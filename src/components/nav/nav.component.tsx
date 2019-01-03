import * as React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { setup } from '../../actions/auth/auth.actions';


class AppNav extends React.PureComponent<any, {}, {}> {

  componentDidMount() {
    this.props.setup();
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
                      <div className="dropdown-item"><Link to="/profile" className="unset-anchor nav-link active">Profile</Link></div>
                      <div className="dropdown-item"><Link to="/logout" className="unset-anchor nav-link active">Logout</Link></div>
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
  setup
}
export default connect(mapStateToProps, mapDispatchToProps)(AppNav);