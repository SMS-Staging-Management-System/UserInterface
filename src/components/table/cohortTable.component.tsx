import * as React from 'react';
import CohortTableHeaderComponent from '../manager/cohort/cohort-table-header.component';
import CohortRowComponent from '../manager/cohort/cohort-row.component';
import { Table } from 'reactstrap';
import { IState, IManagerState } from "src/reducers";
import { connect } from "react-redux";
import { ICohort } from 'src/model/Cohort.model';
import * as managerActions from "../../actions/manager/manager.actions"


/**
 * A table of cohorts
 */

interface IStateComponent {
  selected: number
 }

interface IProps extends IManagerState{
  selectCohort: (sCohort: ICohort) => (dispatch: any) => void
}
export class CohortTableComponent extends React.Component<IProps, IStateComponent> {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    }
  }

  public changeSelected = (select: number) => {
    this.setState({
      selected: select
    })
  }

  public render() {
    return (
      <>
        <Table bordered hover>
          <CohortTableHeaderComponent/>
          <tbody>
            {this.props.cohorts.map(cohort => <CohortRowComponent key={cohort.cohortId} changeSelected={this.changeSelected} selected={(this.state.selected === cohort.cohortId) ? true : false} cohort={cohort} selectCohort={this.props.selectCohort} /> )}
          </tbody>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => state.manager;
const mapDispatchToProps = {
  selectCohort: managerActions.selectCohort
};
export default connect(mapStateToProps, mapDispatchToProps)(CohortTableComponent);