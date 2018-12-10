import * as React from 'react';
import CheckInHeaderComponent from '../manager/checkin/check-in-header.component';
import { Table } from 'reactstrap';
import Paginate from '../manager/pagination.component';

interface IProps {
  type: string;
}
/**
 * The table to render a list of check in
 */
export class CheckinTableComponent extends React.Component<IProps, {}> {

  public renderRows = () => {
    if(this.props.type === 'manager') {
      return <Paginate/>
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
        <Table className="table table-hover table-bordered">
          <CheckInHeaderComponent/> 
          <tbody>
            {sRows}
          </tbody>
        </Table>
      </>
    );
  }
}

export default CheckinTableComponent