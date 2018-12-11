import * as React from 'react';
import CohortTableHeaderComponent from '../manager/cohort/cohort-table-header-component';
import CohortRowComponent from '../manager/cohort/cohort-row.component';
import { Table } from 'reactstrap';

/**
 * A table of cohorts
 */
export class CohortTableComponent extends React.Component {

  public render() {
    return (
      <>
        <Table className="table table-hover table-bordered">
          <CohortTableHeaderComponent/>
          <tbody>
            <CohortRowComponent/>
          </tbody>
        </Table>
      </>
    );
  }
}

export default CohortTableComponent