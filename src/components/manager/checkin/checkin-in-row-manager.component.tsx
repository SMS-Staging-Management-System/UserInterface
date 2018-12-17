import * as React from 'react';
import ManagerCommentComponent from './manager-comment.component';
import ManagerDailyTasksComponent from './manager-daily-tasks-component';
import { IState } from '../../../reducers/index';
import { connect } from 'react-redux';
import * as managerActions from '../../../actions/manager/manager.actions';
import { ICheckIn } from '../../../model/CheckIn.model';

/*
  *The check-in row component
*/
export interface IComponentState {
  popover: boolean
  modal: boolean
  firstName: string
  description: string
  managerComment: string
  checkinId: number
}

interface IProps {
  pageNumber: number,
  checkIns: ICheckIn[]
}
export class CheckInRowManagerComponent extends React.Component<IProps, IComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      checkinId: null,
      description: '',
      firstName: '',
      managerComment: '',
      modal: false,
      popover: false
    };
  }
  // get name to pass name to the comment component
  public getName = (name: string) => {
    this.setState({
      ...this.state,
      firstName: name,
      modal: !this.state.modal,
      popover: !this.state.popover
    });
  }
  // get associate's daily tasks to pass to popover
  public tasks = (id: number, dailyTasks: string, comment: string) => {
    this.setState({
      ...this.state,
      checkinId: id,
      description: dailyTasks,
      managerComment: comment,
      popover: true
    })
  }
  // hide associates tasks on new mouseover
  public hide = () => {
    this.setState({
      ...this.state,
      checkinId: null,
      popover: false
    })
  }

  // disable modal on cancel or submit
  public modalOff = () => {
    this.setState({
      ...this.state,
      modal: false
    })
  }

  public renderRows = () => {
    const LAST_INDEX = (this.props.pageNumber * 10) - 1;
    const FIRST_INDEX = LAST_INDEX - 9;

    if (this.props.checkIns.length !== 0) {
      return this.props.checkIns.map((user, index) => {
        if (index >= FIRST_INDEX && index <= LAST_INDEX) {
          return <tr
            id={`row-${user.userId}`}  // set unique user ids for each row
            key={user.userId}  // using user id for the key as well
            onClick={() => this.getName(user.firstName)} // activate comment modal
            onMouseOver={() => this.tasks(user.userId, user.checkinDescription, user.managerComments)} // activate daily tasks
            onMouseLeave={() => this.hide()}
            // adding support for mobile device to show daily tasks and manager comments
            onTouchStart={() => this.tasks(user.userId, user.checkinDescription, user.managerComments)}
            onTouchCancel={() => this.hide()}
          >
            <td >{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.dateSubmitted}</td>
          </tr>
        } else {
          return <></>
        }
      })
    } else {
      return <></>
    }
  }

  public render() {
    const rows = this.renderRows();

    return (
      <>
        {rows}
        { this.state.modal === false && 
          this.state.checkinId !== null &&
          <ManagerDailyTasksComponent
            comment={this.state.managerComment}
            description={this.state.description}
            userId={this.state.checkinId}
            show={this.state.popover} />
        }
        {/* Modal for manager comments */}
        <ManagerCommentComponent
          toggle={this.getName}
          modal={this.state.modal}
          firstName={this.state.firstName}
          modalOff={this.modalOff} />
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.manager)
const mapDispatchToProps = {
  ...managerActions
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckInRowManagerComponent)