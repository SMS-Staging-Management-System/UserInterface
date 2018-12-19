import * as React from 'react';
import ManagerCommentComponent from './manager-comment.component';
import ManagerDailyTasksComponent from './manager-daily-tasks-component';
import { IState } from '../../../reducers/index';
import { connect } from 'react-redux';
import * as managerActions from '../../../actions/manager/manager.actions';
import { ICheckIn } from '../../../model/CheckIn.model';
import time from '../../../include/time'

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
  selectedCheckIn: number
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
      popover: false,
      selectedCheckIn: null
    };
  }
  // get name to pass name to the comment component
  public getName = (name: string, checkInId: number) => {
    this.setState({
      ...this.state,
      firstName: name,
      modal: !this.state.modal,
      popover: !this.state.popover,
      selectedCheckIn: checkInId
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
      return this.props.checkIns.map((checkin, index) => {
        if (index >= FIRST_INDEX && index <= LAST_INDEX) {
          return <tr
            id={`row-${checkin.checkinId}`}  // set unique checkin ids for each row
            key={checkin.checkinId}  // using checkin id for the key as well
            onClick={() => this.getName(checkin.firstName, checkin.checkinId)} // activate comment modal
            onMouseOver={() => this.tasks(checkin.checkinId, checkin.checkinDescription, checkin.managerComments)} // activate daily tasks
            onMouseLeave={() => this.hide()}
            // adding support for mobile device to show daily tasks and manager comments
            onTouchStart={() => this.tasks(checkin.checkinId, checkin.checkinDescription, checkin.managerComments)}
            onTouchCancel={() => this.hide()}
          >
            <td >{checkin.checkinId}</td>
            <td>{checkin.firstName}</td>
            <td>{checkin.lastName}</td>
            <td>{checkin.email}</td>
            <td>{time(checkin.dateSubmitted)}</td>
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
            checkinId={this.state.checkinId}
            show={this.state.popover} />
        }
        {/* Modal for manager comments */}
        <ManagerCommentComponent
          checkinId={this.state.selectedCheckIn}
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