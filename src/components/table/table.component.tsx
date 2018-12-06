import * as React from 'react';
import CheckInRowComponent from '.././manager/checkin/checkin-in-row.component';
import CheckInHeaderComponent from '../manager/checkin/check-in-header.component';
/*
  *The check-in table
*/

export class TableComponent extends React.Component<{}> {

  public render() {
    return (
      <>
        <table className="table table-hover">
          <CheckInHeaderComponent/>
          <tbody>
           <CheckInRowComponent/>
          </tbody>
        </table>
      </>

    );
  }
}

export default TableComponent