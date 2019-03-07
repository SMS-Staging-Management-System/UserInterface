import React from 'react';
import Jumbotron from 'reactstrap/lib/Jumbotron';
import Table from 'reactstrap/lib/Table';
import { connect } from 'react-redux';
import { getInterviewPages, getNumberOfPages } from '../../actions/interviewList/interviewList.actions';
import { IState } from '../../../reducers';
import ReactPaginate from 'react-paginate'

export interface InterviewListProps {
    listOfInterviews : any[],
    numberOfPages : number,
    getInterviewPages : (ordeyBy?: string, 
        direction? : string, 
        pageNumber? : number, 
        pageSize? : number) => void,
    getNumberOfPages : (pageSize : number) => void
}
 
export interface InterviewListState {
    
}
 
class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
    }

    renderListOfInterviews = () => {
        if(this.props.listOfInterviews[0]){
            const result = this.props.listOfInterviews.map(() => {
                <tr>
                    <td></td>
                </tr>
            })

            return result;
        } else {
            return <p></p>
        }
    }

    handlePageClick = () => {

    }

    render() { 
        return ( 
            <Jumbotron>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListOfInterviews()}
                    </tbody>
                </Table>
                <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'page-item no-select'}
                breakLinkClassName={'break-me-link page-link'}
                pageCount={100}
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