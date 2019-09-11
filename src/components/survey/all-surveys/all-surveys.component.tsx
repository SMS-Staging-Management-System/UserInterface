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
import { FaSearch } from 'react-icons/fa';

interface IComponentProps extends RouteComponentProps<{}> {
  auth: IAuthState;
}

interface IComponentState {
  surveys: ISurvey[];
  surveysLoaded: boolean;
  surveysToAssign: number[];
  redirectTo: string | null;
  closingFilter: boolean;
  listFiltered: ISurvey[];
  title: string;
  description: string;
  filterOption: string;
  selectRow: string;
  pageNumber: number;
  totalPages: number;
  value: any;
  sortedBy: string;
}

export class AllSurveysComponent extends Component<
  IComponentProps,
  IComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      surveys: [],
      surveysLoaded: false,
      surveysToAssign: [],
      redirectTo: null,
      closingFilter: false,
      listFiltered: [],
      title: '',
      description: '',
      filterOption: 'Filter By',
      selectRow: 'rev-table-row',
      value: 1,
      pageNumber: 1,
      totalPages: 1,
      sortedBy: 'Sort by',
    };
  }

  componentDidMount() {
    this.loadAllSurveys(1);
  }

  getCreatorSurveys = async creator => {};

  findMySurveys = async (page: number) => {
    const req = await surveyClient.findAllSurveysByCreator(
      this.props.auth.currentUser.email,
      page - 1,
    );
    this.setState({
      ...this.state,
      surveys: req.content,
      pageNumber: page,
      totalPages: req.totalPages,
      surveysLoaded: true,
    });
  };

  // When the user clicks a data button for a survey, redirect to the data page for that survey
  handleLoadSurveyData = (surveyId: number) => {
    this.setState({
      redirectTo: `/surveys/survey-data/${surveyId}`,
    });
  };

  // When the user clicks a users button for a survey, redirect to the respondents page for that survey
  loadSurveyRespondents = (surveyId: number) => {
    this.setState({
      redirectTo: `/surveys/respondents-data/${surveyId}`,
    });
  };

  // Function called when user filters surveys by closing date if surveys are still active.
  // Sets a boolean check to decide whether a filtered or non-filtered list is rendered
  filterListByActiveOrClosed = async (isActive: string, page: number) => {
    const resp = await surveyClient.findActiveOrClosedSurveys(
      isActive,
      page - 1,
    );
    this.setState({
      ...this.state,
      surveys: resp.content,
      pageNumber: page,
      totalPages: resp.totalPages,
      surveysLoaded: true,
    });
  };

  checkFunc = e => {
    // const { checked } = e.target;
    const id = e;

    // if (checked) {
    if (!this.state.surveysToAssign.includes(id)) {
      this.setState({
        surveysToAssign: [...this.state.surveysToAssign, id],
      });
    }
    // } else {
    if (this.state.surveysToAssign.includes(id)) {
      this.setState({
        surveysToAssign: this.state.surveysToAssign.filter(surveyId => {
          return surveyId !== id;
        }),
      });
    }
    // }
  };

  checkBoxFunc = e => {
    const { checked } = e.target;
    const id = e;

    if (checked) {
      if (!this.state.surveysToAssign.includes(id)) {
        this.setState({
          surveysToAssign: [...this.state.surveysToAssign, id],
        });
      }
    } else {
      if (this.state.surveysToAssign.includes(id)) {
        this.setState({
          surveysToAssign: this.state.surveysToAssign.filter(surveyId => {
            return surveyId !== id;
          }),
        });
      }
    }
  };
  // this function set the state after the input box has been unselected after this,

  setTitleChange = async event => {
    this.setState({
      title: event.target.value,
    });
  };
  // the getsurvey button would sent the state to the surveyClient as parameter
  getSurveysByTitle = async event => {
    event.preventDefault();
    if (this.state.title) {
      const surveyByTitle = await surveyClient.findSurveyByTitle(
        this.state.title,
      );
      this.setState({
        surveys: surveyByTitle.data,
        surveysLoaded: true,
      });
    } else {
      this.loadAllSurveys(1);
    }
  };

  // this function set the state after the input box has been unselected after this,
  setDescriptionChange = event => {
    this.setState({
      description: event.target.value,
    });
  };

  // the getdescription button would sent the state to the surveyClient as paramerter
  getSurveysByDescription = async event => {
    event.preventDefault();
    if (this.state.description) {
      const surveyByDescription = await surveyClient.findSurveyByDescription(
        this.state.description,
      );
      this.setState({
        surveys: surveyByDescription.data,
        surveysLoaded: true,
      });
    } else {
      this.loadAllSurveys(1);
    }
  };

  // Load the surveys into the state
  loadAllSurveys = async (page: any) => {
    const allSurveys = await surveyClient.findAllSurveys(page - 1);
    this.setState({
      surveys: allSurveys.content,
      pageNumber: page,
      totalPages: allSurveys.totalPages,
      surveysLoaded: true,
    });
  };

  // Used to route user filter selection to appropriate function
  filterCheck = e => {
    const { id: option } = e.target;
    this.setState({
      ...this.state,
      sortedBy: option,
    });
    switch (option) {
      case 'Active':
        this.filterListByActiveOrClosed('true', 1);
        break;
      case 'Closed':
        this.filterListByActiveOrClosed('false', 1);
        break;
      case 'None':
        this.loadAllSurveys(1);
        break;
      case 'My Surveys':
        this.findMySurveys(1);
      default:
        break;
    }
  };

  render() {
    if (this.state.redirectTo) {
      return <Redirect push to={this.state.redirectTo} />;
    }
    const sortOptions = ['Active', 'Closed', 'My Surveys', 'None'];
    return (
      <>
        {this.state.surveysLoaded ? (
          <Fragment>
            <div className='filterSelect'>

              <div className='dropdown userDropdown'>
                {this.state.surveys.length > 0 && (
                  <span className='assignToCohorts'>
                    <SurveyModal
                      buttonLabel='Assign To Cohorts'
                      surveysToAssign={this.state.surveysToAssign}
                    />
                  </span>
                )}

                <Button
                  className='btn userDropdownBtn2 dropdown-toggle'
                  type='button'
                  id='allSurveysDropdownMenu'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'>
                  <span className='sortedByText'>{this.state.sortedBy}</span>
                </Button>
                <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
                  <ul className='list-group'>
                    {sortOptions.map(option => (
                      <li
                        id={option}
                        key={option}
                        className='list-group-item option-box'
                        onClick={e => this.filterCheck(e)}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Table striped id='manage-users-table' className='tableUsers'>
              <thead className='rev-background-color'>
                <tr>
                  <th>Select</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created</th>
                  <th>Closed</th>
                  <th></th>
                  <th>Analytics</th>
                  <th>Respondents</th>
                </tr>
                {this.state.surveys.length > 0 && (
                  <tr style={secondHeadFilter}>
                    <td></td>
                    <td>
                      <div className='inputWrapper'>
                        <input
                          type='text'
                          id='inputTItle'
                          name='title'
                          className='inputBox form-control'
                          placeholder='Title'
                          value={this.state.title}
                          onChange={this.setTitleChange}
                        />
                        <button
                          type='submit'
                          className='btn btn-success searchbtn'
                          onClick={this.getSurveysByTitle}>
                          <FaSearch />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className='inputWrapper'>
                        <input
                          type='text'
                          id='inputDescription'
                          name='description'
                          className=' inputBox form-control'
                          placeholder='Description'
                          value={this.state.description}
                          onChange={this.setDescriptionChange}
                        />
                        <button
                          type='submit'
                          className='btn btn-success searchbtn'
                          onClick={this.getSurveysByDescription}>
                          <FaSearch />
                        </button>
                      </div>
                    </td>

                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                )}
              </thead>
              <tbody>
                {!this.state.surveys || !this.state.surveys.length ? (
                  <tr className='rev-table-row'>
                    <td colSpan={8}>
                      <div className='div-center fadeInUp'>
                        You don't have any surveys.{' '}
                        <>{console.log('I HAPPEN')}</>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {!this.state.closingFilter
                      ? this.state.surveys.map((
                          survey, // This.state.surveys is rendered if there is no filter
                        ) => (
                          <tr
                            key={survey.surveyId}
                            className={
                              this.state.surveysToAssign.includes(
                                survey.surveyId,
                              )
                                ? 'rev-table-row-active'
                                : 'rev-table-row'
                            }
                            onClick={e => this.checkFunc(survey.surveyId)}>
                            <td>
                              <input
                                type='checkbox'
                                className='userDropInput'
                                onChange={e => this.checkBoxFunc(e)}
                                checked={this.state.surveysToAssign.includes(
                                  survey.surveyId,
                                )}
                                id={survey.surveyId.toString()}
                              />
                            </td>
                            <td>{survey.title}</td>
                            <td>{survey.description}</td>
                            <td>
                              {survey.dateCreated &&
                                new Date(survey.dateCreated).toDateString()}
                            </td>
                            <td>
                              {survey.closingDate &&
                                new Date(survey.closingDate).toDateString()}
                            </td>
                            <td></td>
                            <td>
                              <Button
                                className='assignSurveyBtn'
                                onClick={() =>
                                  this.handleLoadSurveyData(survey.surveyId)
                                }>
                                Data
                              </Button>
                            </td>
                            <td>
                              <Button
                                className='assignSurveyBtn'
                                onClick={() =>
                                  this.loadSurveyRespondents(survey.surveyId)
                                }>
                                Status
                              </Button>
                            </td>
                          </tr>
                        ))
                      : this.state.listFiltered.map((
                          filtered, // This.state.listFiltered is rendered if there is a filter.
                        ) => (
                          <tr
                            key={filtered.surveyId}
                            className={
                              this.state.surveysToAssign.includes(
                                filtered.surveyId,
                              )
                                ? 'rev-table-row-active'
                                : 'rev-table-row'
                            }
                            onClick={e => this.checkFunc(filtered.surveyId)}>
                            <td>
                              <input
                                type='checkbox'
                                className='userDropInput'
                                onChange={e => this.checkBoxFunc(e)}
                                checked={this.state.surveysToAssign.includes(
                                  filtered.surveyId,
                                )}
                                id={filtered.surveyId.toString()}
                              />
                            </td>
                            <td>{filtered.title}</td>
                            <td>{filtered.description}</td>
                            <td>
                              {filtered.dateCreated &&
                                new Date(filtered.dateCreated).toDateString()}
                            </td>
                            <td>
                              {filtered.closingDate &&
                                new Date(filtered.closingDate).toDateString()}
                            </td>
                            <td></td>
                            <td>
                              <Button
                                className='assignSurveyBtn'
                                onClick={() =>
                                  this.handleLoadSurveyData(filtered.surveyId)
                                }>
                                Data
                              </Button>
                            </td>
                            <td>
                              <Button
                                className='assignSurveyBtn'
                                onClick={() =>
                                  this.loadSurveyRespondents(filtered.surveyId)
                                }>
                                Status
                              </Button>
                            </td>
                          </tr>
                        ))}
                  </>
                )}
              </tbody>
            </Table>
            <div
              hidden={this.state.totalPages === 1}
              className='row horizontal-centering vertical-centering'>
              {this.state.sortedBy === 'My Surveys' && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() => this.findMySurveys(this.state.pageNumber - 1)}
                  disabled={this.state.pageNumber === 1}>
                  Prev
                </Button>
              )}
              {(this.state.sortedBy === 'None' ||
                this.state.sortedBy === 'Sort by') && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() => this.loadAllSurveys(this.state.pageNumber - 1)}
                  disabled={this.state.pageNumber === 1}>
                  Prev
                </Button>
              )}
              {this.state.sortedBy === 'Active' && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() =>
                    this.filterListByActiveOrClosed(
                      'true',
                      this.state.pageNumber - 1,
                    )
                  }
                  disabled={this.state.pageNumber === 1}>
                  Prev
                </Button>
              )}
              {this.state.sortedBy === 'Closed' && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() =>
                    this.filterListByActiveOrClosed(
                      'false',
                      this.state.pageNumber - 1,
                    )
                  }
                  disabled={this.state.pageNumber === 1}>
                  Prev
                </Button>
              )}
              <h6 className='div-child text-style'>
                {/* Page 1 of 3 */}
                Page {this.state.pageNumber} of {this.state.totalPages}
                {/* {this.props.totalPages} */}
              </h6>
              {this.state.sortedBy === 'My Surveys' && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() => this.findMySurveys(this.state.pageNumber + 1)}
                  disabled={this.state.pageNumber === this.state.totalPages}>
                  Next
                </Button>
              )}
              {(this.state.sortedBy === 'None' ||
                this.state.sortedBy === 'Sort by') && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() => this.loadAllSurveys(this.state.pageNumber + 1)}
                  disabled={this.state.pageNumber === this.state.totalPages}>
                  Next
                </Button>
              )}
              {this.state.sortedBy === 'Active' && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() =>
                    this.filterListByActiveOrClosed(
                      'true',
                      this.state.pageNumber + 1,
                    )
                  }
                  disabled={this.state.pageNumber === this.state.totalPages}>
                  Next
                </Button>
              )}
              {this.state.sortedBy === 'Closed' && (
                <Button
                  variant='button-color'
                  className='rev-background-color div-child'
                  onClick={() =>
                    this.filterListByActiveOrClosed(
                      'false',
                      this.state.pageNumber + 1,
                    )
                  }
                  disabled={this.state.pageNumber === this.state.totalPages}>
                  Next
                </Button>
              )}
            </div>
          </Fragment>
        ) : (
          <Loader />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  auth: state.managementState.auth,
});

export default connect(mapStateToProps)(AllSurveysComponent);

const secondHeadFilter = {
  width: '100%',
  background: 'white',
};
