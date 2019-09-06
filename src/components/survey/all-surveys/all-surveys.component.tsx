import React, { Fragment, Component } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Table, Button } from 'reactstrap';
import { ISurvey } from '../../../model/surveys/survey.model';
import SurveyModal from './survey-assign-modal.component';
import { surveyClient } from '../../../axios/sms-clients/survey-client';
import { IAuthState } from '../../../reducers/management';
import { IState } from '../../../reducers';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';

interface IComponentProps extends RouteComponentProps<{}> {
    auth: IAuthState;
}

interface IComponentState {
    surveys: ISurvey[],
    surveysLoaded: boolean,
    surveysToAssign: number[],
    redirectTo: string | null,
    closingFilter: boolean,
    listFiltered: ISurvey[],
    title: string,
    description: string,
    filterOption: string,
    selectRow: string
}

export class AllSurveysComponent extends Component<IComponentProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
            surveysLoaded: false,
            surveysToAssign: [],
            redirectTo: null,
            closingFilter: false,
            listFiltered: [],
            title: "",
            description: "",
            filterOption: "Filter By",
            selectRow: 'rev-table-row'
        }
    }

    componentDidMount() {
        this.loadAllSurveys();
    }

    // When the user clicks a data button for a survey, redirect to the data page for that survey
    handleLoadSurveyData = (surveyId: number) => {
        this.setState({
            redirectTo: `/surveys/survey-data/${surveyId}`
        })
    }

    // When the user clicks a users button for a survey, redirect to the respondents page for that survey
    loadSurveyRespondents = (surveyId: number) => {
        this.setState({
            redirectTo: `/surveys/respondents-data/${surveyId}`
        })
    }

     // Added this code because I was having issues accessing this property in a later function
     // Used to return closing date by the index provided in the array that is passed
    getClosingDate = (array, index) => {
        return array[index].closingDate;
    }

    // Purpose of this function is to set a property of the state to only the surveys whose closing dates have passed
    returnPassedSurveys = (arr) => {
        let closingSurvey = arr;
        let filtered:ISurvey[] = [];
        for(let i = 0; i < closingSurvey.length; i++) {
            if(closingSurvey[i].closingDate !== null) {
                if(new Date(closingSurvey[i].closingDate) < new Date()) {
                    filtered.push(closingSurvey[i]);
                }
            }
        }
        this.setState({
            listFiltered: filtered
        });
    }

    // Returns surveys that are still active and sets the listFiltered array to this data.
    returnActiveSurveys = (arr) => {
        let activeSurvey = arr;
        let filtered:ISurvey[] = [];
        filtered = activeSurvey.filter((survey) => {
            if(new Date(survey.closingDate) > new Date()){
                return true;
            } else if(survey.closingDate === null){
                return true;
            }
            return false;
        });
        this.setState({
            listFiltered: filtered
        });
    }

    // Function called when user filters surveys by closing date if surveys had passed.
    // Sets a boolean check to decide whether a filtered or non-filtered list is rendered
    filterListByClosing = () => {
        this.setState({
            closingFilter: true,
            filterOption: "Closed"
        });
        console.log("In filter list by closing");
        this.returnPassedSurveys(this.state.surveys);
    }

    // Function called when user filters surveys by closing date if surveys are still active.
    // Sets a boolean check to decide whether a filtered or non-filtered list is rendered
    filterListByActive = () => {
        this.setState({
            closingFilter: true,
            filterOption: "Active"
        });
        this.returnActiveSurveys(this.state.surveys);
    }

    // Method used to remove filter from data list
    unFilterList = () => {
        this.setState({
            closingFilter: false,
            filterOption: "Filter By"
        });
    }

    checkFunc = (e) => {
        // const { checked } = e.target;
        const id = e;

        // if (checked) {
            if (!this.state.surveysToAssign.includes(id)) {
                this.setState({
                    surveysToAssign: [...this.state.surveysToAssign, id]
                });
            }
        // } else {
            if (this.state.surveysToAssign.includes(id)) {
                this.setState({
                    surveysToAssign: this.state.surveysToAssign.filter((surveyId) => {
                        return surveyId !== id
                    })
                });
            }
        // }
    }

    checkBoxFunc = (e) => {
        const { checked } = e.target;
        const id = e;

        if (checked) {
            if (!this.state.surveysToAssign.includes(id)) {
                this.setState({
                    surveysToAssign: [...this.state.surveysToAssign, id]
                });
            }
        } else {
            if (this.state.surveysToAssign.includes(id)) {
                this.setState({
                    surveysToAssign: this.state.surveysToAssign.filter((surveyId) => {
                        return surveyId !== id
                    })
                });
            }
        }
    }
