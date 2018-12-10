import * as React from 'react';
import CheckInHeaderComponent from '../manager/checkin/check-in-header.component';
import { Table } from 'reactstrap';
import Paginate from '../manager/pagination.component';

/**
 * The table to render a list of check in
 */
export class CheckinTableComponent extends React.Component {

  public render() {
    return (
      <>
        <Table className="table table-hover table-bordered">
          <CheckInHeaderComponent/> 
          <tbody>
            <Paginate/>
          </tbody>
        </Table>
      </>
    );
  }
}

export default CheckinTableComponent