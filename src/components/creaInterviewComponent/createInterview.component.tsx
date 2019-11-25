import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
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
import { ICohort } from '../../model/users/ICohort';
import { IUser } from '../../model/users/IUser';
import { smsClient } from '../../axios/sms-clients';
import { managersClient } from '../../axios/sms-clients/managers-client';


interface ICreateInterviewComponentProps extends RouteComponentProps {
  createInterviewComponentState: ICreateInterviewComponentState;
  currentUser: IUser
  setState: (newCreateInterviewComponentState: ICreateInterviewComponentState) => void;
}

interface ICreateNewInterviewComponentState {
  // Because I cant get date and time individually alone and cant use props setState
  // to allow date and time to be pu tinto the props date
  date: string
  time: string
  managerEmail: string
}

class CreateInterviewComponent extends React.Component<ICreateInterviewComponentProps, ICreateNewInterviewComponentState> {
  // This should be DB call but we are hardcoding for now 
  locations = ['USF', 'Reston', 'WVU', 'UTA', 'CUNY'];

  state = {
    date: '',
    managerEmail: '',
    time: '',
  }

  componentDidMount() {
    // This will find all cohorts to check if any exist
    cohortClient.findAll().then((res) => {
      if (res.data) {
        this.props.setState({ ...this.props.createInterviewComponentState, allCohorts: res.data })
      }
    }).catch((e) => {
      console.trace();
      console.log(e);
    });
    // This will grab all the clients
    this.getAllClients();

    //
    smsClient.get(`/user-service/users/email/${this.props.currentUser.email}`).then((res) => {
      // function returns a page instead of just user, but due to being
      // just a big javascript object, can just grab username and password from it
      if (res.data) {
        this.props.setState({
          ...this.props.createInterviewComponentState,
          selectedAssociate: res.data
        })
      }
    }).catch((err) => {
      console.log(err)
    })

  }

  componentWillUpdate() {
    if (this.props.createInterviewComponentState.date !== (this.state.date + ' ' + this.state.time)) {
      this.createDate()
    }
  }

  getAllClients = async () => {
    const tempArr = await interviewClient.fetchClient();
    const clientArr: Client[] = await tempArr.data;

    this.props.setState({ ...this.props.createInterviewComponentState, clientArr });
  }


  fetchAssociatesInSelectedCohort = async (selectedCohort) => {
    const res = selectedCohort && await userClient.findAllByCohortId(selectedCohort.cohortId);
    if (res && res.data && this.props.currentUser.roles.length !== 0) {
      this.props.setState({
        ...this.props.createInterviewComponentState,
        associatesInSelectedCohort: res.data,
        selectedAssociate: undefined,
      })
    }
  }

  fetchCurrentUserName = async (currentEmail) => {
    let name
    const res = await smsClient.get(`/user-service/users/email/${currentEmail}`)
    name = res.data.firstName + ' ' + res.data.lastName
    return name
  }

  grabManagerEmail = async (alias) => {
    const res = await managersClient.findManagersByLocation(alias)
    this.setState({
      ...this.state,
      managerEmail: res.data[0].email
    })
  }

  sendInputToDB = async (): Promise<boolean> => {
    // { firstName:'', lastName:'', date:'', location:'', format:''}
    const { selectedAssociate, date: dateString, location, client } = this.props.createInterviewComponentState;
    if (selectedAssociate && dateString && location && client) {
      let newInterviewData: INewInterviewData
      await this.grabManagerEmail(location)
      // to tell if a user is an associate or not. if not, then managerEmail is blank and the endpoint will take care of that
      if (this.props.currentUser.roles.length === 0) {
        newInterviewData = {
          associateEmail: selectedAssociate.email,
          client,
          date: (new Date(dateString)).valueOf(),
          location,
          managerEmail: this.state.managerEmail,
        };
      } else {
        newInterviewData = {
          associateEmail: selectedAssociate.email,
          client,
          date: (new Date(dateString)).valueOf(),
          location,
          managerEmail: '',
        };
      }
      const res = await interviewClient.addNewInterview(newInterviewData)
      return (res.status >= 200 && res.status < 300);
    } else { return false; }
  }


  createDate = () => {
    const newDate = this.state.date + ' ' + this.state.time
    this.props.setState({
      ...this.props.createInterviewComponentState,
      date: newDate
    })
  }

  updateDate = (event) => {
    event.preventDefault()
    this.setState({
      ...this.state,
      date: event.target.value
    })
  }

  updateTime = (event) => {
    event.preventDefault()
    this.setState({
      ...this.state,
      time: event.target.value
    })
  }

