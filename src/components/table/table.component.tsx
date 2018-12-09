import * as React from 'react';
import CheckInHeaderComponent from '../manager/checkin/check-in-header.component';
import CohortTableHeaderComponent from '../../components/manager/cohort/cohort-table-header-component';
import CohortRowComponent from '../manager/cohort/cohort-row.component';
import { Table } from 'reactstrap';
import Paginate from '../manager/pagination.component';

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
          : <CohortTableHeaderComponent/>}
          <tbody>
          {this.props.type === "checkIn"
          ? <Paginate/>
          : <CohortRowComponent/>}
          </tbody>
        </Table>
      </>
    );
  }
}

export default TableComponent