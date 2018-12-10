import * as React from 'react';
import CheckInHeaderManagerComponent from '../manager/checkin/check-in-header-manager.component';
import { Table } from 'reactstrap';
import CheckinPaginationManagerComponent from '../manager/manager-checkin-pagination.component';


interface IProps {
  type: string;
}
/**
 * The table to render a list of check in
 */
export class ManagerCheckinTableComponent extends React.Component<IProps> {

  public renderRows = () => {
    if(this.props.type === 'manager') {
      return <CheckinPaginationManagerComponent/>
    } else if(this.props.type === 'associate') {
      // Return your associate rows here
      return <></>
    }
    return <></>
  }

  public render() {
    const sRows = this.renderRows();
    return (
      <>
        <Table className="table table-hover table-bordered table-sm">
          <CheckInHeaderManagerComponent/> 
          <tbody>
            {sRows}
          </tbody>
        </Table>
      </>
    );
  }
}

export default ManagerCheckinTableComponent