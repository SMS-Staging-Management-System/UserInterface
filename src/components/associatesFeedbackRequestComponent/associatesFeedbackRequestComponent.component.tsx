import React from 'react';
import ReactPaginate from 'react-paginate';
import { IUser } from '../../model/user.model';
import { interviewClient } from '../../axios/sms-clients/interview-client';

export interface associatesFeedbackRequestProps {
    Users:IUser[]
}
 
export interface associatesFeedbackRequestState {
    Users
}

export interface AssociateFAssoc {
    Users:IUser[]
}
 
export class AssociatesFeedbackRequest extends React.Component<any, any> {
    constructor(props: associatesFeedbackRequestProps) {
        super(props);
        this.state = {
            Users: [
                { undefined },
              ],
            totalPages:0,
            currentPage:0,
            pageSize:4
        };
    }

    componentDidMount(){
        this.fetchDbInfo(0);
    }

    handlePageClick = (data) => {
        console.log(data);
        let selected = data.selected;
        this.fetchDbInfo(selected);
    }

    async fetchDbInfo(pageNumber:number){
        this.setState({
            ...this.state
          },
          async () => {
              try {
                  console.log(pageNumber+'x'+this.state.pageSize)
                  const res = await interviewClient.assocNeedFeedback(pageNumber, this.state.pageSize);
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

    render() { 
        const assocInterviewRows = this.state.Users.map((User) => {
            return (
                <tr>
                    <td>{User.firstName} {User.lastName}</td>
                    <td>{User.email}</td>
                </tr>
            );
        });

        return (
            <div>
                <div className='tableholder'>
                    <h1> Feedback Given Report</h1>     
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assocInterviewRows}
                        </tbody>
                    </table>
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
                <div className = {"paginateddata"}>
                    <Link to="/interview/report/feedback" >Paginated Data</Link>
                </div>
                <div className = {"visualdata"}>
                    <Link to="/interview/report/feedback/charts" >Visual Data</Link>
                </div>
            </div>
        );
    }
}