import React from "react";
// import { IState, state } from "../../../reducers";
// import { withRouter } from "react-router";
// import { connect } from "react-redux";
// import { InterviewFeedback } from "../../model/Interview.feedback";
import Button from "reactstrap/lib/Button";
import { InterviewFormat } from "../../model/Interview.format.model";
import { RouteComponentProps, withRouter } from "react-router";
import { setState } from "../../actions/interviewFeedback/interviewFeedback.actions";
import { connect } from "react-redux";
import { IInterviewFeedbackComponentState } from "../../reducers/interview";
import { interviewClient } from "../../axios/sms-clients/interview-client";
import { IState } from "../../reducers";


interface IInterviewFeedbackComponentProps extends RouteComponentProps {
    interviewFeedbackComponentState: IInterviewFeedbackComponentState;
    setState: (newInterviewFeedbackComponentState: IInterviewFeedbackComponentState) => void;
};

class InterviewFeedbackComponent extends React.Component<IInterviewFeedbackComponentProps, any> {

    async componentDidMount() {
        console.log("this.props.match.params");
        console.log((this.props.match.params as any).interviewId);
        const interviewId = (this.props.match.params as any).interviewId;
        const relatedInterview = (await interviewClient.getInterview(interviewId)).data;
        console.log("data");
        console.log(relatedInterview);
        this.props.setState({...this.props.interviewFeedbackComponentState, noInterviewFound: !relatedInterview})
    }

    sendFeedbackToDB = async () => {
        console.log("WUERYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
        // console.log("this.props.match.params");
        console.log((this.props.match.params as any).interviewId);
        const state = this.props.interviewFeedbackComponentState;
        const { feedbackRequestedDate, feedbackText, feedbackReceivedDate, feedbackDeliveredDate, interviewFormat, interviewStatus } = state;
        // const {interviewFormat} = state;
        console.log(state)
        // console.log('interviewformat::::::::',InterviewFormat[interviewFormat])
        const res = await interviewClient.sendFeedback({
            interviewId: (this.props.match.params as any).interviewId,
            feedbackRequestedDate: feedbackRequestedDate? (new Date(feedbackRequestedDate+'T00:00:00')).valueOf():0,
            feedbackText: feedbackText? feedbackText:null,
            feedbackReceivedDate: feedbackReceivedDate? (new Date(feedbackReceivedDate+'T00:00:00')).valueOf():0,
            feedbackDeliveredDate: feedbackDeliveredDate? (new Date(feedbackDeliveredDate+'T00:00:00')).valueOf():0,
            statusId : interviewStatus? interviewStatus:0,
            format: interviewFormat? interviewFormat:0,
        });
        return (res.status >= 200 && res.status < 300);
    }

    render() {        
        const state = this.props.interviewFeedbackComponentState;
        const setState = this.props.setState;
        const { feedbackRequestedDate, feedbackText, feedbackReceivedDate, feedbackDeliveredDate, interviewFormat, noInterviewFound, interviewStatus } = state; // { firstName:'', lastName:'', date:'', location:'', format:''}
        const buttonText = (noInterviewFound)? "loading interview..." : "CREATE";
        const buttonOnClick = async (e)=>{e.preventDefault(); const success = await this.sendFeedbackToDB(); console.log("successfully sent?:" + success); if(success)this.props.history.push("/interview/list");};
        return (
            <div className='container'>

                    <div id='new-interview-full'>
                        <div>
                            <p className='col-12'><h1 className='text-center'>Create Interview Feedback</h1></p>
                        </div>
                        <form onSubmit={buttonOnClick}>
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback Requested</label></div>
                                <span className='col-9'><input type='date' className='form-control' value={feedbackRequestedDate} onChange={(e) => { setState({ ...state, feedbackRequestedDate: e.target.value }); }}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback</label></div>
                                <span className='col-9'><input type='textarea' className='form-control' value={feedbackText} onChange={(e) => { setState({ ...state, feedbackText: e.target.value }); }}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback Received Date</label></div>
                                <span className='col-9'><input type='date' className='form-control' value={feedbackReceivedDate} onChange={(e) => { setState({ ...state, feedbackReceivedDate: e.target.value }); }}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Feedback Delivered Date</label></div>
                                <span className='col-9'><input type='date' className='form-control' value={feedbackDeliveredDate} onChange={(e) => { setState({ ...state, feedbackDeliveredDate: e.target.value }); }}></input></span>
                            </div>
                            <br />
                            <div className='form-row'>
                                <div className='col-3'><label>Interview Format</label></div>
                                <span className='col-9'><select className='form-control' value={interviewFormat} onChange={(e) => { setState({ ...state, interviewFormat: parseInt(e.target.value, 10) }); }}>
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
                                <span className='col-9'><select className='form-control' value={interviewStatus} onChange={(e) => { setState({ ...state, interviewStatus: parseInt(e.target.value, 10) }); }}>
                                    <option value={1}>Pending</option>
                                    <option value={2}>No Feedback</option>
                                    <option value={3}>Selected for Second Round</option>
                                    <option value={4}>Direct Hire</option>
                                    <option value={5}>Selected</option>
                                </select></span>
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-5'></div>
                                <Button type='submit' className='btn btn-secondary col'>{buttonText}</Button>
                                <div className='col-5'></div>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }

}

const mapStateToProps = (state: IState) => ({
    interviewFeedbackComponentState: state.interviewState.interviewFeedbackComponentState
});
const mapDispatchToProps = {
    setState: setState
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterviewFeedbackComponent));