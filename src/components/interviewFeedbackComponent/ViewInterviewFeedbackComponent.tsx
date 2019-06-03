//import Form from "reactstrap/lib/Form";
import React from "react";
import { interviewClient } from "../../axios/sms-clients/interview-client";
//import InputGroup from "reactstrap/lib/InputGroup";
//import InputGroupAddon from "reactstrap/lib/InputGroupAddon";
//import Input from "reactstrap/lib/Input";
import { Redirect } from "react-router";
//import Button from "reactstrap/lib/Button";

export class ViewInterviewFeedbackComponent extends React.Component<any, any> {
    
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            feedbackRequestedDate: null,
            feedbackText: null,
            feedbackReceivedDate: null,
            feedbackDeliveredDate: null
        };
    }

    componentWillMount() {
        this.getInterviewFeedback();
    }

    redirectTo() {
        this.setState({
            redirect: '/interview/list'
        });
    }

    getInterviewFeedback = async () => {
        let { interviewId } = this.props.location.state;
        console.log(interviewId);
        let interviewFeedback = await interviewClient.fetchInterviewFeedback(interviewId);
        console.log(interviewFeedback);
        this.setState({
            feedbackRequestedDate: new Date(interviewFeedback.data.feedbackRequested),
            feedbackText: interviewFeedback.data.feedback,
            feedbackReceivedDate: new Date(interviewFeedback.data.feedbackReceived),
            feedbackDeliveredDate: new Date(interviewFeedback.data.feedbackDelivered)
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect push to={this.state.redirect} />);
        } else {
            return (
                
            <div className='container'>
                
            <div>
                <div className='rev-background-color'>
                    <p className='col-12'><h1 className='text-center'>Interview Feedback</h1></p>
                </div>
                <form>
                    <div className='form-row'>
                        <div className='col-3'><label>Feedback Requested</label></div>
                        <span className='col-9'><input value={this.state.feedbackRequestedDate} readOnly className='form-control'></input></span>
                    </div>
                    <br />
                    <div className='form-row'>
                        <div className='col-3'><label>Feedback</label></div>
                        <span className='col-9'><input type='textarea' value={this.state.feedbackText} readOnly className='form-control'></input></span>
                    </div>
                    <br />
                    <div className='form-row'>
                        <div className='col-3'><label>Feedback Received Date</label></div>
                        <span className='col-9'><input value={this.state.feedbackReceivedDate} readOnly className='form-control'></input></span>
                    </div>
                    <br />
                    <div className='form-row'>
                        <div className='col-3'><label>Feedback Delivered Date</label></div>
                        <span className='col-9'><input value={this.state.feedbackDeliveredDate} readOnly className='form-control'></input></span>
                    </div>
                    <br />
                    <input type='submit' className='btn btn-success' value='back' onClick={() => this.redirectTo()}></input>
                </form>
                {/* <span>Interview Feedback</span>
                <hr />
                <Form>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Feedback Requested</InputGroupAddon>
                        <Input type="textarea" value={this.state.feedbackRequestedDate} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Feedback</InputGroupAddon>
                        <Input type="textarea" value={this.state.feedbackText} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Feedback Received Date</InputGroupAddon>
                        <Input type="textarea" value={this.state.feedbackReceivedDate} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">Feedback Delievered Date</InputGroupAddon>
                        <Input type="textarea" value={this.state.feedbackDeliveredDate} />
                    </InputGroup>
                    <br />
                    <Button color="secondary" size="lg" block onClick={() => this.redirectTo()}>Back</Button>
                </Form> */}
            </div>
            </div>
            );
        }
       
    }
}