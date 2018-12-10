import * as React from 'react';
import { Link } from 'react-router-dom';
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

interface IComponentState {
  isOpen: boolean
}
interface IComponentProps {
  login: boolean,
  user:  IUser
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
  
  public render() {
    return (
      <Navbar color="light" light expand="md">
      <NavbarBrand>
        <Link to="/" className="unset-anchor">
          <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {
            this.props.user &&
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.props.user.email}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          }
        </Nav>
      </Collapse>
    </Navbar>
    );
  }
}

const mapStateToProps = (state: IState) => (state.user)
export default connect(mapStateToProps)(AppNav);