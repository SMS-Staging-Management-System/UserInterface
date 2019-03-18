import React from 'react';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import Table from 'reactstrap/lib/Table';
import { connect } from 'react-redux';
import { getInterviewPages, getNumberOfPages } from '../../actions/interviewList/interviewList.actions';
import ReactPaginate from 'react-paginate'
import { IState } from '../../reducers';
import { Link } from 'react-router-dom';
import Button from 'reactstrap/lib/Button';

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
}
 
class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
    }

    async componentDidMount() {
        this.props.getInterviewPages();
        this.props.getNumberOfPages();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.props.getInterviewPages(selected);
    }

    // redirectToAssocInput() {
    //     return ();
    // }

    render() { 
        return ( 
            <Jumbotron>
                <Table>
                    <thead>
                        <tr>
                            <th>Associate Email</th>
                            <th>Manager Email</th>
                            <th>Location</th>
                            <th>Date Notified</th>
                            <th>Date Scheduled</th>
                            <th>Date Reviewed</th>
                            <th>Associate Input</th>
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