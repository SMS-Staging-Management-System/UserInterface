import * as React from 'react';
import { ContainerComponent } from './manager.container';
import ClockComponent from '../../components/clock/clock.component';
import CreateNewModalComponent from './cohort/cohort-create-modal.component'

export interface IState {
  modal: boolean
}
export class ManagerContentComponent extends React.Component<{},IState> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  public modalOn = () => {
    this.setState({
      ...this.state,
      modal: true
    })
  }

  public modalOff = () => {
    this.setState({
      ...this.state,
      modal: false
    })
  }
  public render() {
    return (
      <div className="manager-content col-12 shadow-lg p-3 mb-5 bg-white rounded">
        <button className="btn btn-danger" onClick={this.modalOn}>New Cohort</button>
        <CreateNewModalComponent
          toggle = {this.modalOn}
          modal = {this.state.modal}
          modalOff = {this.modalOff}/>
        <div>
          <h4>SMS Manager Dashboard <ClockComponent/></h4>
        </div>
        <hr/>
        <div>
          <ContainerComponent/>
        </div>
      </div>
    );
  }
}
export default ManagerContentComponent;