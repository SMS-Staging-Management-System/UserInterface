import * as React from 'react';
import CohortTableHeaderComponent from '../manager/cohort/cohort-table-header.component';
import CohortRowComponent from '../manager/cohort/cohort-row.component';
import { Table } from 'reactstrap';
import { IState } from "src/reducers";
import { connect } from "react-redux";
import { ICohort } from 'src/model/Cohort.model';

/**
 * A table of cohorts
 */

interface IProps {
  cohorts: ICohort[]
}
export class CohortTableComponent extends React.Component<IProps> {

  public render() {
    return (
      <>
        <Table className="table table-hover table-bordered">
          <CohortTableHeaderComponent/>
          <tbody>

            {this.props.cohorts.map(cohort => <CohortRowComponent key={cohort.cohortId} cohort={cohort}/> )}

          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => state.manager;
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortTableComponent);