//import Form from "reactstrap/lib/Form";
import React from "react";
import { interviewClient } from "../../axios/sms-clients/interview-client";
//import InputGroup from "reactstrap/lib/InputGroup";
//import InputGroupAddon from "reactstrap/lib/InputGroupAddon";
//import Input from "reactstrap/lib/Input";
import { Redirect } from "react-router";
// import { connect } from "react-redux";
// import { IState } from "../../reducers";
// import { setState } from "../../actions/interviewFeedback/interviewFeedback.actions";
// import { IInterviewFeedbackComponentState } from "../../reducers/interview";
import Button from "reactstrap/lib/Button";
import { store } from '../../Store';


export class ViewInterviewFeedbackComponent extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        };
    }

    componentDidMount() {
        this.getInterviewFeedback();
    }

    redirectTo() {
        this.setState({
            redirect: '/interview/list'
        });
    }

    sendFeedbackToDB = async (event) => {
        event.preventDefault()
        let { interviewId } = this.props.location.state;
        const { feedbackRequestedDate, feedbackText, feedbackReceivedDate, feedbackDeliveredDate, interviewFormat, feedbackStatus } = this.state;
        await interviewClient.updateFeedback(
            this.state.feedbackId,
            {
                interviewId: interviewId,
                feedbackRequestedDate: (new Date(feedbackRequestedDate + 'T00:00:00')).valueOf(),
                feedbackText: feedbackText,
                feedbackReceivedDate: (new Date(feedbackReceivedDate + 'T00:00:00')).valueOf(),
                feedbackDeliveredDate: (new Date(feedbackDeliveredDate + 'T00:00:00')).valueOf(),
                statusId: feedbackStatus,
                format: interviewFormat,
            });
        this.redirectTo()
    }

    //i could have done this in one line but i wanted to make it more readable
    convertDate = (date: Date) => {
        //for whatever reason getMonth() returns the number of the month -1
        let month = `${date.getMonth() + 1}`
        let day = `${date.getDate()}`
        let year = date.getFullYear()
        if (year < 2000) {
            return undefined
        }
        if (date.getMonth() + 1 < 10) {
            month = `0${month}`
        }
        if (date.getDate() < 10) {
            day = `0${day}`
        }
        return `${year}-${month}-${day}`
    }

    getInterviewFeedback = async () => {
        let { interviewId } = this.props.location.state;
        console.log(interviewId);
        let interviewFeedback = await interviewClient.fetchInterviewFeedback(interviewId);
        console.log(interviewFeedback);
        let req = new Date(interviewFeedback.data.feedbackRequested)
        let rec = new Date(interviewFeedback.data.feedbackReceived)
        let del = new Date(interviewFeedback.data.feedbackDelivered)
        let requestedDate = this.convertDate(req)
        let recievedDate = this.convertDate(rec)
        let deliveredDate = this.convertDate(del)
        // console.log('fooooooooooooooorrrrrrr ',interviewFeedback.data.format.id)
        this.setState({
            feedbackId: interviewFeedback.data.id,
            feedbackRequestedDate: requestedDate,
            feedbackText: interviewFeedback.data.feedback,
            feedbackReceivedDate: recievedDate,
            feedbackDeliveredDate: deliveredDate,
            feedbackStatus: interviewFeedback.data.status ? interviewFeedback.data.status.feedback_status_id : 0,
            interviewFormat: interviewFeedback.data.format ? interviewFeedback.data.format.id : 0
            // interviewFormat: interviewFeedback.data.        
        });
    }

    makeStateUpdater = (update: string) => {

        return (e) => {
            this.setState({ ...this.state, [update]: e.target.value });
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect push to={this.state.redirect} />);
        } else {
            const roles = (store.getState().managementState.auth.currentUser.roles);
            const isAdmin = (roles.includes('admin') || roles.includes('staging-manager'));
            return (

                <div className='container'>

                    <div id='new-interview-full'>
                        <div>
                            <p className='col-12'><h1 className='text-center'>Interview Feedback</h1></p>
                        </div>
                        <form onSubmit={this.sendFeedbackToDB}>
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback Requested</label></div>
                                <span className='col-9'><input disabled={!isAdmin} type='date' value={this.state.feedbackRequestedDate} className='form-control' onChange={this.makeStateUpdater("feedbackRequestedDate")}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback</label></div>
                                <span className='col-9'><input disabled={!isAdmin} type='textarea' value={this.state.feedbackText} className='form-control' onChange={this.makeStateUpdater("feedbackText")}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback Received Date</label></div>
                                <span className='col-9'><input disabled={!isAdmin} type='date' value={this.state.feedbackReceivedDate} className='form-control' onChange={this.makeStateUpdater("feedbackReceivedDate")}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback Delivered Date</label></div>
                                <span className='col-9'><input disabled={!isAdmin} type='date' value={this.state.feedbackDeliveredDate} className='form-control' onChange={this.makeStateUpdater("feedbackDeliveredDate")}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Interview Format</label></div>
                                <span className='col-9'><select disabled={!isAdmin} value={this.state.interviewFormat} className='form-control' onChange={(e) => { this.setState({ ...this.state, interviewFormat: parseInt(e.target.value) }); }}>
                                    {/* <option value={''} style={{ display: 'none' }}>select an interview format...</option> */}
                                    <option value={0} style={{ display: 'none' }}>select an interview format...</option>
                                    <option value={1}>On Site</option>
                                    <option value={2}>In Person</option>
                                    <option value={3}>Video Call</option>
                                    <option value={4}>Phone Call</option>
                                </select></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback Status</label></div>
                                <span className='col-9'><select disabled={!isAdmin} value={this.state.feedbackStatus} className='form-control' onChange={(e) => { this.setState({ ...this.state, feedbackStatus: parseInt(e.target.value) }); }}>
                                    <option value={1}>Pending</option>
                                    <option value={2}>No Feedback</option>
                                    <option value={3}>Selected for Second Round</option>
                                    <option value={4}>Direct Hire</option>
                                    <option value={5}>Selected</option>
                                </select></span>
                            </div>
                            <br />
                            <div className='row'>
                                <Button className='btn btn-secondary col-sm' value='back' onClick={() => this.redirectTo()}>Back</Button>
                                <div className='col-3'></div>

                                <Button type='submit' disabled={!isAdmin} className='btn btn-secondary col'>SUBMIT</Button>

                                <div className='col-5'></div>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

    }
}