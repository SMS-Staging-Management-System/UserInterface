import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { interviewClient } from '../../../axios/sms-clients/interview-client';
import { markAsReviewed, getInterviewPages } from '../../../actions/interviewList/interviewList.actions';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import { IState } from '../../../reducers';


interface IReviewButtonProps {
  interview: any,
  markAsReviewed: (interviewId: number) => void,
  assocInput: any,
  disabled: any,
  currentPage: any,
  pageSize: any,
  orderBy: any,
  direction: any,
  getInterviewPages: (
    pageNumber?: number,
    pageSize?: number,
    ordeyBy?: string,
    direction?: string) => void;

}

// interface myState{
//   feedbackRequestedDate
// }

class ReviewButton extends Component<IReviewButtonProps, any> {
  state = {
    modal: false
  }
  feedbackRequestedDate: any;
  feedbackText: any;
  feedbackReceivedDate: any;
  feedbackDeliveredDate: any;
  interviewId: any;
  feedbackStatus: any;
  format: any;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getInterviewFeedback();
  }

  getInterviewFeedback = async () => {
    let interviewId = this.props.interview.id;
    // console.log('interviewid::::::::',interviewId);
    let interviewFeedback = await interviewClient.fetchInterviewFeedback(interviewId);
    // console.log('STATUS BABEY::::::',interviewFeedback.data.status);
    this.interviewId = interviewId,
      this.feedbackRequestedDate = new Date(interviewFeedback.data.feedbackRequested),
      this.feedbackText = interviewFeedback.data.feedback,
      this.feedbackReceivedDate = new Date(interviewFeedback.data.feedbackReceived),
      this.feedbackDeliveredDate = new Date(interviewFeedback.data.feedbackDelivered),
      this.feedbackStatus = interviewFeedback.data.status ? interviewFeedback.data.status.feedback_status_desc : undefined
    this.format = interviewFeedback.data.format ? interviewFeedback.data.format.formatDesc : undefined

  }


  markAsReviewed = (event: any) => {
    event.preventDefault()
    this.props.markAsReviewed(this.interviewId);
    this.props.getInterviewPages(
      this.props.currentPage,
      this.props.pageSize,
      this.props.orderBy,
      this.props.direction);
    this.toggle()
  }

  renderDate = (date: number) => {
    if (date > 0) {
      return new Date(date).toString()
    } else {
      return '-';
    }
  }

  toggle = () => {
    console.log(this.interviewId)
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    const isReviewed = (this.props.interview.reviewed)
    return (
      <div >
        {isReviewed ? <i onClick={this.props.disabled ? this.toggle : undefined}><FaRegCheckSquare className='btn-success' /></i> : <i onClick={this.props.disabled ? this.toggle : undefined}><FaRegSquare className='btn-light' /></i>}
        <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} >
          <ModalHeader className='rev-background-color' toggle={this.toggle}>Review Interview</ModalHeader>
          <ModalBody>
            <form onSubmit={this.markAsReviewed} className=''>
              <div>
                <h3 className='text-center col-12'>Associate Input</h3>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>When did you recieve a notification?</label></div>
                  <span className='col-9'><input value={this.renderDate(this.props.assocInput.receivedNotifications)} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>Were you provided a job description?</label></div>
                  <span className='col-9'><input value={this.props.assocInput.descriptionProvided ? 'Yes' : 'No'} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>What was the proposed interview format?</label></div>
                  <span className='col-9'><input value={this.props.assocInput.proposedFormat ? this.props.assocInput.proposedFormat.formatDesc : ''} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>What was the actual interview format?</label></div>
                  <span className='col-9'><input value={this.props.assocInput.interviewFormat ? this.props.assocInput.interviewFormat.formatDesc : ''} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div>
                <h3 className='text-center col-12'>Interview Feedback</h3>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>Feedback Requested</label></div>
                  <span className='col-9'><input value={this.feedbackRequestedDate} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>Feedback</label></div>
                  <span className='col-9'><input type='textarea' value={this.feedbackText} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>Feedback Received Date</label></div>
                  <span className='col-9'><input value={this.feedbackReceivedDate} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>Feedback Delivered Date</label></div>
                  <span className='col-9'><input value={this.feedbackDeliveredDate} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>Interview Format</label></div>
                  <span className='col-9'><input value={this.format} readOnly className='form-control'></input></span>
                </div>
              </div>
              <div className="form-group">
                <div className='form-row'>
                  <div className='col-3'><label>Feedback Status</label></div>
                  <span className='col-9'><input value={this.feedbackStatus} readOnly className='form-control'></input></span>
                </div>
              </div>
              <Button className='btn btn-block ' type='submit' color="warning" >Review</Button>


            </form>

          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => {
  console.log('currentpage:::::::', state.interviewState.interviewList.currentPage)

  return {
    currentPage: state.interviewState.interviewList.currentPage,
    pageSize: state.interviewState.interviewList.pageSize,
    orderBy: state.interviewState.interviewList.orderBy,
    direction: state.interviewState.interviewList.direction
  }
}

const mapDispatchToProps = {
  markAsReviewed,
  getInterviewPages
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewButton);
