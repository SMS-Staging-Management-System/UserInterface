import React, { Component } from 'react'
import { FeedbackStat } from '../../../model/feedbackstats.model';
import './report-table.scss'
import ReactPaginate from 'react-paginate';
import { interviewClient } from '../../../axios/sms-clients/interview-client';

interface IFeedbackStatsTableState {
  feedback: FeedbackStat[]
  totalPages: number
  currentPage: number
  pageSize: number
}

export class FeedbackStatsTable extends Component<any, IFeedbackStatsTableState> {

  state = {
    feedback: [],
    totalPages: 0,
    currentPage: 0,
    pageSize: 4
  }

  componentDidMount() {
    this.fetchDbInfo(0)
  }

  handleChangePagination = event => {
    this.fetchDbInfo(event.selected)
  }

  fetchDbInfo = async (pageNumber: number) => {
    try {
      const response = await interviewClient.fetchFeedbackStats(pageNumber, this.state.pageSize)
      this.setState({
        ...this.state,
        feedback: response.data.content,
        totalPages: response.data.totalPages,
        currentPage: pageNumber
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="img-fluid">
        <div className="tableholder3 scrollX scrollY">
          <h2><b>Feedback Stats</b></h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Manager</th>
                <th>Manager Email</th>
                <th>Associate</th>
                <th>Associate Email</th>
                <th>Feedback Requested</th>
                <th>Feedback Recieved</th>
                <th>Feedback Delivered</th>
              </tr>
            </thead>
            <tbody>
              {this.state.feedback.map((report: FeedbackStat) => <tr key={report.id}>
                <td>{report.managerName || '/'}</td>
                <td>{report.managerEmail}</td>
                <td>{report.associateName || '/'}</td>
                <td>{report.associateEmail}</td>
                <td>{(new Date(report.feedbackRequested)).toLocaleDateString()}</td>
                <td>{report.feedbackRecieved ? (new Date(report.feedbackRecieved)).toLocaleDateString() : 'Not Recieved'}</td>
                <td>{report.feedbackDelivered ? (new Date(report.feedbackDelivered)).toLocaleDateString() : 'Not Delivered'}</td>
              </tr>)}
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
          onPageChange={this.handleChangePagination}
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
