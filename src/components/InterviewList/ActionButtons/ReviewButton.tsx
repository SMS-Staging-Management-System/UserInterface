import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import { interviewClient } from '../../../axios/sms-clients/interview-client';
import { markAsReviewed } from '../../../actions/interviewList/interviewList.actions';
import {  FaCheckSquare, FaTimes } from 'react-icons/fa';
// import { FaCheckSquare } from 'react-icons/fa';


interface myProps{
    interview:any,
    className:string,
    markAsReviewed: (interviewId: number) => void,

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

    constructor(props) {
      super(props);
  }

  componentWillMount() {
    this.getInterviewFeedback();
}

  getInterviewFeedback = async () => {
    let interviewId = this.props.interview.id;
    console.log(interviewId);
    let interviewFeedback = await interviewClient.fetchInterviewFeedback(interviewId);
    console.log(interviewFeedback);

    this.feedbackRequestedDate = new Date(interviewFeedback.data.feedbackRequested),
    this.feedbackText = interviewFeedback.data.feedback,
    this.feedbackReceivedDate = new Date(interviewFeedback.data.feedbackReceived),
    this.feedbackDeliveredDate = new Date(interviewFeedback.data.feedbackDelivered)

}

    markAsReviewed = (event: any) => {
      event.preventDefault()
      this.props.markAsReviewed(this.props.interview.Id);
    }

    toggle = () =>{
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    render() {
        const isReviewed = (this.props.interview.reviewed)
        return (
            <div >
            {isReviewed? <i onClick={this.toggle}><FaCheckSquare className={this.props.className}/></i>: <i onClick={this.toggle}><FaTimes className='btn-danger'/></i>}
          <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} >
            <ModalHeader toggle={this.toggle}>Review Interview</ModalHeader>
            <ModalBody>
                <form  onSubmit={this.markAsReviewed} className=''>
                    <div className="form-group">
                        {/* <input 
                            type="text" 
                            id='name' 
                            className="form-control"
                            name='name'
                            placeholder='name to update'
                            min= '0'
                            label='Feedback Requested'
                            readOnly
                            defaultValue = {this.feedbackRequestedDate}
                    /> */}
                    <div className='form-row'>
                        <div className='col-3'><label>Feedback Requested</label></div>
                        <span className='col-9'><input value={this.feedbackRequestedDate} readOnly className='form-control'></input></span>
                    </div>
                    </div>
                    <div className="form-group">
                        {/* <input 
                            type="text" 
                            id='description' 
                            className="form-control"
                            name='description'
                            placeholder='Description to update'
                            required    
                            min= '0'
                            ref = {input=>this.descriptionRef = input}
                            defaultValue = {description}
                    /> */}
                    <div className='form-row'>
                        <div className='col-3'><label>Feedback</label></div>
                        <span className='col-9'><input type='textarea' value={this.feedbackText} readOnly className='form-control'></input></span>
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