import React from 'react';
import ReactPaginate from 'react-paginate';
import { IUser } from '../../model/user.model';
import { interviewClient } from '../../axios/sms-clients/interview-client';
import './24Hreport.scss';
import { Redirect } from 'react-router';
export interface interview24RequestProps {
    Users: IUser[]
}

// export interface interview24State {
//     Users
//     //redirect: boolean
// }

// export interface interview24FAssoc {
//     Users:IUser[]
// }

export class interview24Request extends React.PureComponent<any, any> {
    constructor(props: interview24RequestProps) {
        super(props);
        this.state = {
            Users: [
                { undefined },
            ],
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
        console.log(data);
        let selected = data.selected;
        this.fetchDbInfo(selected);
    }

    async fetchDbInfo(pageNumber: number) {
        this.setState({
            ...this.state
        },
            async () => {
                try {
                    console.log(pageNumber + 'x' + this.state.pageSize)
                    const res = await interviewClient.fetch24(pageNumber, this.state.pageSize);
                    console.log(res.data);
                    this.setState({
                        Users: res.data.content,
                        totalPages: res.data.totalPages,
                        currentPage: pageNumber
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        );
    }

    updateRedirecrt = (redirecting: boolean) => {
        console.log('redirect');
        this.setState({ redirect: redirecting })
    }


    render() {
        const assocInterviewRows = this.state.Users.map((User) => {
            return (
                <tr>
                    <td>{User.assocName}</td>
                    <td>{User.assocEmail}</td>
                    <td>{User.twentyFourAssoc ? "Yes" : "No"}</td>
                    <td>{User.twentyFourManager ? "Yes" : "No"}</td>
                </tr>
            );
        });
        console.log(assocInterviewRows);

        if (this.state.redirect) {
            this.updateRedirecrt(false)
            return <Redirect push to="/interview/report/24hour/charts" />;
        }
        return (
            <div className='img-fluid'>


                <div className='tableholder3 scrollX scrollY'>

                    <h1><b>  Interviews  </b> </h1>
                    <h1><b> 24 Hour Notice </b> </h1>
                    {/* <table> */}

                    <div className="scrollX scrollY">
                        <table className='table table-striped'>

                            <thead>

                                <tr>
                                    <th scope="col">  Name  </th>
                                    <th scope="col">  Email  </th>
                                    <th scope="col">  Associate's Claim  </th>
                                    <th scope="col">  Manager's Claim  </th>

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


                <div>
                    <button className="btn btn-lg btn-primary btn-block" onClick={() => this.updateRedirecrt(true)}>Visual Data</button>
                </div>

                {/* <div className = {""}>
                    <Link to="/interview/report/24hour" >Form Data</Link>
                </div> */}
        
            </div>
        );
    }
}