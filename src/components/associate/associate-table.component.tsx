import * as React from 'react';
import AssociateHeader from './associate-header.component';
import { Table } from 'reactstrap';
import AssociateCheckInPagination from './associate-checkin-pagination.component';

/**
 * The table to render a list of check in
 */
export class AssociateTable extends React.Component {

  // config for assocaite stuff
  public renderRows = () => {
    return <AssociateCheckInPagination />
  }

  public render() {
    const sRows = this.renderRows();
    return (
      <>
        <Table className="table table-hover table-bordered" id="associate-row-container">
          <AssociateHeader />
          <tbody>
            {sRows}
          </tbody>
        </Table>
      </>
    );
  }
}

export default AssociateTable