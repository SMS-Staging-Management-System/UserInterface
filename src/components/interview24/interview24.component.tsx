import React from 'react';
import ReactPaginate from 'react-paginate';
import { IUser } from '../../model/user.model';
import { Link } from 'react-router-dom';
import { interviewClient } from '../../axios/sms-clients/interview-client';
export interface interview24RequestProps {
    Users:IUser[]
}
 
export interface interview24State {
    Users
}

export interface interview24FAssoc {
    Users:IUser[]
}
 
export class interview24Request extends React.Component<any, any> {
    constructor(props: interview24RequestProps) {
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

        return (
            <div>
			<h1> Interviews receiving 24 Hour Notice Report</h1>
            <hr/><h2><div className = {"paginateddata"}><Link to="/interview/report/24hour" >Paginated Data</Link></div><div className = {"visualdata"}><Link to="/interview/report/24hour/charts" >Visual Data</Link></div></h2><hr/>
                 <table>
                    <thead>
                        <tr>
                            <th>  Name  </th>
                            <th>  Email  </th>
							<th>  Associate's Claim  </th>
							<th>  Manager's Claim  </th>
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