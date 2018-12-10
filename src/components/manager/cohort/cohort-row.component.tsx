import * as React from "react";
import { ICohort } from "src/model/Cohort.model";

/**
 * The class row
 */

interface IProps {
  cohort: ICohort
}

export class CohortRowComponent extends React.Component<IProps> {

  public handleClick = () => {
    // const cohort = document.getElementById("cohort-associates") as HTMLElement;

    // cohort.style.width = "400px";
  }

  public render() {
    return (
      <>
          <tr id={`row-${this.props.cohort.cohortId}`} onClick={() => this.handleClick()}>
            <td>{this.props.cohort.name}</td>
            <td>{this.props.cohort.userList.length}</td>
          </tr>
        
      </>
    );
  }
}

export default CohortRowComponent;
