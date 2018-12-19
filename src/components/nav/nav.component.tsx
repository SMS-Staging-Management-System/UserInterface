import * as React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import RevLogo from '../../assets/rev-logo.png';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from '../../model/User.model';

import * as userActions from '../../actions/user/user.actions';
import { withRouter, Link } from 'react-router-dom';
import { History } from 'history';

interface IComponentState {
  isOpen: boolean
}
interface IComponentProps {
  isLogin: boolean,
  user: IUser,
  changePage: (page: string) => { void },
  logout: () => { void },
  history: History,
  setup: () => { void },
  roles: string[]
}
class AppNav extends React.PureComponent<IComponentProps, IComponentState, any> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  public componentDidMount() {
    this.props.setup();
  }

  public toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public route = () => {
    if (this.props.roles === undefined) {
      this.props.history.push("/dashboard")
    }
    else if (this.props.roles.includes("admin") || this.props.roles.includes("staging-manager") || this.props.roles.includes("trainer")) {
      this.props.history.push("/dashboard/check-ins")
    } 
  }

  public renderCollapse = () => {
    if (this.props.isLogin) {
      return <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {this.props.user
            ? this.props.user.email
            : "User"
          }
        </DropdownToggle>
        <DropdownMenu right>
          {
            this.props.user &&
            <>
            <div className="">
              <Link
                to="/profile"
                className="cursor-hover no-link">
                <DropdownItem className="cursor-hover">
                Profile
                </DropdownItem>
              </Link>
              </div>
              <DropdownItem divider />
            </>
          }
          <DropdownItem className="cursor-hover" onClick={() => this.props.logout()}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    } else {
      return <></>
    }
  }

  public render() {
    const sRenderCollapse = this.renderCollapse();
    return (
      <Navbar
        className="flex-package"
        color="light"
        light expand="md">
        <NavbarBrand
          className="cursor-hover"
          onClick={() => this.route()}
        >
          <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {sRenderCollapse}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {
  ...userActions
}
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(AppNav));