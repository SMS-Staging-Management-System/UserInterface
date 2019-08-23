import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
//import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import { InputGroupAddon, Form } from 'reactstrap';
import Input from 'reactstrap/lib/Input';
import InputGroup from 'reactstrap/lib/InputGroup';
import './createInterview.component.scss';
import { setCreateState } from '../../actions/createInterview/createInterview.actions';
import Button from 'reactstrap/lib/Button';
import { INewInterviewData } from '../../model/INewInterviewData';
import { ICreateInterviewComponentState } from '../../reducers/interview';
import { cohortClient } from '../../axios/sms-clients/cohort-client';
import { userClient } from '../../axios/sms-clients/user-client';
import { IState } from '../../reducers';
import { interviewClient } from '../../axios/sms-clients/interview-client';
import { Client } from '../../model/Client.model';
import { ICohort } from '../../model/cohort';
import { IUser } from '../../model/user.model';
import { smsClient } from '../../axios/sms-clients';
import { managersClient } from '../../axios/sms-clients/managers-client';


interface ICreateInterviewComponentProps extends RouteComponentProps {
    createInterviewComponentState: ICreateInterviewComponentState;
    currentUser: IUser
    setState: (newCreateInterviewComponentState: ICreateInterviewComponentState) => void;
}

interface ICreateNewInterviewComponentState{
    //Because I cant get date and time individually alone and cant use props setState
    //to allow date and time to be pu tinto the props date
    date: string
    time: string
    managerEmail: string
}

class CreateInterviewComponent extends React.Component<ICreateInterviewComponentProps, ICreateNewInterviewComponentState> {

    state = {
        date: '',
        time: '',
        managerEmail: ''
    }

