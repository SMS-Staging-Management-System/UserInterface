import * as React from 'react';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
/*
  *The manager can view the associates task for current check-in on this component
*/
interface IProps {
  comment: string
  description: string
  show: boolean
  userId: number
}

export class ManagerDailyTasksComponent extends React.Component<IProps> {

  public render() {
    return (
      <>
        <Popover placement="top" isOpen={this.props.show} target={`row-${this.props.userId}`}>
          <PopoverHeader className="daily-tasks-header">
          <strong>Daily Tasks</strong>
          </PopoverHeader>
          <PopoverBody className="daily-tasks">{this.props.description}</PopoverBody>
        </Popover>
        <Popover placement="left" isOpen={this.props.show} target={`row-${this.props.userId}`}>
          <PopoverHeader className="daily-tasks-header">
          <strong>Manager Comment</strong>
          </PopoverHeader>
          <PopoverBody className="daily-tasks">{this.props.comment}</PopoverBody>
        </Popover>
      </>
    );
  }
}

export default ManagerDailyTasksComponent