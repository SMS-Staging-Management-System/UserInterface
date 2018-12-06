import * as React from 'react';
import CommentComponent from './comment.component';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
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

// this fake data for the check-ins
const FAKE_CHECK_IN_DATA = [
    {
      cohort: "Blake 1810",
      description: "I am working on my portfolio today",
      firstName: "Nigel",
      lastName: "Christian",
      time: '12/4/2018 @ 0900',
      userId: 1
    }, {
      cohort: "Blake 1810",
      description: "I am taking the OCA today",
      firstName: "Andrew",
      lastName: "Wilson",
      time: '12/4/2018 @ 0900',
      userId: 2
    }, {
      cohort: "Blake 1810",
      description: "I am working on an internal Revature project for staging today",
      firstName: "Calvin",
      lastName: "Vo",
      time: '12/4/2018 @ 0900',
      userId: 3
    }
  ];
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

  public toggle = () => {
    this.setState({
      ...this.state,
      modal: !this.state.modal,
      popover: !this.state.popover
    });
  }

  public collapse = (name:string, id:number, dailyTasks:string) => {
    this.setState({
      ...this.state,
      description: dailyTasks,
      firstName: name,
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
 

  public render() {
    return (
      <>
        {FAKE_CHECK_IN_DATA.map(user =>
          <tr id={`row-${user.userId}`}key={user.userId} onClick={() => this.toggle()}
          onMouseOver={() => this.collapse(user.firstName, user.userId, user.description)} onMouseLeave={()=> this.hide()}>
            <td>{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.cohort}</td>
            <td>{user.time}</td>
            {/* Modal for manager comments */}
            <CommentComponent
            toggle = {this.toggle}
            modal = {this.state.modal}/>
            {this.state.modal === false &&
        <Popover placement="bottom" isOpen={this.state.popover} target={`row-${this.state.userId}`}>
          <PopoverHeader>{this.state.firstName}'s Daily Tasks</PopoverHeader>
          <PopoverBody>{this.state.description}</PopoverBody>
        </Popover>
         }
          </tr>
         )}
      </>

    );
  }
}

export default CheckInRowComponent