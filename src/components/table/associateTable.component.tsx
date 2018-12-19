import * as React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { connect } from "react-redux";
import { IState } from "src/reducers";
import AssociatesTableHeaderComponent from "../manager/cohort/associates-table-header.component";
import { ICohort } from "src/model/Cohort.model";
import AssociatesRowComponent from "../manager/cohort/associates-row.component";
import * as managerActions from '../../actions/manager/manager.actions';
import { getTodayEnd } from "src/include/utcUtil";
import { IUser } from "src/model/User.model";
import { ICheckIn } from "src/model/CheckIn.model";

/**
 * The table to render a list of associate
 */

interface IProps {
  associateCheckIns: ICheckIn[]
  currentCohort: ICohort
  getCheckInByUserId: (userId: number, fromDate: number, toDate: number) => void
}

interface IComponentState {
  isModalOpen: boolean
  user: IUser
}

export class AssociateTableComponent extends React.Component<IProps, IComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      user: null
    }
  }

  public openAssociateCheckInModal = (user: IUser) => {
    this.props.getCheckInByUserId(user.userId, 0, getTodayEnd());
    this.setState({
      isModalOpen: true,
      user
    })
  }

  public closeAssociateCheckInModal = () => {
    this.setState({
      isModalOpen: false
    })
  }

  public render() {
    return (
      <>
        <Table className="table table-bordered">
        <AssociatesTableHeaderComponent />
          <tbody>
            {
              this.props.currentCohort ?
                this.props.currentCohort.userList.map(user => 
                  <AssociatesRowComponent key={"associates-row-" + user.userId} user={user}/>)
                : <></>
            }
          </tbody>
        </Table>
        <Modal isOpen={this.state.isModalOpen} className="manager-comments">
          { this.state.user !== null &&
            <>
              <ModalHeader>{this.state.user.firstName} {this.state.user.lastName} Check Ins</ModalHeader>
              <ModalBody className="">
              {/* Render a table of checkins here with this.props.associateCheckIns
                
              */}
              </ModalBody>
              <ModalFooter className="flex-btw">
                <Button className="" color="secondary" onClick={this.closeAssociateCheckInModal}>Exit</Button>
              </ModalFooter>
            </>
          }
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => state.manager;
const mapDispatchToProps = {
  ...managerActions
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociateTableComponent);