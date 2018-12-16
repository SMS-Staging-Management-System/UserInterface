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
  DropdownItem } from 'reactstrap';
import RevLogo from '../../assets/rev-logo.png';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { IUser } from '../../model/User.model';

import * as userActions from '../../actions/user/user.actions';

interface IComponentState {
  isOpen: boolean
}
interface IComponentProps {
  isLogin: boolean,
  user:  IUser,
  changePage: (page: string) => {void},
  logout: () => {void}
}
class AppNav extends React.PureComponent<IComponentProps, IComponentState, any> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  
  public toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public renderCollapse = () => {
    if(this.props.isLogin && (this.props.user !== null)) {
      return	<UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.user.email}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem 
                    className="cursor-hover"
                    onClick={() => this.props.changePage('profile')}>
                    Profile
                  </DropdownItem>
                  <DropdownItem divider />
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
          onClick={() => this.props.changePage('home')}
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
export default connect(mapStateToProps, mapDispatchToProps)(AppNav);