import * as React from 'react';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import * as associateActions from  '../../actions/associate/associate.actions';
import { IUser } from 'src/model/User.model';

interface IComponentState {
  description: string
}

interface IComponentProps {
  user: IUser,
  associate: IState,
  handleSubmitClick: () => void
}
export class AssociateCheckInSubmit extends React.Component<IComponentProps, IComponentState> {

  constructor(props: any) {
    super(props);
    this.state = {
      description: ''
    }
  }

  // this.props.user.userId;

  public handleChange = (event) => {
    this.setState({
      description: event.target.value
    })
    console.log(event.target.value)
  }

  public handleSubmitCheckIn = () => {
    associateActions.submitCheckIn(this.state.description, this.props.user.userId);
    this.props.handleSubmitClick();
  }

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
          <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.handleSubmitCheckIn}>Check In</button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state: IState) => (state.user)
const mapDispatchToProps = {
  ...associateActions
}

export default connect(mapStateToProps, mapDispatchToProps)(AssociateCheckInSubmit);