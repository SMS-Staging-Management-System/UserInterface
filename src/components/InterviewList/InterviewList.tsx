import React from 'react';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import Table from 'reactstrap/lib/Table';
import { connect } from 'react-redux';
import { getInterviewPages, markAsReviewed } from '../../actions/interviewList/interviewList.actions';
import ReactPaginate from 'react-paginate'
import { IState } from '../../reducers';
import { Link } from 'react-router-dom';
import Button from 'reactstrap/lib/Button';
import { IoIosArrowDown } from 'react-icons/io'
import { IoIosArrowUp } from 'react-icons/io'
import { Label } from 'reactstrap';

export interface InterviewListProps {
    email : string,
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
    markAsReviewed : (interviewId : number) => void
}
 
export interface InterviewListState {
    direction : string
}
 
class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
        this.state = {
            direction : this.props.direction
        }
    }

    async componentDidMount() {
        this.props.getInterviewPages(
            this.props.currentPage, 
            this.props.pageSize, 
            this.props.orderBy, 
            this.props.direction);
    }
    
    handlePageClick = (data) => {
        this.props.getInterviewPages(data.selected, 
            this.props.pageSize, 
            this.props.orderBy, 
            this.props.direction);
    }

    changeOrderAsc = () => {
        this.setState({
            direction : 'ASC'
        })
    }

    changeOrderDesc = () => {
        this.setState({
            direction : 'DESC'
        })
    }

    changeOrderCriteria = (event : any) => {
        this.props.getInterviewPages(
            0, 
            this.props.pageSize, 
            event.currentTarget.id, 
            this.state.direction);
    }

    changePageSize = (event : any) => {
        this.props.getInterviewPages(
            this.props.currentPage, 
            event.currentTarget.value, 
            this.props.orderBy, 
            this.props.direction);
    }

    renderDate = (date : number) => {
        if (date > 0){
            return new Date(date).toDateString()
        } else {
            return '-';
        }
    }

    markAsReviewed = (event : any) => {
        this.props.markAsReviewed(event.currentTarget.id);
    }

    render() { 
        return ( 
            <Jumbotron>
                <Table>
                    <thead>
                        <tr>
                            <th>Reviewed</th> 
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
                            <th id='associateInput' onClick={this.changeOrderCriteria}>Associate Feedback 
                                <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                            </th>
                            <th>
                                Interview Feedback
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.listOfInterviews.map((entry) => {
                            return (<tr key={entry.id}>
                                <td><input id={entry.id} type="checkbox" checked={entry.reviewed} onChange={this.markAsReviewed} /></td>
                                <td>{entry.associateEmail}</td>
                                <td>{entry.managerEmail}</td>
                                <td>{entry.place}</td>
                                <td>{entry.client.clientName}</td>
                                <td>{this.renderDate(entry.notified)}</td>
                                <td>{this.renderDate(entry.scheduled)}</td>
                                <td>{this.renderDate(entry.reviewed)}</td>
                                <td>{entry.associateInput ? "Associate Input filled!" : <Button>
                                    <Link to={{ pathname: '/interview/associateInput', state: { interviewId: entry.id } }} >Add Associate Input</Link></Button>}</td>
                                <td>{entry.feedback ? <Link to={{pathname: "/interview/viewFeedback", state: { interviewId: entry.id}}}>View Interview Feedback</Link> : <Button>
                                    <Link to={{pathname: `/interview/${entry.id}/feedback`}}>Complete Interview Feedback</Link>
                                </Button>}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'page-item no-select justify-content-center'}
                breakLinkClassName={'break-me-link page-link'}
                pageCount={this.props.numberOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination page-navigator justify-content-center'}
                activeClassName={'active'}
                pageClassName={'page-item cursor-hover'}
                pageLinkClassName={'paginate-link page-link no-select justify-content-center'}
                nextClassName={'page-item cursor-hover'}
                nextLinkClassName={'paginate-next page-link no-select justify-content-center'}
                previousClassName={'page-item cursor-hover'}
                previousLinkClassName={'paginate-previous page-link no-select justify-content-center'}/>

                <form>
                    <Label className={'justify-content-center'}>Page Size: </Label>
                    <select value={this.props.pageSize} onChange={this.changePageSize} className={'justify-content-center'}>
                        <option value={5} className={'justify-content-center'}>5</option>
                        <option value={10} className={'justify-content-center'}>10</option>
                        <option value={25} className={'justify-content-center'}>25</option>
                        <option value={50} className={'justify-content-center'}>50</option>
                    </select>
                </form>
            </Jumbotron>
         );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        email : state.managementState.auth.currentUser.email,
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
    markAsReviewed
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);