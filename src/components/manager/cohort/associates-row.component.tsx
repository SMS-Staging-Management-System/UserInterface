import * as React from "react";
import { IUser } from "src/model/User.model";

/**
 * The class row
 */

interface IProps {
  user: IUser
}

export class AssociatesRowComponent extends React.Component<IProps> {

  public handleClick = () => {
    // const cohort = document.getElementById("cohort-associates") as HTMLElement;

    // cohort.style.width = "400px";
  }

  public render() {
    return (
      <>
          <tr className="" id={`row-${this.props.user.userId}`} onClick={() => this.handleClick()}>
            <td>{this.props.user.userId}</td>
            <td>{this.props.user.firstName}</td>
            <td>{this.props.user.lastName}</td>
            <td>{this.props.user.email}</td>
          </tr>
        
      </>
    );
  }
}

export default AssociatesRowComponent;
