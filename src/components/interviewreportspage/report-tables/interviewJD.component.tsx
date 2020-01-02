import React from 'react';
import ReactPaginate from 'react-paginate';
import { IUser } from '../../../model/users/IUser';
import { interviewClient } from '../../../axios/sms-clients/interview-client';
//import { Link } from 'react-router-dom';
import './report-table.scss';

export interface interviewJDRequestProps {
    Users: IUser[]
}

export interface interviewJDState {
    Users
}

export interface interviewJDFAssoc {
    Users: IUser[]
}

export class InterviewJDRequest extends React.Component<any, any> {
    constructor(props: interviewJDRequestProps) {
        super(props);
        this.state = {
            Users: [
            ],

            totalPages: 0,
            currentPage: 0,
            pageSize: 4,
            redirect: false// creatting and setting the value of redirect
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
            const res = await interviewClient.interviewJD(pageNumber, this.state.pageSize);
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
        const assocInterviewRows = this.state.Users.map((User, index) => {
            return (
                <tr key={index}>
                    <td>{User.assocName}</td>
                    <td>{User.assocEmail}</td>
                    <td>{User.jd ? "Yes" : "No"}</td>
                </tr>
            );
        });
        return (
            <div className='img-fluid'>

                {/* responsive sass scrolling feature*/}
                <div className='tableholder3 scrollX scrollY'>
                    <h2> <b>Job Description</b> </h2>

                    <div className="scrollX scrollY">

                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope="col">Interviewee</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Job Description(Yes/No)</th>
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
                {/* <div className = {""}>
                    <Link to="/interview/report/jobDesc/charts">Visual Data</Link>
                </div> */}
            </div>
        );
    }
}