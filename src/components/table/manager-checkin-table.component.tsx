import * as React from 'react';
import CheckInHeaderManagerComponent from '../manager/checkin/check-in-header-manager.component';
import { Table } from 'reactstrap';
import CheckinPaginationManagerComponent from '../manager/manager-checkin-pagination.component';

/**
 * The table to render a list of check in
 */
export class ManagerCheckinTableComponent extends React.Component {

  public render() {
    return (
      <>
        <Table className="table table-hover table-bordered table-sm">
          <CheckInHeaderManagerComponent/> 
          <tbody>
            <CheckinPaginationManagerComponent/>
          </tbody>
        </Table>
      </>
    );
  }
}

export default ManagerCheckinTableComponent