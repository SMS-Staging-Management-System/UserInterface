import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
//import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import { InputGroupAddon } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import InputGroup from 'reactstrap/lib/InputGroup';
import './createInterview.component.scss'
import { ICreateInterviewComponentState } from '../../reducers';
import { IState } from '../../../reducers';
import { setState } from '../../actions/createInterview/createInterview.actions';
import { InterviewFormats } from '../../model/Interview.format.model';
import { interviewClient } from '../../../axios/sms-clients/interview-client';
import Button from 'reactstrap/lib/Button';
import { INewInterviewData } from '../../model/INewInterviewData';
import { store } from '../../../Store';
import { cohortClient } from '../../../axios/sms-clients/cohort-client';
import { userClient } from '../../../axios/sms-clients/user-client';


interface ICreateInterviewComponentProps extends RouteComponentProps {
    createInterviewComponentState: ICreateInterviewComponentState;
    setState: (newCreateInterviewComponentState: ICreateInterviewComponentState) => void;
}

class CreateInterviewComponent extends React.Component<ICreateInterviewComponentProps> {

    componentDidMount(){
        // interviewClient.testfetch().then((res) => {
        //     console.log(res);
        // });
        cohortClient.getAll().then((res) => {
            if(res.data){
                this.props.setState({...this.props.createInterviewComponentState, allCohorts:res.data} )
            }
            console.log("all cohorts");
            console.log(res);
        });
    }

    fetchAssociatesInSelectedCohort = async() => {
        const selectedCohort = this.props.createInterviewComponentState.selectedCohort;
        const res = selectedCohort && await userClient.findAllByCohortId( selectedCohort.cohortId);        
        if(res && res.data){
            this.props.setState({...this.props.createInterviewComponentState, associatesInSelectedCohort:res.data} )
        }
        console.log("all cohorts");
        console.log(res);
    }

    sendInputToDB = async() => {
        const s = store.getState() as IState;
        let managerEmail = s.managementState.auth.currentUser.email;
        let { selectedAssociate, date, location} = this.props.createInterviewComponentState; // { firstName:'', lastName:'', date:'', location:'', format:''}
        managerEmail = 'blake.kruppa@revature.com';
        selectedAssociate = {userId:9};
        date = 2;
        location = 'loc';
        if(managerEmail && selectedAssociate && date ){
            const newInterviewData: INewInterviewData = {
                managerEmail: managerEmail, 
                associateId: selectedAssociate.userId,
                date: date,
                location: location
            };
            interviewClient.addNewInterview(newInterviewData).then((res) => {
                console.log(res);
            });
        }
    }
    
  render() {
	// private int associateId;	
	// private Date scheduled; 
	// private String Place;
	// private int interview_format;
    // private int managerId;
    const state = this.props.createInterviewComponentState;
    const setState = this.props.setState;
    const { allCohorts, selectedCohort, associatesInSelectedCohort, selectedAssociate, date, location} = state; // { firstName:'', lastName:'', date:'', location:'', format:''}
    const cohortOptions = allCohorts && allCohorts.map((key) => {return (key !== 'none')? <option value={key}>{InterviewFormats[key]}</option> : undefined })
    const associateOptions = associatesInSelectedCohort && associatesInSelectedCohort.map((key) => {return (key !== 'none')? <option value={key}>{InterviewFormats[key]}</option> : undefined })
   
    return (
        <div id='new-interview-full'>
            <span>CREATE A NEW INTERVIEW FOR AN ASSOCIATE</span>
            <hr />
            <InputGroup>
                <InputGroupAddon addonType="prepend">Select an associate...</InputGroupAddon>
                <Input type='select' value={selectedCohort} disabled={!allCohorts}  onChange={(e)=>{setState({...state, selectedCohort: selectedCohort }); this.fetchAssociatesInSelectedCohort();}} >
                    <option value={undefined} style={{display:'none'}}>select a cohort...</option>
                    {cohortOptions}
                </Input>
                <Input type='select' value={selectedAssociate} disabled={!associatesInSelectedCohort}  onChange={(e)=>{setState({...state, selectedAssociate: selectedAssociate });}} >
                    <option value={undefined} style={{display:'none'}}>select a associate...</option>
                    {associateOptions}
                </Input>
                <Input placeholder="" value={selectedAssociate && `${selectedAssociate.firstName} ${selectedAssociate.lastName}`} />
            </InputGroup>
            < br/>
            <InputGroup>
                <InputGroupAddon addonType="prepend">date</InputGroupAddon>
                <Input placeholder="enter date of interview" value={date} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setState({...state, date: e.target.valueAsNumber })}} />
            </InputGroup>
            < br/>
            <InputGroup>
                <InputGroupAddon addonType="prepend">location</InputGroupAddon>
                <Input placeholder="enter location of interview" value={location} onChange={(e)=>{setState({...state, location: e.target.value })}} />
            </InputGroup>
            < br/>
            <Button color="secondary" size="lg" block onClick={this.sendInputToDB}>SUBMIT</Button>
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