  render() {

    const state = this.props.createInterviewComponentState;
    const setState = this.props.setState;
    const { allCohorts, selectedCohort, associatesInSelectedCohort, selectedAssociate, date, location, client } = state;
    const cohortOptions = allCohorts && allCohorts.map((val: ICohort) => {
      return <option value={JSON.stringify(val)} key={val.cohortId}>{val.cohortName}</option>
    })
    const associateOptions = (this.props.currentUser.roles.includes('staging-manager') || this.props.currentUser.roles.includes('admin')) && associatesInSelectedCohort && associatesInSelectedCohort.map((val: IUser) => {
      return <option value={JSON.stringify(val)} key={val.userId}>{`${val.firstName} ${val.lastName}`}</option>
    })

    // Button to submit when all input fields are filled out. (Disabled if all input not filled)
    const buttonDisabledState = !(selectedAssociate && date && location && client);
    const buttonText = (buttonDisabledState) ? "Please fill out all fields" : "SUBMIT";
    const buttonOnClick = async () => {
      const success = await this.sendInputToDB();
      if (success) { this.props.history.push("/interview/list"); }
    };

    return (
      <div id='new-interview-full'>

        <h4 className="create-interview-title">Setup</h4>
        <h3 className="create-interview-title2">New Interview</h3>
        <hr />
        <Form className="NewInterForm" >
          <div className="row">
            {/* Only show this column of fields if user has a defined role.
                Otherwise we will only render one column of fields defined after this block. */}
            {this.props.currentUser.roles.length !== 0 &&
              <div className="col-md-6">
                <span className="span-select-interview">Select a Cohort </span>
                <InputGroup className="new-interview-input-group">
                  <Input className='input-group-interview' type='select'
                    value={JSON.stringify(selectedCohort)}
                    disabled={!allCohorts || allCohorts.length === 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setState({
                        ...state,
                        selectedAssociate: undefined,
                        selectedCohort: JSON.parse(e.target.value),
                      });
                      this.fetchAssociatesInSelectedCohort(JSON.parse(e.target.value));
                    }} >
                    <option value={undefined} style={{ display: 'none' }}>.....</option>
                    {cohortOptions}
                  </Input>
                </InputGroup>
                {/* To choose different input types due to if user is an associate or not. */}
                <span className="span-select-interview-associate">Select a Associate </span>
                <InputGroup className="new-interview-input-group">
                  <Input className='input-group-interview' type='select'
                    value={selectedAssociate ? JSON.stringify(selectedAssociate) : ''}
                    disabled={!associatesInSelectedCohort || associatesInSelectedCohort.length === 0}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setState({
                        ...state,
                        selectedAssociate: JSON.parse(e.target.value)
                      });
                    }} >
                    <option value={undefined} style={{ display: 'none' }}>.....</option>
                    {associateOptions}
                  </Input>
                </InputGroup>
                <span className="span-select-interview">Enter or Select client name</span>
                <InputGroup className="new-interview-input-group">
                  <InputGroupAddon addonType="prepend">client</InputGroupAddon>
                  <Input type="text" placeholder="....." list="clients" value={client} onChange={(e) => { setState({ ...state, client: e.target.value }) }} />
                  <datalist id="clients">
                    {this.props.createInterviewComponentState.clientArr.map((ele: any, i: number) => (
                      <option value={ele.clientName} key={i} />
                    ))}
                  </datalist>
                </InputGroup>
              </div>}
            {/* Render single column if associate, two columns otherwise */}
            <div className={this.props.currentUser.roles.length === 0 ? "col-md-12" : "col-md-6"}>
              {/* Only render this field if user is an associate, otherwise
                  it's a copy of the above. */}
              {this.props.currentUser.roles.length === 0 &&
                <>
                  <span className="span-select-interview">Enter  or Select client name</span>
                  <InputGroup className="new-interview-input-group">
                    <InputGroupAddon addonType="prepend">client</InputGroupAddon>
                    <Input type="text" placeholder="....." list="clients" value={client} onChange={(e) => { setState({ ...state, client: e.target.value }) }} />
                    <datalist id="clients">
                      {this.props.createInterviewComponentState.clientArr.map((ele: any, index) => (
                        <option key={index} value={ele.clientName} />
                      ))}
                    </datalist>
                  </InputGroup>
                </>}
              <span className="span-select-interview">Select a Date </span>
              <InputGroup size="md" className="new-interview-input-group">
                <InputGroupAddon addonType="prepend">date </InputGroupAddon>
                <Input type="date" placeholder="date" value={this.state.date} onChange={this.updateDate} />
              </InputGroup>
              <span className="span-select-interview">Enter Time</span>
              <InputGroup size="md" className="new-interview-input-group">
                <InputGroupAddon addonType="prepend">time </InputGroupAddon>
                {/* so not done yet, trying to figure out how to deal with time*/}
                <Input type="time" placeholder="time" min="8:00" max="20:00" value={this.state.time} onChange={this.updateTime} />
              </InputGroup>
              <span className="span-select-interview">Enter a location</span>
              <InputGroup size="md" className="new-interview-input-group">
                <InputGroupAddon addonType="prepend">location</InputGroupAddon>
                <Input type='select' value={location} onChange={(e) => { setState({ ...state, location: e.target.value }) }}>
                  <option value={undefined} style={{ display: 'none' }}>.....</option>
                  {this.locations.map((loc: string, i: number) => (
                    <option value={loc} key={i}>{loc}</option>
                  ))}
                </Input>
              </InputGroup>
            </div>
          </div>
          <br />
          <Button color="secondary" size="lg" block disabled={buttonDisabledState} onClick={buttonOnClick}>{buttonText}</Button>
        </Form>
      </div >
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
