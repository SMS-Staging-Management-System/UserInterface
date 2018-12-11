import * as React from 'react';
import AssociateTable from './associatetable.component';
import AssociateCheckInSubmit from './associatecheckin.component';
import ClockComponent from '../clock/clock.component';
interface IState {
  isCheckingIn: boolean;
}

export class AssociateContent extends React.Component<IState>{
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

  handleSubmitClick = () => {
    this.setState({isCheckingIn: false});
  }

  
  render() {
    const { isCheckingIn } = this.state;
    let button;

  // components to switch to
    
  function Update (props)  {
    return <AssociateCheckInSubmit />;
  };

  function CheckIn(props) {
    return <AssociateTable type={'associate'}/>;
  };

  // the mighty switch

  function Switch (props) {
    if (isCheckingIn) {
      return <Update />;
    }
    return <CheckIn />;
  }

  // buttons used to control switching

  function UpdateButton (props) {
    return (
      <div id="btn-right"> 
        <button type="button"  className="btn btn-danger" onClick={props.onClick}>
          Return
        </button>
      </div>
    );
  }
  
  function CheckInButton (props) {
    return (
      <div id="associatecontent">
      <div id="btn-right">
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.onClick}>
          Submit Check In
        </button>
      </div>
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
        
        <div id="associatecontent">
          <h4 id="associatecontentheader">Associate Dashboard <ClockComponent/></h4>
          {button}
        </div>
        <div>
          <Switch isLoggedIn={isCheckingIn} />
        </div>
      </div>
      
    );
  }
}