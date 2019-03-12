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
import { RouteComponentProps } from "react-router";
import { IInterviewFeedbackComponentState } from "../../reducers";


interface IInterviewFeedbackComponentProps extends RouteComponentProps {
    createInterviewComponentState: IInterviewFeedbackComponentState;
    setState: (newCreateInterviewComponentState: IInterviewFeedbackComponentState) => void;
}

export class InterviewFeedbackComponent extends React.Component<IInterviewFeedbackComponentProps, any> {
    // interviewFeedbackId:      number,
    // feedbackRequested:     Date,
    // feedback:  string,
    // feedbackReceived:   Date,
    // feedbackDelivered: Date,
    // status: FeedbackStatus,
    // interview: Interview
    render() {
        return (
            <div id='new-interview-full'>
                <span>EDIT FEEDBACK FOR AN INTERVIEW</span>
                <hr />
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback requested</InputGroupAddon>
                    <Input type="date" placeholder="date" value={0} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{}} />
                </InputGroup>
                < br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback text</InputGroupAddon>
                    <textarea placeholder="add interview feedback here" value={''} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{}} className="form-control custom-control" rows={3} style={{resize:'none'}}></textarea>  
                </InputGroup>
                < br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback received</InputGroupAddon>
                    <Input type="date" placeholder="date" value={0} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{}} />
                </InputGroup>
                < br/>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">feedback delivered</InputGroupAddon>
                    <Input type="date" placeholder="date" value={0} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{}} />
                </InputGroup>
                < br/>
                <InputGroup>
                    <Input type='select' value={InterviewFormat.none}   onChange={(e)=>{}} >
                        <option value={InterviewFormat.none} style={{display:'none'}}>select an interview format...</option>
                        {Object.keys(InterviewFormat).map((key) => {return (key !== 'none')? <option value={key}>{InterviewFormat[key]}</option> : undefined })}
                    </Input>
                   </InputGroup>
                < br/>
                <Button color="secondary" size="lg" block onClick={()=>{}}>SUBMIT</Button>
            </div>
        );
      }

}

// const mapStateToProps = (state: IState) => ({
// });
// const mapDispatchToProps = {
// }
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterviewFeedbackComponent));
