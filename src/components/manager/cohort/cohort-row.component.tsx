import * as React from "react";
import { ICohort } from "src/model/Cohort.model";

/**
 * The class row
 */

interface IPropsComponent {
  cohort: ICohort,
  selectCohort: (sCohort: ICohort) => (dispatch: any) => void,
  changeSelected: (selected: number) => void,
  selected: boolean
}

export class CohortRowComponent extends React.Component<IPropsComponent> {
  constructor(props) {
    super(props);

  }

  public handleClick = () => {
    this.props.changeSelected(this.props.cohort.cohortId);

    this.props.selectCohort(this.props.cohort);
  }

  public render() {
    return (
      <>
          <tr className={this.props.selected ? "orange" : ""} id={`cohort-row-${this.props.cohort.cohortId}`} onClick={() => this.handleClick()}>
            <td>{this.props.cohort.name}</td>
            <td>{this.props.cohort.userList.length}</td>
          </tr>
      </>
    );
  }
}

export default CohortRowComponent;
