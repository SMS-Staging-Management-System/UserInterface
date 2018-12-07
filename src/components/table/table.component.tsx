import * as React from 'react';
import CheckInRowComponent from '.././manager/checkin/checkin-in-row.component';
import CheckInHeaderComponent from '../manager/checkin/check-in-header.component';
import CohortHeaderComponent from '../manager/cohort/cohort-header.component';
import CohortRowComponent from '../manager/cohort/cohort-row.component';
import { Table } from 'reactstrap';
/*
  *The managers tables
*/

interface IProps{
  type: string;
}

export class TableComponent extends React.Component<IProps, {}> {

  public render() {
    console.log(this.props.type);
    return (
      <>
        <Table className="table table-hover table-bordered">
          {this.props.type === "checkIn"
          ? <CheckInHeaderComponent/> 
          : <CohortHeaderComponent/>}
          <tbody>
          {this.props.type === "checkIn"
          ? <CheckInRowComponent/> 
          : <CohortRowComponent/>}
          </tbody>
        </Table>
      </>
    );
  }
}

export default TableComponent