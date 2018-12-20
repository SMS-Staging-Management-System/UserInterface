import * as React from "react";
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from "react-redux";
import { IState } from "src/reducers";
import AssociatesTableHeaderComponent from "../manager/cohort/associates-table-header.component";
import { ICohort } from "src/model/Cohort.model";
import AssociatesRowComponent from "../manager/cohort/associates-row.component";
import * as managerActions from '../../actions/manager/manager.actions';
import { getTodayEnd } from "src/include/utcUtil";
import { IUser } from "src/model/User.model";
import { ICheckIn } from "src/model/CheckIn.model";
import CheckInRowManagerAssociateComponent from "../manager/checkin/checkin-row-manager-associate.component";
import CheckInHeaderManagerAssociateComponent from "../manager/checkin/check-in-header-manager-associate.component";

/**
 * The table to render a list of associate
 */

interface IProps {
  associateCheckIns: ICheckIn[]
  currentCohort: ICohort
  getCheckInByUserId: (userId: number, fromDate: number, toDate: number) => void
}

interface IComponentState {
  currentPage: number
  isModalOpen: boolean
  user: IUser
}

export class AssociateTableComponent extends React.Component<IProps, IComponentState> {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
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

  public changePage = (pageNum: number) => {
    this.setState({
      ...this.state,
      currentPage: pageNum
    })
  }

  public previousPage = () => {
    this.state.currentPage > 1 ?
      this.setState({
        ...this.state,
        currentPage: this.state.currentPage - 1,
      }) :
      this.setState({
        ...this.state,
        currentPage: 1,
      })
  }

  public render() {
    const TOTAL_PAGES = Math.ceil(this.props.associateCheckIns.length / 10);
    return (
      <>
        <Table className="table table-bordered">
          <AssociatesTableHeaderComponent />
          <tbody>
            {
              this.props.currentCohort ?
                this.props.currentCohort.userList.map(user =>
                  <AssociatesRowComponent key={"associates-row-" + user.userId} user={user} openAssociateCheckInModal={this.openAssociateCheckInModal} />)
                : <></>
            }
          </tbody>
        </Table>
        <Modal isOpen={this.state.isModalOpen} toggle={this.closeAssociateCheckInModal} className="manager-comments">
          {this.state.user !== null &&
            <>
              <ModalHeader>{this.state.user.firstName} {this.state.user.lastName} Check Ins</ModalHeader>
              <ModalBody className="">
                <Table className="table table-bordered">
                  <CheckInHeaderManagerAssociateComponent />
                  <CheckInRowManagerAssociateComponent
                    pageNumber={this.state.currentPage} />
                  {/* Display changes in page in real-time */}
                  <div className="page-display">
                    <span className="page-count">Page: {this.state.currentPage}/{TOTAL_PAGES} </span>
                    <span>
                      {/* Conditionally render pagination numbers by every five associates \
          the first item is an element that allows you to go to the previous page*/}
                      <Pagination aria-label="check-in navigation">
                        <PaginationItem onClick={() => this.previousPage()}>
                          <PaginationLink previous className="pagination-link" />
                        </PaginationItem>
                        {/* Use the index from the array of check-ins to create page numbers */}
                        {this.props.associateCheckIns.map((data, index) =>
                          index % 10 === 0 && index > 0 &&
                          <PaginationItem key={index} onClick={() => this.changePage(index / 10)} >
                            <PaginationLink className="pagination-link">
                              {index / 10}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                        {/* Create the pagination item with the final page number */}
                        <PaginationItem onClick={() => this.changePage(TOTAL_PAGES)}>
                          <PaginationLink
                            className="pagination-link">
                            {TOTAL_PAGES}
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </span>
                  </div>
                </Table>
              </ModalBody>
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