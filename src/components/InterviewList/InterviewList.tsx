// #region Imports
import React from 'react';
import { connect } from 'react-redux';
import { getInterviewPages, markAsReviewed, setSelected } from '../../actions/interviewList/interviewList.actions';
import ReactPaginate from 'react-paginate'
import { IState } from '../../reducers';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { store } from '../../Store';
import ReviewButton from './ActionButtons/ReviewButton';
import moment from 'moment';
// #endregion 

// The following is imported from the reducer to accept filtering conditions and display interviews
export interface InterviewListProps {
    email: string,
    listOfInterviews: any[],
    numberOfPages: number,
    currentPage: number,
    pageSize: number,
    orderBy: string,
    direction: string,
    getInterviewPages: (
        pageNumber?: number,
        pageSize?: number,
        ordeyBy?: string,
        direction?: string,
        associateEmail?: string,
        managerEmail?: string,
        place?: string,
        clientName?: string,
        staging?: string) => void,
    markAsReviewed: (interviewId: number) => void,
    setSelected: (current: any) => void;
}

export interface InterviewListState { // state of table, its headings, and sorting options
    direction: string,
    loaded: boolean,
    tableHeaderId: string,
    previousTableHeaderId: string,
    listOfInterviews: any[],
    associateEmail: string,
    managerEmail: string,
    place: string,
    client: string,
    staging: string
}
// list of headers for table
const tableHeaderValues: object = 
{
    associateEmail: 'Associate Email',
    managerEmail: 'Manager Email',
    place: 'Location',
    client: 'Client',
    notified: 'Date Notified',
    scheduled: 'Date Scheduled',
    reviewed: 'Date Reviewed',
    associateInput: 'Associate Input',
    interviewFeedback: 'Interview Feedback'
}

