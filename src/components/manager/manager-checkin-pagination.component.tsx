import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {FAKE_CHECK_IN_DATA} from '../../include/fake';
import CheckInRowManagerComponent from './checkin/checkin-in-row-manager.component';

interface IState {
  currentPage: number
}
class CheckinPaginationManagerComponent extends React.Component<{},IState>{
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  public changePage = (pageNum:number) => {
    this.setState({
      ...this.state,
      currentPage: pageNum
    })
  }

  public previousPage = () => {
    this.state.currentPage > 1 ?
    this.setState({
      ...this.state,
      currentPage: this.state.currentPage - 1 ,
    }) :
    this.setState({
      ...this.state,
      currentPage: 1 ,
    })
  }

  public render() {
    // create the final page number based on 5 check-ins per page
    const TOTAL_PAGES = Math.ceil(FAKE_CHECK_IN_DATA.length/10);
    return (
      <>
      {/* Inject CheckInRowComponent and share page number with it as props */}
      <CheckInRowManagerComponent
      pageNumber={this.state.currentPage}/>
      {/* Display changes in page in real-time */}
      <div className="page-display">
      <span className="page-count">Page: {this.state.currentPage}/{TOTAL_PAGES} </span>
      <span>
      {/* Conditionally render pagination numbers by every five associates \
          the first item is an element that allows you to go to the previous page*/}
        <Pagination aria-label="check-in navigation">
           <PaginationItem onClick={()=>this.previousPage()}>
             <PaginationLink previous className="pagination-link"/>
           </PaginationItem>
        {/* Use the index from the array of check-ins to create page numbers */}
        {FAKE_CHECK_IN_DATA.map((data,index)=> 
        index % 10 === 0 && index > 0 &&
          <PaginationItem key={index} onClick={()=>this.changePage(index/10)} >
            <PaginationLink className="pagination-link">
              {index / 10}
            </PaginationLink>
          </PaginationItem>
        )}
        {/* Create the pagination item with the final page number */}
          <PaginationItem onClick={()=>this.changePage(TOTAL_PAGES)}>
            <PaginationLink
            className="pagination-link">
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

export default CheckinPaginationManagerComponent