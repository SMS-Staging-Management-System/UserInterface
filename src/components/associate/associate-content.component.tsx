import * as React from 'react';
import AssociateTable from './associate-table.component';
import AssociateCheckInSubmit from './associate-checkin.component';
import ClockComponent from '../clock/clock.component';
interface IState {
  isCheckingIn: boolean;
}

export class AssociateContentComponent extends React.Component<{}, IState>{
  
  public state: IState = {
    isCheckingIn: false
  }

  constructor(props: any) {
    super(props);
    this.handleCheckInClick = this.handleCheckInClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }


  public handleCheckInClick() {
    this.setState({isCheckingIn: true});
  }

  public handleSubmitClick = () => {
    this.setState({isCheckingIn: false});
  }

  // new switch logic

  public Switch = (props) => {
    if (this.state.isCheckingIn) {
      return <AssociateCheckInSubmit />
    } 
      return <AssociateTable type={'associate'}/> 
  };
  
  public render() {
    const { isCheckingIn } = this.state;
    let button;


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
            <h4  id="associatecontentheader">Associate Dashboard <ClockComponent/></h4>
            <span>
            <a id="associatebutton">{button}</a>
            </span>
        </div>
        <div className="d-flex justify-content-end">
          <this.Switch isLoggedIn={isCheckingIn} />
        </div>
      </div>
      
    );
  }
}