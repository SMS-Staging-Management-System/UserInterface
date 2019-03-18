import React from 'react';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import Table from 'reactstrap/lib/Table';
import { connect } from 'react-redux';
import { getInterviewPages, getNumberOfPages } from '../../actions/interviewList/interviewList.actions';
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
    getInterviewPages : (
        pageNumber? : number, 
        pageSize? : number,
        ordeyBy?: string, 
        direction? : string) => void,
    getNumberOfPages : (pageSize? : number) => void
}
 
export interface InterviewListState {
    orderBy : string,
    direction : string,
    pageSize : number,
    currentPage : number
}
 
class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);

        this.state = {
            orderBy : 'id',
            direction : 'ASC',
            pageSize : 5,
            currentPage : 0
        }
    }

    async componentDidMount() {
        this.props.getInterviewPages(
            this.state.currentPage, 
            this.state.pageSize, 
            this.state.orderBy, 
            this.state.direction);
        this.props.getNumberOfPages(this.state.pageSize);
    }

    handlePageClick = (data) => {
        this.setState({
            currentPage : data.slected
        })
        this.props.getInterviewPages(this.state.currentPage);
    }

    changeOrderAsc = () => {
        this.setState({
            direction : 'ASC'
        });
    }

    changeOrderDesc = () => {
        this.setState({
            direction : 'DESC'
        });
    }

    changeOrderCriteria = (event : any) => {
        this.setState({
            orderBy : event.currentTarget.id
        });
        this.props.getInterviewPages(
            this.state.currentPage, 
            this.state.pageSize, 
            this.state.orderBy, 
            this.state.direction);
        this.props.getNumberOfPages(this.state.pageSize);
    }

    changePageSize = (event : any) => {
        console.log(event.target.value);
        this.setState({
            pageSize : event.currentTarget.value
        });
    }

    getNewPages = (event : any) => {
        event.preventDefault();
        this.props.getInterviewPages(
            this.state.currentPage, 
            this.state.pageSize, 
            this.state.orderBy, 
            this.state.direction);
        this.props.getNumberOfPages(this.state.pageSize);
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
                    <input value={this.state.pageSize} onChange={this.changePageSize} />
                </form>
            </Jumbotron>
         );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        listOfInterviews : state.interviewState.interviewList.listOfInterviews,
        numberOfPages : state.interviewState.interviewList.numberOfPages
    }
}
 
const mapDispatchToProps = {
    getInterviewPages,
    getNumberOfPages
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);