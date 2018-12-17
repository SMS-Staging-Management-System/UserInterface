import * as React from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { IState } from "src/reducers";
import AssociatesTableHeaderComponent from "../manager/cohort/associates-table-header.component";
import { ICohort } from "src/model/Cohort.model";
import AssociatesRowComponent from "../manager/cohort/associates-row.component";

/**
 * The table to render a list of associate
 */

interface IProps {
  currentCohort: ICohort
}

export class AssociateTableComponent extends React.Component<IProps> {
  public render() {
    return (
      <>
        <Table className="table table-bordered">
        <AssociatesTableHeaderComponent />
          <tbody>
            {
              this.props.currentCohort ?
                this.props.currentCohort.userList.map(user => 
                  <AssociatesRowComponent key={user.userId} user={user}/>)
                : <></>
            }
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
)(AssociateTableComponent);