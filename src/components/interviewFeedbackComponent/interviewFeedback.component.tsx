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
import { RouteComponentProps, withRouter, Redirect } from "react-router";
import { setState } from "../../actions/interviewFeedback/interviewFeedback.actions";
import { connect } from "react-redux";
import { IInterviewFeedbackComponentState } from "../../reducers/interview";
import { interviewClient } from "../../axios/sms-clients/interview-client";
import { IState } from "../../reducers";


interface IInterviewFeedbackComponentProps extends RouteComponentProps {
    interviewFeedbackComponentState: IInterviewFeedbackComponentState;
    setState: (newInterviewFeedbackComponentState: IInterviewFeedbackComponentState) => void;
};

export let redirect: any = null;

class InterviewFeedbackComponent extends React.Component<IInterviewFeedbackComponentProps, any> {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         redirect: null
    //     }
    // }

    // interviewFeedbackId:      number,
    // feedbackRequested:     Date,
    // feedback:  string,
    // feedbackReceived:   Date,
    // feedbackDelivered: Date,
    // status: FeedbackStatus,
    // interview: Interview

    sendFeedbackToDB = async () => {
        console.log("this.props.match.params");
        console.log((this.props.match.params as any).interviewId);
        const state = this.props.interviewFeedbackComponentState;
        const { feedbackRequestedDate, feedbackText, feedbackReceivedDate, feedbackDeliveredDate, interviewFormat } = state;
        console.log(await interviewClient.sendFeedback({
            interviewId: (this.props.match.params as any).interviewId,
            feedbackRequestedDate: (new Date(feedbackRequestedDate)).valueOf(),
            feedbackText: feedbackText,
            feedbackReceivedDate: (new Date(feedbackReceivedDate)).valueOf(),
            feedbackDeliveredDate: (new Date(feedbackDeliveredDate)).valueOf(),
            interviewFormat: InterviewFormat[interviewFormat],
        }));
    }

    // returnRedirect() {
    //     console.log('here');
    //     redirect = '/interview/list';
    // }

    render() {
        if (redirect) {
            return (<Redirect push to={redirect} />)
        } else {
            const state = this.props.interviewFeedbackComponentState;
            const setState = this.props.setState;
            const { feedbackRequestedDate, feedbackText, feedbackReceivedDate, feedbackDeliveredDate, interviewFormat } = state; // { firstName:'', lastName:'', date:'', location:'', format:''}
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
                        <Input type='select' value={interviewFormat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, interviewFormat: e.target.value as InterviewFormat }); }} >
                            <option value={InterviewFormat.none} style={{ display: 'none' }}>select an interview format...</option>
                            {Object.keys(InterviewFormat).map((key) => { return (key !== 'none') ? <option value={key}>{InterviewFormat[key]}</option> : undefined })}
                        </Input>
                    </InputGroup>
                    < br />
                    <Button color="secondary" size="lg" block onClick={this.sendFeedbackToDB }>SUBMIT</Button>
                </div>
            );
        }
    }

}

const mapStateToProps = (state: IState) => ({
    interviewFeedbackComponentState: state.interviewState.interviewFeedbackComponentState
});
const mapDispatchToProps = {
    setState: setState
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterviewFeedbackComponent));
