import React from 'react';
import ReactPaginate from 'react-paginate';
import { IUser } from '../../model/user.model';
import { interviewClient } from '../../axios/sms-clients/interview-client';
import { Link } from 'react-router-dom';

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
                { email: 'test@test.com', userId: -1, firstName: 'Aaron', lastName:'Anderson', mobile: '(000)000-0000', address:{addressId:-1, alias:'test', city:'test', country:'test', state:'test', zip:'test'} },
                { email: 'test@test.com', userId: -1, firstName: 'Betty', lastName:'Bronte', mobile: '(000)000-0000', address:{addressId:-1, alias:'test', city:'test', country:'test', state:'test', zip:'test'} },
                { email: 'test@test.com', userId: -1, firstName: 'Charles', lastName:'Cromwell', mobile: '(000)000-0000', address:{addressId:-1, alias:'test', city:'test', country:'test', state:'test', zip:'test'} },
                { email: 'test@test.com', userId: -1, firstName: 'Delta', lastName:'Dawn', mobile: '(000)000-0000', address:{addressId:-1, alias:'test', city:'test', country:'test', state:'test', zip:'test'} },
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
			<h1> Feedback Given Report</h1>
            <hr/><h2><div className = {"paginateddata"}><Link to="/interview/report/feedback" >Paginated Data</Link></div><div className = {"visualdata"}><Link to="/interview/report/feedback/charts" >Visual Data</Link></div></h2><hr/>
                     
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
                    breakClassName={'page-item no-select'}
                    breakLinkClassName={'break-me-link page-link'}
                    pageCount={this.state.totalPages}
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
                    previousLinkClassName={'paginate-previous page-link no-select'}
                />
            </div>
        );
    }
}