// this function set the state after the input box has been unselected after this, 

    setTitleChange = async (event) => {
        this.setState({
            title: event.target.value
        });
    }
// the getsurvey button would sent the state to the surveyClient as parameter
    getSurveysByTitle = async (event) => {
        event.preventDefault();
        if (this.state.title) {
            const surveyByTitle = await surveyClient.findSurveyByTitle(this.state.title);
            this.setState({
                surveys: surveyByTitle.data,
                surveysLoaded: true
            });
        }
        else { this.loadAllSurveys(); }
    }

    // this function set the state after the input box has been unselected after this, 
    setDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    // the getdescription button would sent the state to the surveyClient as paramerter
    getSurveysByDescription = async (event) => {
        event.preventDefault();
        if (this.state.description) {
            const surveyByDescription = await surveyClient.findSurveyByDescription(this.state.description);
            this.setState({
                surveys: surveyByDescription.data,
                surveysLoaded: true
            });
        }
        else {
            this.loadAllSurveys();
        }
    }

    // Load the surveys into the state
    loadAllSurveys = async () => {
        const allSurveys = await surveyClient.findAllSurveys();
        this.setState({
            surveys: allSurveys,
            surveysLoaded: true
        })
    }

    // Used to route user filter selection to appropriate function
    filterCheck = (e) => {
        const {id:option} = e.target;
        switch(option){
            case "Active":
                this.filterListByActive();
                break;
            case "Closed":
                this.filterListByClosing();
                break;
            case "None":
                this.unFilterList();
            default:
                break;
        }
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect push to={this.state.redirectTo} />
        }
        console.log(this.state.surveys);
        const sortOptions = ["Active", "Closed", "None"];
        return (
            <>
                {this.state.surveysLoaded ? (
                    <Fragment>
                        
                            <div className="filterSelect">
                                <div className="dropdown userDropdown">
                                    <Button className="btn userDropdownBtn dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sort By
                                    </Button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <ul className="list-group">
                                        { 
                                            sortOptions.map(option => (
                                                <li id={option} key={option} className="list-group-item option-box" onClick={(e) => this.filterCheck(e)}>{option}</li>
                                            ))
                                        }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                                <Table striped id="manage-users-table" className="tableUsers">
                                    <thead className="rev-background-color">
                                        <tr>
                                            <th>Select</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Date Created</th>
                                            <th>Closing Date</th>
                                            <th>Analytics</th>
                                            <th>Respondents</th>
                                        </tr>
                                        {(this.state.surveys.length > 0) &&
                                        <tr style={secondHeadFilter}>
                                            <td></td>
                                            <td>

                                                <div className="inputWrapper">

                                                    <input type="text" id="inputTItle" name="title"
                                                        className="inputBox form-control" placeholder="Title"
                                                        value={this.state.title} onChange={this.setTitleChange} />
                                                    <button type="submit" className="btn btn-success searchbtn" onClick={this.getSurveysByTitle}>o</button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="inputWrapper">

                                                    <input type="text" id="inputDescription" name="description"
                                                        className=" inputBox form-control" placeholder="Description"
                                                        value={this.state.description} onChange={this.setDescriptionChange} />
                                                    <button type="submit" className="btn btn-success searchbtn" onClick={this.getSurveysByDescription}>o</button>
                                                </div>
                                            </td>
                                            <td>
                                                {/* <DatePicker
                                                    onChange={this.getDateCreated}
                                                    value={this.state.createdDate}
                                                /> */}
                                            </td>

                                            <td>
                                                {/* <DatePicker
                                                    onChange={this.getDateClosed}
                                                    value={this.state.endDate}
                                                /> */}
                                            </td>

                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        }
                                    </thead>  
                                    <tbody>
                                        {(!this.state.surveys || !(this.state.surveys.length))? 
                                        
                                            <tr className="rev-table-row">
                                            <td colSpan={8} ><div className='div-center fadeInUp'>You don't have any surveys. <>
                                         {console.log("I HAPPEN")}   
                                        </></div></td>
                                            </tr>
                                            :<>
                                        {!this.state.closingFilter ? this.state.surveys.map(survey => (             // This.state.surveys is rendered if there is no filter
                                        <tr key={survey.surveyId} className={this.state.surveysToAssign.includes(survey.surveyId) ? 'rev-table-row-active' :'rev-table-row'} onClick={e => this.checkFunc(survey.surveyId)}>
                                            <td><input type="checkbox" className="userDropInput" onChange={e=>this.checkBoxFunc(e)} checked={!!this.state.surveysToAssign.includes(survey.surveyId)} id={survey.surveyId.toString()} /></td> 
                                            <td>{survey.title}</td>
                                            <td>{survey.description}</td>
                                            <td>{survey.dateCreated && new Date(survey.dateCreated).toDateString()}</td>
                                            <td>{survey.closingDate && new Date(survey.closingDate).toDateString()}</td>
                                            {/* <td>{survey.published ? 'Yes' : 'No'}</td> */}
                                            <td><Button className='assignSurveyBtn' onClick={() =>
                                                this.handleLoadSurveyData(survey.surveyId)}>Data</Button></td>
                                            <td><Button className='assignSurveyBtn' onClick={() =>
                                                this.loadSurveyRespondents(survey.surveyId)}>Status</Button></td>
                                        </tr>
                                    ))
                                    : 
                                    this.state.listFiltered.map(filtered => (                           // This.state.listFiltered is rendered if there is a filter.
                                        <tr key={filtered.surveyId} className={this.state.surveysToAssign.includes(filtered.surveyId) ? 'rev-table-row-active' :'rev-table-row'} onClick={e => this.checkFunc(filtered.surveyId)}>
                                            <td><input type="checkbox" className="userDropInput" onChange={e=>this.checkBoxFunc(e)} checked={!!this.state.surveysToAssign.includes(filtered.surveyId)} id={filtered.surveyId.toString()} /></td>
                                            <td>{filtered.title}</td>
                                            <td>{filtered.description}</td>
                                            <td>{filtered.dateCreated && new Date(filtered.dateCreated).toDateString()}</td>
                                            <td>{filtered.closingDate && new Date(filtered.closingDate).toDateString()}</td>
                                            {/* <td>{filtered.published ? 'Yes' : 'No'}</td> */}
                                            <td><Button className='assignSurveyBtn' onClick={() =>
                                                this.handleLoadSurveyData(filtered.surveyId)}>Data</Button></td>
                                            <td><Button className='assignSurveyBtn' onClick={() =>
                                                this.loadSurveyRespondents(filtered.surveyId)}>Status</Button></td>
                                        </tr>
                                    ))}
                                    </>}
                                    </tbody>
                                </Table>
                                {(this.state.surveys.length > 0) &&
                                <div className="assignButtonDiv">
                                    <SurveyModal
                                        buttonLabel='Assign To Cohorts'
                                        surveysToAssign={this.state.surveysToAssign} />
                                </div>
                                }
                            
                    </Fragment>
                ) : (
                        <Loader/>
                    )}
            </>
        );
    }
}

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(AllSurveysComponent);

const secondHeadFilter = {
    width: '100%',
    background: 'white'
}