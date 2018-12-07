import * as React from 'react';
import { AssociateRow } from '../../components/associatecontext/associaterow.component';
import { AssociateCheckIn } from '../../components/associatecontext/associatecheckin.component';
interface IState {
  isCheckingIn: boolean;
}

export class AssociateContext extends React.Component<IState>{

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
    // replace with table
    return <AssociateRow/>;
  }

  // our switch

  function Switch(props) {
    if (isCheckingIn) {
      return <Update />;
    }
    return <CheckIn />;
  }

  // buttons used to control switching

  function UpdateButton(props) {
    return (
      <div id="btn-right"> 
        <button type="button"  className="btn btn-danger" onClick={props.onClick}>
          Return
        </button>
      </div>
    );
  }
  
  function CheckInButton(props) {
    return (
      <div id="btn-right">
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.onClick}>
          Submit Check In
        </button>
      </div>
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