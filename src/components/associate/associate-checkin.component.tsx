import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import * as associateActions from  '../../actions/associate/associate.actions';

interface IComponentState {
  description: string
}
export class AssociateCheckInSubmit extends React.Component<{}, IComponentState, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    }
  }

  public handleChange = (event) => {
    this.setState({
      description: event.target.value
    })
    console.log(event.target.value)
  }

  // public handleSubmit = (event) => {
  //   ;
  //   console.log('Check in successful');

  //   event.preventDefault();
  // }

  public render() {
    return (
      <div id="associate-row-container">
        <div id="header-row">
          <h4 id="header-field">Check In</h4>

        </div>
        <form>
          <ul className="list-group list-group-flush bg-transparent">
            <li className="list-group-item flex-row-sb bg-transparent">
              <textarea id="text-area" placeholder="Description" onChange={this.handleChange} />
            </li>
          </ul>
        </form>
        <div className="modal-footer">
          <button type="button" className="btn btn-danger" data-dismiss="modal" >Check In</button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state: IState) => (state.associate)
const mapDispatchToProps = {
  ...associateActions
}

export default connect(mapStateToProps, mapDispatchToProps)(AssociateCheckInSubmit);