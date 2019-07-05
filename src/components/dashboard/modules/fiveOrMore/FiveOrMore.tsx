import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import { InterviewPerAssociate } from '../../../../model/dashboard/interviewPerAssociate';
import { interviewClient } from '../../../../axios/sms-clients/interview-client';
import ReactPaginate from 'react-paginate';
import { ClipLoader } from 'react-spinners';
import './FiveOrMore.scss'

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
interface myState {
    listAssocFiveOrMore:InterviewPerAssociate[] ,
    totalPages:number,
    currentPage:number,
    pageSize: number
}

class FiveOrMore extends Component<myProps,myState> {
    constructor(myProps) {
        super(myProps);
        this.state = {
            listAssocFiveOrMore: [],
            totalPages: 0,
            currentPage: 0,
            pageSize: 5
        };
    }
    componentDidMount() {
        this.getFiveOrMore(0);
    }
    handlePageClick = (data) => {
        let selected = data.selected;
        this.getFiveOrMore(selected);
    }
    async getFiveOrMore(pageNumber: number) {
        try {
            const res = await interviewClient.getAssocMoreThanFiveInterviews(pageNumber, this.state.pageSize);
            this.setState({
                listAssocFiveOrMore: res.data.content,
                totalPages: res.data.totalPages,
                currentPage: pageNumber
            });
        } catch (err) {
            console.log(err);
        }
    }


    render() {
        const assocInterviewRows = this.state.listAssocFiveOrMore.map((Assoc) => {
            return (
                <tr key={String(Assoc.associateEmail)}>
                    <td>{Assoc.associateName}</td>
                    <td>{Assoc.associateEmail}</td>
                    <td>{Assoc.interviewCount}</td>
                </tr>
            );
        });
        
        return (
            
            <div className="fiveOrMoreContainer text-center  pt-4">
                <h1 className=' lead'><b>Associates with five or more interviews</b></h1>
                <div className='container my-3'>
                            <div className='table-responsive border border-gray'>
                                <table className='table table-striped m-auto '>
                                    <thead className='rev-background-color'>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Interviews</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assocInterviewRows[0]==null? 
                                            <ClipLoader 
                                            sizeUnit={"px"}
                                            size={50}
                                            color={'#dee2e6'}
                                            />:  assocInterviewRows }
                                        
                                    </tbody>
                                </table>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'page-item no-select justify-content-center'}
                    breakLinkClassName={'break-me-link page-link'}
                    pageCount={this.state.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination page-navigator justify-content-center'}
                    activeClassName={'active justify-content-center'}
                    pageClassName={'page-item cursor-hover justify-content-center'}
                    pageLinkClassName={'paginate-link page-link no-select'}
                    nextClassName={'page-item cursor-hover justify-content-center'}
                    nextLinkClassName={'paginate-next page-link no-select'}
                    previousClassName={'page-item cursor-hover justify-content-center'}
                    previousLinkClassName={'paginate-previous page-link no-select'}
                />
            </div>
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(FiveOrMore);