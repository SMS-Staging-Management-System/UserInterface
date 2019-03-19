import React from 'react';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import Table from 'reactstrap/lib/Table';
import { connect } from 'react-redux';
import { getInterviewPages, getNumberOfPages, setDirection, setOrderBy, setCurrentPage, setPageSize } from '../../actions/interviewList/interviewList.actions';
import ReactPaginate from 'react-paginate'
import { IState } from '../../reducers';
import { Link } from 'react-router-dom';
import Button from 'reactstrap/lib/Button';
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { Label } from 'reactstrap';

export interface InterviewListProps {
    listOfInterviews : any[],
    numberOfPages : number,
    currentPage : number,
    pageSize : number,
    orderBy : string,
    direction : string,
    getInterviewPages : (
        pageNumber? : number, 
        pageSize? : number,
        ordeyBy?: string, 
        direction? : string) => void,
    getNumberOfPages : (pageSize? : number) => void,
    setDirection : (direction : string) => void,
    setOrderBy : (criteria : string) => void,
    setPageSize : (pageSize : number) => void,
    setCurrentPage : (currentPage : number) => void
}
 
export interface InterviewListState {
}
 
class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
    }

    async componentDidMount() {
        this.props.getInterviewPages(
            this.props.currentPage, 
            this.props.pageSize, 
            this.props.orderBy, 
            this.props.direction);
        this.props.getNumberOfPages(this.props.pageSize);
    }

    handlePageClick = (data) => {
        this.props.setCurrentPage(data.selected);
    }

    changeOrderAsc = () => {
        this.props.setDirection('ASC');
    }

    changeOrderDesc = () => {
        this.props.setDirection('DESC');
    }

    changeOrderCriteria = (event : any) => {
        this.props.setOrderBy(event.currentTarget.id);
        this.props.getInterviewPages(
            this.props.currentPage, 
            this.props.pageSize, 
            this.props.orderBy, 
            this.props.direction);
        this.props.getNumberOfPages(this.props.pageSize);
    }

    changePageSize = (event : any) => {
        this.props.setPageSize(event.target.value);
    }

    getNewPages = (event : any) => {
        event.preventDefault();
        this.props.getInterviewPages(
            this.props.currentPage, 
            this.props.pageSize, 
            this.props.orderBy, 
            this.props.direction);
        this.props.getNumberOfPages(this.props.pageSize);
    }

    render() { 
        return ( 
            <Jumbotron>
                <Table>
                    <thead>
                        <tr>
                            <th id='associateEmail' onClick={this.changeOrderCriteria}>Associate Email 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th id='managerEmail' onClick={this.changeOrderCriteria}>Manager Email 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th id='place' onClick={this.changeOrderCriteria}>Location 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th id='client' onClick={this.changeOrderCriteria}>Client 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th id='notified' onClick={this.changeOrderCriteria}>Date Notified 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th id='scheduled' onClick={this.changeOrderCriteria}>Date Scheduled 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th id='reviewed' onClick={this.changeOrderCriteria}>Date Reviewed 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th id='feedback' onClick={this.changeOrderCriteria}>Associate Feedback 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.listOfInterviews.map((entry) => {
                            return (<tr>
                                <td>{entry.associateEmail}</td>
                                <td>{entry.managerEmail}</td>
                                <td>{entry.place}</td>
                                <td>{entry.client.clientName}</td>
                                <td>{new Date(entry.notified).toDateString()}</td>
                                <td>{new Date(entry.scheduled).toDateString()}</td>
                                <td>{new Date(entry.reviewed).toDateString()}</td>
                                <td>{entry.associateInput ? "Associate Input filled!" : <Button>
                                    <Link to={{ pathname: '/interview/associateInput', state: { interviewId: entry.id } }} >Add Associate Input</Link></Button>}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'page-item no-select'}
                breakLinkClassName={'break-me-link page-link'}
                pageCount={this.props.numberOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination page-navigator'}
                activeClassName={'active'}
                pageClassName={'page-item cursor-hover'}
                pageLinkClassName={'paginate-link page-link no-select'}
                nextClassName={'page-item cursor-hover'}
                nextLinkClassName={'paginate-next page-link no-select'}
                previousClassName={'page-item cursor-hover'}
                previousLinkClassName={'paginate-previous page-link no-select'}/>

                <form onSubmit={this.getNewPages}>
                    <Label>Page Size</Label>
                    <input value={this.props.pageSize} onChange={this.changePageSize} />
                </form>
            </Jumbotron>
         );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        listOfInterviews : state.interviewState.interviewList.listOfInterviews,
        numberOfPages : state.interviewState.interviewList.numberOfPages,
        currentPage : state.interviewState.interviewList.currentPage,
        pageSize : state.interviewState.interviewList.pageSize,
        orderBy : state.interviewState.interviewList.orderBy,
        direction : state.interviewState.interviewList.direction
    }
}
 
const mapDispatchToProps = {
    getInterviewPages,
    getNumberOfPages,
    setDirection,
    setOrderBy,
    setCurrentPage,
    setPageSize,

}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);