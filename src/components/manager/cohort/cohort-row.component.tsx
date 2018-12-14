import * as React from "react";
import { ICohort } from "src/model/Cohort.model";

/**
 * The cohort row
 */

interface IStateComponent {
  isChanging: boolean;
}

interface IPropsComponent {
  cohort: ICohort;
  selectCohort: (sCohort: ICohort) => (dispatch: any) => void;
  changeSelected: (selected: number) => void;
  selected: boolean;
  toggle: () => void;
}

export class CohortRowComponent extends React.Component<
  IPropsComponent,
  IStateComponent
> {
  constructor(props) {
    super(props);
    this.state = {
      isChanging: false
    };
  }

  public handleClick = () => {
    if (this.state.isChanging === false) {
      this.setState({
        ...this.state,
        isChanging: true
      })
      this.props.changeSelected(this.props.cohort.cohortId);

      this.props.selectCohort(this.props.cohort);

      this.props.toggle();

      setTimeout(() => {
        this.props.toggle();
        this.setState({
          ...this.state,
          isChanging: false
        })
      }, 500);
    }
  };

  public render() {
    return (
      <>
        <tr
          className={"cursor-hover " + (this.props.selected ? "orange" : "")}
          id={`cohort-row-${this.props.cohort.cohortId}`}
          onClick={() => this.handleClick()}
        >
          <td>{this.props.cohort.name}</td>
          <td>{this.props.cohort.userList.length}</td>
        </tr>
      </>
    );
  }
}

export default CohortRowComponent;
