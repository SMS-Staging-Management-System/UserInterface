import * as React from 'react';
import { IState } from '../../reducers/index';
import { connect } from 'react-redux';
import * as associateActions from '../../actions/associate/associate.actions'
import { ICheckIn } from '../../model/CheckIn.model';
import time from '../../include/time';
import AssociateDailyTasksComponent from './associate-daily-tasks.component';

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
export class AssociateRowComponent extends React.Component<IProps, IComponentState> {
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
      return this.props.checkIns.map((checkIn, index) => {
        if (index >= FIRST_INDEX && index <= LAST_INDEX) {
          return <tr className ="associate-row-table-class"
            id={`row-${checkIn.checkinId}`}  // set unique user ids for each row
            key={checkIn.checkinId}  // using user id for the key as well
            onClick={() => this.getName(checkIn.firstName)} // activate comment modal
            onMouseOver={() => this.tasks(checkIn.checkinId, checkIn.checkinDescription, checkIn.managerComments)} // activate daily tasks
            onMouseLeave={() => this.hide()}
            // adding support for mobile device to show daily tasks and manager comments
            onTouchStart={() => this.tasks(checkIn.checkinId, checkIn.checkinDescription, checkIn.managerComments)}
            onTouchCancel={() => this.hide()}
          >
            <td className="associate-row-target" >{checkIn.checkinId}</td>
            <td className="associate-row-target" >{checkIn.checkinDescription}</td>
            <td className="associate-row-target" >{checkIn.managerComments}</td>
            <td className="associate-row-target" >{time(checkIn.dateSubmitted)}</td>
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
          <AssociateDailyTasksComponent
            comment={this.state.managerComment}
            description={this.state.description}
            checkinId={this.state.checkinId}
            show={this.state.popover} />
        }
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.associate)
const mapDispatchToProps = {
  ...associateActions
}
export default connect(mapStateToProps, mapDispatchToProps)(AssociateRowComponent)