    componentDidMount() {
        //This will find all cohorts to check if any exist
        cohortClient.findAll().then((res) => {
            if (res.data) {
                this.props.setState({ ...this.props.createInterviewComponentState, allCohorts: res.data })
            }
            console.log("all cohorts");
            console.log(res);
        }).catch((e) => {
            console.trace();
            console.log(e);
        });
        //This will grab all the clients
        this.getAllClients();

        //
        smsClient.get(`/user-service/users/email/${this.props.currentUser.email}`).then((res)=>{
            //function returns a page instead of just user, but due to being
            //just a big javascript object, can just grab username and password from it
            if(res.data){
                this.props.setState({...this.props.createInterviewComponentState, 
                    selectedAssociate: res.data
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    componentWillUpdate(){
        if(this.props.createInterviewComponentState.date !== (this.state.date + ' ' + this.state.time)){
            this.createDate()
        }
        let testDate: Date = new Date(this.props.createInterviewComponentState.date)
        console.log(testDate)
    }

    getAllClients = async () => {
        let tempArr = await interviewClient.fetchClient();
        let clientArr: Client[] = await tempArr.data;

        this.props.setState({ ...this.props.createInterviewComponentState, clientArr: clientArr });

        console.log(this.props.createInterviewComponentState.clientArr);
    }
    

    fetchAssociatesInSelectedCohort = async (selectedCohort) => {
        //const selectedCohort = this.props.createInterviewComponentState.selectedCohort;
        console.log("selected cohort");
        console.log(selectedCohort);
        const res = selectedCohort && await userClient.findAllByCohortId(selectedCohort.cohortId);
        if (res && res.data && this.props.currentUser.roles.length !== 0) {
            this.props.setState({
                ...this.props.createInterviewComponentState,
                associatesInSelectedCohort: res.data,
                selectedAssociate: undefined,
            })
        }
        console.log("all associates in cohort");
        console.log(res);
    }

    fetchCurrentUserName = async (currentEmail) => {
        let name
        const res = await smsClient.get(`/user-service/users/email/${currentEmail}`)
        name = res.data.firstName + ' ' + res.data.lastName
        return name
    }

    grabManagerEmail = async (alias) => { 
        const res = await managersClient.findManagersByLocation(alias)
        console.log('Check')
            console.log(alias);
            this.setState({...this.state,
                managerEmail: res.data[0].email
        })
    }

    sendInputToDB = async (): Promise<boolean> => {
        // { firstName:'', lastName:'', date:'', location:'', format:''}
        let { selectedAssociate, date: dateString, location, client } = this.props.createInterviewComponentState;
        if (selectedAssociate && dateString && location && client) {
            let newInterviewData: INewInterviewData
            await this.grabManagerEmail(location)
            //to tell if a user is an associate or not. if not, then managerEmail is blank and the endpoint will take care of that
            if(this.props.currentUser.roles.length === 0){
                newInterviewData = {
                    associateEmail: selectedAssociate.email,
                    managerEmail: this.state.managerEmail,
                    date: (new Date(dateString)).valueOf(),
                    location: location,
                    client: client
                };   
            }else{
                newInterviewData = {
                    associateEmail: selectedAssociate.email,
                    managerEmail: '',
                    date: (new Date(dateString)).valueOf(),
                    location: location,
                    client: client
                };   
            }
            
            
            console.log(newInterviewData);
            const res = await interviewClient.addNewInterview(newInterviewData)
            console.log('submitted')
            console.log(res);
            return (res.status >= 200 && res.status < 300); 
        } else return false;
    }


    createDate = () => {
        let newDate = this.state.date + ' ' + this.state.time

        console.log(newDate)
        this.props.setState({
            ...this.props.createInterviewComponentState, 
            date : newDate
        })
    }

    updateDate = (event) =>{
        event.preventDefault()

        console.log(event.target.value)

        this.setState({
            ...this.state,
            date : event.target.value
        })
    }

    updateTime = (event) =>{
        event.preventDefault()

        console.log(event.target.value)

        this.setState({
            ...this.state,
            time : event.target.value
        })
    }

    render() {
        // private int associateId;	
        // private Date scheduled; 
        // private String Place;
        // private int interview_format;
        // private int managerId;
        
        const state = this.props.createInterviewComponentState;
        const setState = this.props.setState;
        const { allCohorts, selectedCohort, associatesInSelectedCohort, selectedAssociate, date, location, client } = state;
        const cohortOptions = allCohorts && allCohorts.map((val:ICohort) => { 
            return <option value={JSON.stringify(val)} key={val.cohortId}>{val.cohortName}</option> 
        })
        const associateOptions = this.props.currentUser.roles.includes('staging-manager') && associatesInSelectedCohort && associatesInSelectedCohort.map((val:IUser) => { 
            return <option value={JSON.stringify(val)} key={val.userId}>{`${val.firstName} ${val.lastName}`}</option> 
        })
        
        // Button to submit when all input fields are filled out. (Disabled if all input not filled)
        const buttonDisabledState = !(selectedAssociate && date && location && client);
        const buttonText = (buttonDisabledState)? "Please fill out all fields" : "SUBMIT";
        const buttonOnClick = async ()=>{
            const success = await this.sendInputToDB(); 
            console.log("successfully sent?:" + success); 
            if(success)this.props.history.push("/interview/list");
        };
        
        return (
            <div id='new-interview-full'>

            <h4 className="create-interview-title">Setup</h4>
            <h3 className="create-interview-title2">New Interview</h3>
            <hr />
            <Form className="NewInterForm" >
            <div className="row">
                <div className="col-md-6">
                <span className="span-select-interview">Select a Cohort </span>
                <InputGroup className="new-interview-input-group">
                    <Input className='input-group-interview' type='select'
                        value={JSON.stringify(selectedCohort)}
                        disabled={!allCohorts || allCohorts.length == 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState({
                                ...state,
                                selectedCohort: JSON.parse(e.target.value),
                                selectedAssociate: undefined
                            });
                            this.fetchAssociatesInSelectedCohort(JSON.parse(e.target.value));
                        }} >
                        <option value={undefined} style={{ display: 'none' }}>.....</option>
                        {cohortOptions}
                    </Input>
                </InputGroup>
                
                <span className="span-select-interview-associate">Select a Associate </span>
                <InputGroup className="new-interview-input-group">

                    {/* To choose different input types due to if user is an associate or not. */}
                    {this.props.currentUser.roles.length !== 0 ? 
                    <Input className='input-group-interview' type='select'
                        value={selectedAssociate ? JSON.stringify(selectedAssociate) : ''}
                        disabled={!associatesInSelectedCohort || associatesInSelectedCohort.length == 0}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setState({
                                ...state,
                                selectedAssociate: JSON.parse(e.target.value)
                            });
                        }} >
                        <option value={undefined} style={{ display: 'none' }}>.....</option>
                        {associateOptions}
                    </Input>
                    :
                    <Input className='input-group-interview' type='text' value={selectedAssociate ? 
                    selectedAssociate.firstName + ' ' + selectedAssociate.lastName : ''} readOnly>
                    </Input>}
                    {console.log(selectedAssociate)}

                </InputGroup>
                <span className="span-select-interview">Enter  or Select client name</span>
                <InputGroup className="new-interview-input-group">
                    <InputGroupAddon addonType="prepend">client</InputGroupAddon>
                    <Input type="text" placeholder="....." list="clients" value={client} onChange={(e) => { setState({ ...state, client: e.target.value }) }} />
                    <datalist id="clients">
                        {this.props.createInterviewComponentState.clientArr.map((ele: any) => (
                            <option value={ele.clientName} />
                        ))}
                    </datalist>
                </InputGroup>
                </div>


                <div className="col-md-6">
                <span className="span-select-interview">Select a Date </span>
                <InputGroup size="md" className="new-interview-input-group">
                    <InputGroupAddon addonType="prepend">date </InputGroupAddon>
                    <Input type="date" placeholder="date" value={this.state.date} onChange={this.updateDate} />
                </InputGroup>
                <span className="span-select-interview">Enter Time</span>
                <InputGroup size="md" className="new-interview-input-group">
                    <InputGroupAddon addonType="prepend">time </InputGroupAddon>
                    {/* so not done yet, trying to figure out how to deal with time*/}
                    <Input type="time" placeholder="time" min="8:00" max="20:00" value={this.state.time} onChange={this.updateTime}/>
                </InputGroup>
                <span className="span-select-interview">Enter a location</span>
                <InputGroup size="md" className="new-interview-input-group">
                    <InputGroupAddon addonType="prepend">location</InputGroupAddon>
                    <Input placeholder="....." value={location} onChange={(e) => { setState({ ...state, location: e.target.value })} } />
                </InputGroup>
                </div>
                </div>
                <br/>
                
                
                <Button color="secondary" size="lg" block disabled={buttonDisabledState} onClick={buttonOnClick}>{buttonText}</Button>
            </Form>
        </div>
        );
    }


}

const mapStateToProps = (state: IState) => ({
    createInterviewComponentState: state.interviewState.createInterviewComponentState,
    currentUser: state.managementState.currentSMSUser.currentSMSUser
});
const mapDispatchToProps = {
    setState: setCreateState
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateInterviewComponent));