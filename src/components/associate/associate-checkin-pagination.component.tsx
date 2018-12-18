import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import AssociateRow from './associate-row.component';
import { IState } from '../../reducers/index';
import { connect } from 'react-redux';
import * as associateActions from '../../actions/associate/associate.actions';
import { ICheckIn } from 'src/model/CheckIn.model';

interface IComponentState {
  currentPage: number
}

interface IComponentProps {
  checkIns: ICheckIn[]
}
class AssociateCheckInPagination extends React.Component<IComponentProps, IComponentState>{
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
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
    // create the final page number based on 5 check-ins per page
    const TOTAL_PAGES = Math.ceil(this.props.checkIns.length / 10);
    return (
      <>
        {/* Inject CheckInRowComponent and share page number with it as props */}
        <AssociateRow
          pageNumber={this.state.currentPage} />
        {/* Display changes in page in real-time */}
        <div>
          <span className="page-count">Page: {this.state.currentPage}/{TOTAL_PAGES} </span>
          <span>
            {/* Conditionally render pagination numbers by every five associates \
          the first item is an element that allows you to go to the previous page*/}
            <Pagination aria-label="check-in navigation">
              <PaginationItem onClick={() => this.previousPage()}>
                <PaginationLink previous />
              </PaginationItem>
              {/* Use the index from the array of check-ins to create page numbers */}
              {this.props.checkIns.map((data, index) =>
                index % 10 === 0 && index > 0 &&
                <PaginationItem key={index} onClick={() => this.changePage(index / 10)}>
                  <PaginationLink >
                    {index / 10}
                  </PaginationLink>
                </PaginationItem>
              )}
              {/* Create the pagination item with the final page number */}
              <PaginationItem onClick={() => this.changePage(TOTAL_PAGES)}>
                <PaginationLink>
                  {TOTAL_PAGES}
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: IState) => (state.associate)
const mapDispatchToProps = {
  ...associateActions
}
export default connect(mapStateToProps, mapDispatchToProps)(AssociateCheckInPagination) 