import React from 'react';
import ReactPaginate from 'react-paginate';
import { interviewClient } from '../../axios/sms-clients/interview-client';


export interface InterviewPerAssocProps {
    assocInterviewArr: InterviewPAssoc[],
    totalPages: number,
    currentPage: number,
    pageSize: number
}

export interface InterviewPerAssocState {
    assocInterviewArr,
    totalpages,
    currentPage,
    pageSize
}

export interface InterviewPAssoc {
    associateEmail: String,
    interviewCount: number,
    associateName: String
}

export class InterviewPerAssoc extends React.Component<any, any> {
    constructor(props: InterviewPerAssocProps) {
        super(props);
        this.state = {
            assocInterviewArr: [],
            totalPages: 0,
            currentPage: 0,
            pageSize: 5
        };
    }

    componentDidMount() {
        this.fetchDbInfo(0);
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.fetchDbInfo(selected);
    }

    fetchDbInfo = async (pageNumber: number) => {
        try {
            const res = await interviewClient.interviewPerAssoc(pageNumber, this.state.pageSize);
            this.setState({
                assocInterviewArr: res.data.content,
                totalPages: res.data.totalPages,
                currentPage: pageNumber
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const assocInterviewRows = this.state.assocInterviewArr.map((Assoc, index) => {
            return (
                <tr key={index}>
                    <td>{Assoc.associateName}</td>
                    <td>{Assoc.associateEmail}</td>
                    <td>{Assoc.interviewCount}</td>
                </tr>
            );
        });

        return (
            <div>
                <h1 className='text-center'><b>Interviews per Associate</b></h1>
                <div className='container'>
                    <div className='row'>
                        <div>
                            <div className='table-responsive-xl'>
                                <table className='table table-striped mx-auto w-auto'>
                                    <thead className='rev-background-color'>
                                        <tr>
                                            <th>Associate Name</th>
                                            <th>Associate Email</th>
                                            <th>Interviews</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assocInterviewRows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
        );
    }
}