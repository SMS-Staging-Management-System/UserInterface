import * as React from 'react';
import AssociateHeader from './associateheader.component';
import { Table } from 'reactstrap';
import AssociateCheckInPagination from './associatecheckinpagination.component';

interface IProps {
  type: string;
}
/**
 * The table to render a list of check in
 */
export class AssociateTable extends React.Component<IProps, {}> {

  // config for assocaite stuff
  public renderRows = () => {
      return <AssociateCheckInPagination/>
  }

  public render() {
    const sRows = this.renderRows();
    return (
      <>
        <Table className="table table-hover table-bordered">
          <AssociateHeader/> 
          <tbody>
            {sRows}
          </tbody>
        </Table>
      </>
    );
  }
}

export default AssociateTable