export class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
        // initial state of the table and sorting values
        this.state = { 
            associateEmail: 'associateEmail',
            client: 'clientName',
            direction: this.props.direction,
            loaded: false,
            listOfInterviews: [],
            managerEmail: 'managerEmail',
            place: 'placeName',
            previousTableHeaderId: '1', // init diff values of tableHeaderId and previousTableHeaderId to start DESC sorting logic
            staging: 'stagingOff',
            tableHeaderId: '0'
        }
    }

    async componentDidMount() { // on render, load the interviews
        this.setState({
            listOfInterviews: this.props.listOfInterviews
        });
    }

    async componentWillReceiveProps(nextProps) { // Move props into state here
        this.setState({
            listOfInterviews: nextProps.listOfInterviews,
            //listOfInterviewsInitial: nextProps.listOfInterviews
        });
        
    }

    async componentDidUpdate() { // when the user messes with values, change the state
        console.log(this.state);

        if (!this.state.loaded) {
            this.setState({
                loaded: true
            });
            this.handlePageClick({ selected: this.props.currentPage });
        }
    }

    handlePageClick = (data) => { // runs when the page is clicked, change values displayed to what's in the state
        console.log(data);
        this.props.getInterviewPages(data.selected,
            this.props.pageSize,
            this.props.orderBy,
            this.props.direction,
            this.state.associateEmail,
            this.state.managerEmail,
            this.state.place,
            this.state.client,
            this.state.staging);
    }
    changeOrderCriteria = (event: any) => { // when triggered, run calls to back-end to alter how you sort
        // when a sorting value changes, wait for needed calls on a state change
        // store page ASC or DESC
        let previousTableHeaderId = this.state.previousTableHeaderId;
        let orderDirection;
        if (event.currentTarget.id === previousTableHeaderId) { //if click same header -> toggle ASC/DESC
            if (this.state.direction === 'ASC') {
                orderDirection = 'DESC'
            } else {
                orderDirection = 'ASC'
            }
        } else { // if click diff header -> sort ASC
            orderDirection = 'ASC'
        }
        previousTableHeaderId = event.currentTarget.id;
        this.props.getInterviewPages(
            0,
            this.props.pageSize,
            previousTableHeaderId,
            orderDirection,
            this.state.associateEmail,
            this.state.managerEmail,
            this.state.place,
            this.state.client,
            this.state.staging
        );
        this.setState({
            direction: orderDirection,
            previousTableHeaderId,
            tableHeaderId: event.currentTarget.id,
        });        
    }
    // generic filter that is called whenever user wants to filter results by a field
    filterChange = (event: any) => {

        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        // list of ternaries that check if the filter select box has changed, otherwise assume original state value
        const pageSize = (name === 'pageSize') ? value : this.props.pageSize;
        const associateEmail = (name === 'associateEmail') ? value : this.state.associateEmail;
        const managerEmail = (name === 'managerEmail') ? value : this.state.managerEmail;
        const place = (name === 'place') ? value : this.state.place;
        const client = (name === 'client') ? value : this.state.client;
        const staging = (name === 'staging') ? value : this.state.staging;
        this.setState({ // updates state accordingly
            associateEmail,
            client,
            managerEmail,
            place,
            staging,
        });
        this.props.getInterviewPages( // now that state has changed, update
            0,
            pageSize as number,
            this.props.orderBy,
            this.props.direction,
            associateEmail,
            managerEmail,
            // following 2 are ensuring that default values placeName and clientName are passed to the server,
            // it is named differently there
            place === 'place' ? 'placeName' : place,
            client === 'client' ? 'clientName' : client,
            staging);
    }

    renderDate = (date: number) => { // renders a data if one is returned, otherwise just a dash
        if (date > 0) {
            return moment(date).format('lll');
        } else {
            return '-';
        }
    }

    getAssocInput = (entry: any) => { // open component to associate input component
        let url = (entry.associateInput ? 'viewAssocInput' : 'associateInput');
        let text = (entry.associateInput ? 'View' : 'Add');
        return (
            <td>
                {
                    <Link onClick={e => {
                        this.props.setSelected(entry.associateInput);
                    }} to={{
                        pathname: `/interview/${url}`,
                        state: { interviewId: entry.id }
                    }} >{`${text} Associate Input`}
                    </Link>
                }
            </td>
        );
    };

    render() {
        const roles = (store.getState().managementState.auth.currentUser.roles);
        const isAdmin = (roles.includes('admin') || roles.includes('staging-manager') || roles.includes('trainer'));
        // map out the tableHeader values onto the actual object
        const thKeys = Object.keys(tableHeaderValues);
        const thValues = Object.values(tableHeaderValues);
        return (
            <div className='row'>
                <div>
                    <div className='table-responsive-xl'>
                        <table className='table table-striped mx-auto w-auto' id='interview-list-table'>
                            <thead className='rev-background-color'>
                                <tr>
                                    {isAdmin ? <th>Reviewed</th> : <></>/* will display only if user is an admin*/}
                                    {thKeys.map((element, index) => {
                                        return (<th id={element} key = {index} className='cursor-hover' onClick={this.changeOrderCriteria}>
                                            {thValues[index]}
                                            {this.state.tableHeaderId === element && this.state.direction === 'DESC' && 
                                            <IoIosArrowDown id = {element} className='cursor-hover' onClick={this.changeOrderCriteria} />}
                                            {this.state.tableHeaderId === element && this.state.direction === 'ASC' && 
                                            <IoIosArrowUp id = {element} className='cursor-hover' onClick={this.changeOrderCriteria} />}
                                        </th>)
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listOfInterviews.map((entry) => {
                                    return (<tr key={entry.id}>
                                        {/* Added isAdmin check before the review button to fix bug. Originally, checkbox was showing even when user wasn't admin.*/}
                                        {isAdmin ?
                                            <td><ReviewButton disabled={!isAdmin} interview={entry} assocInput={entry.associateInput || 'bleh'} /></td> : null}
                                        {thKeys.map((element, index) => {
                                            // check if element is a number, if it is then it's a date and should be rendered as such
                                            let modifiedElement = (isNaN(entry[element])) ? entry[element] : this.renderDate(entry[element]);
                                            // if element is an object, it's probably the client and we need their name, otherwise it can exist as is
                                            modifiedElement = (entry[element] instanceof Object) ? entry[element].clientName : modifiedElement;
                                            // return the table cell with the value coming back from the database. DO NOT return last 2 columns, as there is no data for them.
                                            return ((index < thKeys.length - 2) ? <td>{modifiedElement}</td> : null)
                                        })}
                                        {this.getAssocInput(entry)}
                                        <td>{ // Link to feedback component
                                            entry.feedback ?
                                                <Link to={{ pathname: "/interview/viewFeedback", state: { interviewId: entry.id } }}>Edit Interview Feedback</Link>
                                                :
                                                isAdmin ?
                                                    <Link to={{ pathname: `/interview/${entry.id}/feedback` }}>Complete Interview Feedback</Link>
                                                    :
                                                    <></>
                                        }</td>
                                    </tr>)
                                })}
                                <tr style={{ backgroundColor: '#f3a55d' }}>
                                    {isAdmin ? <td></td> : null/* will display only if user is an admin*/}
                                    {thKeys.map((element, keyIndex) => { // mapping out for every header value, it has a respective filter box
                                        const filterCurrentArrValues: string[] = []; // array for each header if there are duplicates in results so they aren't shown
                                        /* first 4 headers are the only ones we want users to filter by 
                                            Then it will create filter boxes for each of those headers.
                                            Option value display the table header as a default.
                                            Then we map through each interview, matching header keys to the associated values, and then displaying them on the table
                                            Below it we have a check of currentNestedEntry to ensure the entry is not an object, otherwise it must be on the client object
                                            Then another check if the current entry is already in the filterCurrentArrValues, it is ignored. Otherwise add to array, and print option value
                                        */
                                        return (keyIndex < 4 ? <td>
                                            <select onChange={this.filterChange} name={element}
                                                value={this.state[element]} className='form-control'>
                                                <option value={element}>{thValues[keyIndex]}</option>
                                                {this.props.listOfInterviews.map((entry, index) => {
                                                    const currentNestedEntry = (entry[element] instanceof Object) ? entry[element].clientName : entry[element];
                                                    if (!filterCurrentArrValues.includes(currentNestedEntry)) {
                                                        filterCurrentArrValues.push(currentNestedEntry);
                                                        return (<option value={currentNestedEntry} key={index}>{currentNestedEntry}</option>)
                                                    }
                                                    return;
                                                })}
                                            </select>
                                        </td> : null)
                                    })}
                                    <td colSpan={3}>
                                        <select onChange={this.filterChange} value={this.state.staging}
                                            name='staging' className='form-control'>
                                            <option value='stagingOff'>Staging Off</option>
                                            <option value='stagingOn'>Staging On</option>
                                        </select>
                                    </td>
                                    <td colSpan={2}>
                                        <select name='pageSize' onChange={this.filterChange} className='form-control'>
                                            <option value="" disabled selected hidden>Page</option>
                                            <option value={5} className={'justify-content-center'}>5</option>
                                            <option value={10} className={'justify-content-center'}>10</option>
                                            <option value={25} className={'justify-content-center'}>25</option>
                                            <option value={50} className={'justify-content-center'}>50</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                <ReactPaginate
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'page-item no-select justify-content-center'}
                    breakLinkClassName={'break-me-link page-link'}
                    pageCount={this.props.numberOfPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    forcePage={this.props.currentPage}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination page-navigator justify-content-center interview-list-table-paginate'}
                    activeClassName={'active'}
                    pageClassName={'page-item cursor-hover'}
                    pageLinkClassName={'paginate-link page-link no-select justify-content-center'}
                    nextClassName={'page-item cursor-hover'}
                    nextLinkClassName={'paginate-next page-link no-select justify-content-center'}
                    previousClassName={'page-item cursor-hover'}
                    previousLinkClassName={'paginate-previous page-link no-select justify-content-center'} />
            </div >
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        email: state.managementState.auth.currentUser.email,
        listOfInterviews: state.interviewState.interviewList.listOfInterviews,
        numberOfPages: state.interviewState.interviewList.numberOfPages,
        currentPage: state.interviewState.interviewList.currentPage,
        pageSize: state.interviewState.interviewList.pageSize,
        orderBy: state.interviewState.interviewList.orderBy,
        direction: state.interviewState.interviewList.direction
    }
}

const mapDispatchToProps = {
    getInterviewPages,
    markAsReviewed,
    setSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);