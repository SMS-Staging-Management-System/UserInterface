import * as React from 'react';
import CommentComponent from './comment.component';
import DailyTasksComponent from './daily-tasks-component';
import {FAKE_CHECK_IN_DATA} from '../../../include/fake';
/*
  *The check-in row component
*/
export interface IState {
  popover: boolean
  modal: boolean
  firstName: string
  description: string
  userId: number
}
export class CheckInRowComponent extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      firstName: '',
      modal: false,
      popover: false,
      userId: 1
    };
  }

  public getName = (name:string) => {
    this.setState({
      ...this.state,
      firstName: name,
      modal: !this.state.modal,
      popover: !this.state.popover
    });
  }

  public tasks = (id:number, dailyTasks:string) => {
    this.setState({
      ...this.state,
      description: dailyTasks,
      popover: true,
      userId: id
    })
  }

  public hide = () => {
    this.setState({
      ...this.state,
      popover: false,
      userId: 1
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
      <>
        {/* Map data from database into the check-in table */}

        {FAKE_CHECK_IN_DATA.map(user =>
          <tr id={`row-${user.userId}`}key={user.userId} onClick={() => this.getName(user.firstName)}
          onMouseOver={() => this.tasks(user.userId, user.description)} onMouseLeave={()=> this.hide()}>
            <td>{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.cohort}</td>
            <td>{user.time}</td>
          </tr>

         )} else {
           return(<></>)
          }
         })}
         {/* See what associates are up doing */}
         {this.state.modal === false &&
           <DailyTasksComponent
            description={this.state.description}
            userId={this.state.userId}
            show={this.state.popover}/>
         }
          {/* Modal for manager comments */}
          <CommentComponent
            toggle = {this.getName}
            modal = {this.state.modal}
            firstName={this.state.firstName}
            modalOff = {this.modalOff}/>
      </>
    );
  }
}

export default CheckInRowComponent