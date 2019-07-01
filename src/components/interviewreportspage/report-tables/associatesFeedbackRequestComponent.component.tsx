import React from 'react';
import ReactPaginate from 'react-paginate';
import { IUser } from '../../../model/user.model';
import { interviewClient } from '../../../axios/sms-clients/interview-client';

export interface associatesFeedbackRequestProps {
    Users: IUser[]
}

export interface associatesFeedbackRequestState {
    Users
}

export interface AssociateFAssoc {
    Users: IUser[]
}

export class AssociatesFeedbackRequest extends React.Component<any, any> {
    constructor(props: associatesFeedbackRequestProps) {
        super(props);
        this.state = {
            Users: [],
            totalPages: 0,
            currentPage: 0,
            pageSize: 4,
            redirect: false
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
            const res = await interviewClient.assocNeedFeedback(pageNumber, this.state.pageSize);
            this.setState({
                Users: res.data.content,
                totalPages: res.data.totalPages,
                currentPage: pageNumber
            });
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        const assocInterviewRows = this.state.Users.map((User: IUser) => {
            return (
                <tr key={User.userId}>
                    <td>{User.firstName} {User.lastName}</td>
                    <td>{User.email}</td>
                </tr>
            );
        });
        return (
            <div className='img-fluid'>
                <div className='tableholder3 scrollX scrollY'>
                    <h1><b> Feedback Given </b></h1>
                    <div className="scrollX scrollY">
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assocInterviewRows}
                            </tbody>
                        </table>

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
            </div>
        );
    }
}