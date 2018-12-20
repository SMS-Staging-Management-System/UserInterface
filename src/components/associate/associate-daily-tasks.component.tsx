import * as React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
interface IProps {
 comment: string
 description: string
 show: boolean
 checkinId: number
}

export class AssociateDailyTasksComponent extends React.Component<IProps> {

 public render() {
   return (
     <>
       <Popover placement="top" isOpen={this.props.show} target={`row-${this.props.checkinId}`}>
       <PopoverHeader className="daily-tasks-header">
           <strong>Comments</strong>
         </PopoverHeader>
         <PopoverBody className="daily-tasks"><div><strong>Associate:</strong></div>{this.props.description}</PopoverBody>
         <hr id="pop-hr"></hr>
         <PopoverBody className="daily-tasks"><div><strong>Manager:</strong></div>{this.props.comment}</PopoverBody>
       </Popover>
     </>
   );
 }
}

export default AssociateDailyTasksComponent