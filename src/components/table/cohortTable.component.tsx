import * as React from "react";
import CohortTableHeaderComponent from "../manager/cohort/cohort-table-header.component";
import CohortRowComponent from "../manager/cohort/cohort-row.component";
import { Table } from "reactstrap";
import { IState, IManagerState } from "src/reducers";
import { connect } from "react-redux";
import { ICohort } from "src/model/Cohort.model";
import * as managerActions from "../../actions/manager/manager.actions";

/**
 * A table of cohorts
 */

interface IStateComponent {
  selected: number;
}

interface IProps extends IManagerState {
  selectCohort: (sCohort: ICohort) => (dispatch: any) => void;
  toggle: () => void;
  selected: number;
  changeSelected: (selected: number) => void;
}

export class CohortTableComponent extends React.Component<
  IProps,
  IStateComponent
> {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }

  public changeSelectedTable = (select: number) => {
    this.setState({
      ...this.state,
      selected: select
    });
    this.props.changeSelected(select);
  };

  public render() {
    return (
      <>
        <Table bordered hover>
          <CohortTableHeaderComponent />
          <tbody>
            {this.props.cohorts.map(cohort => {
              return (
                <CohortRowComponent
                  key={"cohort-row-" + cohort.cohortId}
                  toggle={this.props.toggle}
                  changeSelected={this.changeSelectedTable}
                  isSelected={
                    this.state.selected === cohort.cohortId ? true : false
                  }
                  cohort={cohort}
                  selectCohort={this.props.selectCohort}
                />
              );
            })}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CohortTableComponent);
