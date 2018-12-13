import * as React from 'react';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
interface IProps {
  description: string
  show: boolean
  userId: number
}

export class AssociateDailyTasksComponent extends React.Component<IProps> {

  public render() {
    return (
      <>
        <Popover placement="top" isOpen={this.props.show} target={`row-${this.props.userId}`}>
          <PopoverHeader>Daily Tasks</PopoverHeader>
          <PopoverBody>{this.props.description}</PopoverBody>
        </Popover>
      </>
    );
  }
}

export default AssociateDailyTasksComponent