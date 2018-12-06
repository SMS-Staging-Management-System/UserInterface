import * as React from 'react';
import { AssociateRow } from '../../components/associatecontext/associaterow.component';
import { AssociateCheckIn } from '../../components/associatecontext/associatecheckin.component';

interface IProps {
  nothing: string;
}

interface IState {
  isCheckingIn: boolean;
}

export class AssociateContext extends React.Component<IProps, IState>{

  state: IState = {
    isCheckingIn: false
  }

  constructor(props: any) {
    super(props);
    this.handleCheckInClick = this.handleCheckInClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }


  handleCheckInClick() {
    this.setState({isCheckingIn: true});
  }

  handleSubmitClick() {
    this.setState({isCheckingIn: false});
  }

  render() {
    const { isCheckingIn } = this.state;
    let button;

  // components to switch to
    
  function Update(props) {
    return <AssociateCheckIn/>;
  }
  
  function CheckIn(props) {
    return <AssociateRow/>;
  }

  // our switch

  function Switch(props) {
    // const isCheckingIn = props.isCheckingIn;
    if (isCheckingIn) {
      return <Update />;
    }
    return <CheckIn />;
  }

  // buttons used to control switching

  function UpdateButton(props) {
    return (
      <button type="button" className="btn btn-danger" onClick={props.onClick}>
        Submit
      </button>
    );
  }
  
  function CheckInButton(props) {
    return (
      <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.onClick}>
        Submit Check In
      </button>
    );
  }

  // switch logic
    if (isCheckingIn) {
      button = <UpdateButton onClick={this.handleSubmitClick} />;
    } else {
      button = <CheckInButton onClick={this.handleCheckInClick} />;
    }

    return (
      <div>
        <div>
          {button}
          <Switch isLoggedIn={isCheckingIn} />
          
          </div>
      </div>
      
    );
  }
}