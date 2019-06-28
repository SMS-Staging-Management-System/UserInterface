import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { interviewClient } from '../../../axios/sms-clients/interview-client';
import { markAsReviewed } from '../../../actions/interviewList/interviewList.actions';
import {  FaCheckSquare, FaTimes } from 'react-icons/fa';


interface myProps{
    interview:any,
    markAsReviewed: (interviewId: number) => void,
    assocInput:any

}

// interface myState{
//   feedbackRequestedDate
// }

class ReviewButton extends Component<myProps,any> {
    state = {
        modal:false
    }
    feedbackRequestedDate:any;
    feedbackText:any ;
    feedbackReceivedDate:any;
    feedbackDeliveredDate:any;
    interviewId:any;

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
    // console.log(interviewFeedback);
    this.interviewId = interviewId,
    this.feedbackRequestedDate = new Date(interviewFeedback.data.feedbackRequested),
    this.feedbackText = interviewFeedback.data.feedback,
    this.feedbackReceivedDate = new Date(interviewFeedback.data.feedbackReceived),
    this.feedbackDeliveredDate = new Date(interviewFeedback.data.feedbackDelivered)

  }
  

    markAsReviewed = (event: any) => {
      event.preventDefault()
      // console.log(this.interviewId)
      this.props.markAsReviewed(this.interviewId);
      this.toggle()
    }

    renderDate = (date: number) => {
      if (date > 0) {
          return new Date(date).toString()
      } else {
          return '-';
      }
    }

    toggle = () =>{
      console.log(this.interviewId)
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    render() {
        const isReviewed = (this.props.interview.reviewed)
        return (
            <div >
            {isReviewed? <i onClick={this.toggle}><FaCheckSquare className='btn-success'/></i>: <i onClick={this.toggle}><FaTimes className='btn-danger'/></i>}
          <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} >
            <ModalHeader  className='rev-background-color' toggle={this.toggle}>Review Interview</ModalHeader>
            <ModalBody>
            <form  onSubmit={this.markAsReviewed} className=''>
                <div>
                    <p className='col-12'><h3 className='text-center'>Associate Input</h3></p>
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
                        <span className='col-9'><input value={this.props.assocInput.descriptionProvided? 'Yes':'No'} readOnly className='form-control'></input></span>
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
                    <p className='col-12'><h3 className='text-center'>Interview Feedback</h3></p>
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
                    <Button className='btn btn-block ' type='submit' color="warning" >Review</Button>


                </form>
                
            </ModalBody>
          </Modal>
        </div>
        )
    }
}

const mapStateToProps = () =>{
    
    return {
        
    }
}

const mapDispatchToProps = {
    markAsReviewed
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewButton);