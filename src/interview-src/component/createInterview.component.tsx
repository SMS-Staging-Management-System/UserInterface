import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IState, } from '../../reducers';
import { connect } from 'react-redux';
//import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import { ICreateInterviewComponentState } from '../../reducers/interview';
import { setState } from '../actions/createInterview.actions';
import { InputGroupAddon } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import InputGroup from 'reactstrap/lib/InputGroup';
import { InterviewFormat } from '../model/interviewFormat.model';
import './createInterview.component.scss'


interface ICreateInterviewComponentProps extends RouteComponentProps {
    createInterviewComponentState: ICreateInterviewComponentState;
    setState: (newCreateInterviewComponentState: ICreateInterviewComponentState) => void;
}

class CreateInterviewComponent extends React.Component<ICreateInterviewComponentProps> {

    componentDidMount(){

    }

  sendInputToDB = async() => {
  }

  render() {
      this.sendInputToDB();
	// private int associateId;	
	// private Date scheduled; 
	// private String Place;
	// private int interview_format;
    // private int managerId;
    const formatOptions = Object.keys(InterviewFormat).map((key) => {return (key !== 'none')? <option value={key}>{InterviewFormat[key]}</option> : undefined })
    const state = this.props.createInterviewComponentState;
    const setState = this.props.setState;
    const { firstName, lastName, date, location, format} = state; // { firstName:'', lastName:'', date:'', location:'', format:''}
    return (
        <div id='new-interview-full'>
            <span>CREATE A NEW INTERVIEW FOR AN ASSOCIATE</span>
            <hr />
            <InputGroup>
                <InputGroupAddon addonType="prepend">associate</InputGroupAddon>
                <Input placeholder="enter associates first name" value={firstName} onChange={(e)=>{setState({...state, firstName: e.target.value })}} />
                <Input placeholder="enter associates last name" value={lastName} onChange={(e)=>{setState({...state, lastName: e.target.value })}} />
            </InputGroup>
            < br/>
            <InputGroup>
                <InputGroupAddon addonType="prepend">date</InputGroupAddon>
                <Input placeholder="enter date of interview" value={date} onChange={(e)=>{setState({...state, date: e.target.value })}} />
            </InputGroup>
            < br/>
            <InputGroup>
                <InputGroupAddon addonType="prepend">location</InputGroupAddon>
                <Input placeholder="enter location of interview" value={location} onChange={(e)=>{setState({...state, location: e.target.value })}} />
            </InputGroup>
            < br/>
            <InputGroup>
                <InputGroupAddon addonType="prepend">format</InputGroupAddon>
                <Input type='select' placeholder="enter format of interview" value={format}  onChange={(e)=>{setState({...state, format: e.target.value as InterviewFormat })}} >
                    <option value={InterviewFormat.none} style={{display:'none'}}>select a format...</option>
                    {formatOptions}
                </Input>
            </InputGroup>
        </div>
    );
  }


}

const mapStateToProps = (state: IState) => ({
    createInterviewComponentState: state.interviewState.createInterviewComponentState
});
const mapDispatchToProps = {
    setState: setState
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateInterviewComponent));