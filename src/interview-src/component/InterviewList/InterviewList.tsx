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
                breakClassName={'break-me'}
                breakLinkClassName={'break-me-link btn'}
                pageCount={10}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination '}
                activeClassName={'active paginate-active'}
                pageLinkClassName={'paginate-link btn'}
                nextLinkClassName={'paginate-next btn'}
                previousLinkClassName={'paginate-previous btn'}/>
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