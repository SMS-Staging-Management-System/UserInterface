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
    associateId:number,
    interviewCount:number,
    AssociateName:String
}
 
export class InterviewPerAssoc extends React.Component<any, any> {
    constructor(props: InterviewPerAssocProps) {
        super(props);
        this.state = {
            assocInterviewArr: [
                { associateId: 2001, interviewCount: -1, AssociateName: 'Aaron Anderson' },
                { associateId: 2002, interviewCount: -1, AssociateName: 'Betty Bronte' },
                { associateId: 2003, interviewCount: -1, AssociateName: 'Charles Cromwell' },
                { associateId: 2004, interviewCount: -1, AssociateName: 'Delta Dawn' },
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
                  const res = await interviewClient.interviewPerAssoc(pageNumber, this.state.pageSize);
                  console.log(res.data);
                  this.setState({
                    assocInterviewArr: res.data.content,
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
        const assocInterviewRows = this.state.assocInterviewArr.map((Assoc) => {
            return (
                <tr>
                    <td>{Assoc.AssociateName}</td>
                    <td>{Assoc.interviewCount}</td>
                </tr>
            );
        });

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Associate</th>
                            <th>Interviews</th>
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