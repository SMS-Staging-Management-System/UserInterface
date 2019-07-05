import React from "react";
// import { IState, state } from "../../../reducers";
// import { withRouter } from "react-router";
// import { connect } from "react-redux";
// import { InterviewFeedback } from "../../model/Interview.feedback";
import InputGroup from "reactstrap/lib/InputGroup";
import Input from "reactstrap/lib/Input";
// import { setState } from "../../actions/createInterview/createInterview.actions";
import InputGroupAddon from "reactstrap/lib/InputGroupAddon";
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
        console.log("this.props.match.params");
        console.log((this.props.match.params as any).interviewId);
        const state = this.props.interviewFeedbackComponentState;
        const { feedbackRequestedDate, feedbackText, feedbackReceivedDate, feedbackDeliveredDate, interviewFormat, interviewStatus } = state;
        // const {interviewFormat} = state;
        console.log(state)
        console.log('interviewformat::::::::',InterviewFormat[interviewFormat])
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
        const buttonDisabledState = noInterviewFound
        const buttonText = (noInterviewFound)? "loading interview..." : (buttonDisabledState)? "Please fill out all fields" : "SUBMIT";
        const buttonOnClick = async ()=>{const success = await this.sendFeedbackToDB(); console.log("successfully sent?:" + success); if(success)this.props.history.push("/interview/list");};
        return (
            <div id='new-interview-full'>
                <span>EDIT FEEDBACK FOR AN INTERVIEW</span>
                <hr />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback requested</InputGroupAddon>
                    <Input type="date" placeholder="date" value={feedbackRequestedDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, feedbackRequestedDate: e.target.value }); }} />
                </InputGroup>
                < br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback text</InputGroupAddon>
                    <textarea placeholder="add interview feedback here" value={feedbackText} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setState({ ...state, feedbackText: e.target.value }); }} className="form-control custom-control" rows={3} style={{ resize: 'none' }}></textarea>
                </InputGroup>
                < br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback received</InputGroupAddon>
                    <Input type="date" placeholder="date" value={feedbackReceivedDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, feedbackReceivedDate: e.target.value }); }} />
                </InputGroup>
                < br />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback delivered</InputGroupAddon>
                    <Input type="date" placeholder="date" value={feedbackDeliveredDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, feedbackDeliveredDate: e.target.value }); }} />
                </InputGroup>
                < br />
                <InputGroup>
                    <Input type='select' value={interviewFormat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, interviewFormat: parseInt(e.target.value) }); }} >
                        <option value={InterviewFormat.none} style={{ display: 'none' }}>select an interview format...</option>
                        <option value={1} >On Site</option>
                        <option value={2}>In Person</option>
                        <option value={3}>Video Call</option>
                        <option value={4}>Phone Call</option>
                        {/* {Object.keys(InterviewFormat).map((key) => { return (key !== 'none') ? <option value={key}>{InterviewFormat[key]}</option> : undefined })} */}
                    </Input>
                </InputGroup>
                < br />
                <InputGroup>
                    <Input type='select' value={interviewStatus} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, interviewStatus: parseInt(e.target.value) }); }} >
                        <option value = {InterviewFormat.none} style={{display:'none'}}>select an feedback status...</option>
                        <option value ={1}>Pending</option>
                        <option value={2}>No Feedback</option>
                        <option value={3}>Selected for Second Round</option>
                        <option value={4}>Direct Hire</option>
                        <option value={5}>Selected</option>
                    </Input>
                </InputGroup>
                <br/>
                <Button color="secondary" size="lg" block disabled={buttonDisabledState}  onClick={buttonOnClick}>{buttonText}</Button>
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