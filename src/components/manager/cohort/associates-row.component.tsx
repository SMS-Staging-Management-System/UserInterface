import * as React from "react";
import { IUser } from "src/model/User.model";
import { AssociateRowCheckinComponent } from "./associate-row-checkins.component";
/**
 * The class row
 */

interface IProps {
  user: IUser,
}

interface IComponentState {
  modal: boolean
}
export class AssociatesRowComponent extends React.Component<IProps,IComponentState> {
  constructor(props){
    super(props);
    this.state = {
      modal: false
    }
  }
  public handleClick = () => {
    this.setState({
      ...this.state,
      modal: true
    })
  }

  public modalOff = () => {
    this.setState({
      ...this.state,
      modal: false
    })
  }

  public render() {
    return (
      <>
          <tr className="" id={`row-${this.props.user.userId}`} 
            onClick={() => this.handleClick()}>
            <td>{this.props.user.userId}</td>
            <td>{this.props.user.firstName}</td>
            <td>{this.props.user.lastName}</td>
            <td>{this.props.user.email}</td>
          </tr>
         {/* Modal for manager comments */}
         <AssociateRowCheckinComponent
           modal={this.state.modal}
           modalOff={this.modalOff}
           userId={this.props.user.userId}/>
      </>
    );
  }
}

export default AssociatesRowComponent;