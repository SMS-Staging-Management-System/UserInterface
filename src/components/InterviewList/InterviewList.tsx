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
import { FaSistrix } from 'react-icons/fa';
import ReviewButton from './ActionButtons/ReviewButton';
import { InputGroup } from 'react-bootstrap';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import Input from 'reactstrap/lib/Input';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
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
    clientName: string,
    fromNotified: string,
    toNotified: string,
    fromScheduled: string,
    toScheduled: string,
    fromReviewed: string,
    toReviewed: string,
    client: string,
    staging: string
}
// Two arrays to arrange table headers. Originally the two were defined as a key-value pair object.
const thKeys = ['associateEmail', 'managerEmail', 'place', 'client', 'notified',
                 'scheduled', 'reviewed', 'associateInput', 'interviewFeedback'];  
const thValues = ['Associate Email', 'Manager Email', 'Location', 'Client', 'Date Notified',
                 'Date Scheduled', 'Date Reviewed', 'Associate Input', 'Interview Feedback'];
const justifyCenter = 'justify-content-center';
const pageItemCursorHover = 'page-item cursor-hover'

export class InterviewList extends React.Component<InterviewListProps, InterviewListState> {

    constructor(props: InterviewListProps) {
        super(props);
        // initial state of the table and sorting values
        this.state = { 
            associateEmail: 'associateEmail',
            client: 'clientName',
            clientName: 'clientName',
            direction: this.props.direction,
            fromNotified: '',
            fromReviewed: '',
            fromScheduled: '',
            listOfInterviews: [],
            loaded: false,
            managerEmail: 'managerEmail',
            place: 'placeName',
            previousTableHeaderId: '1', // init diff values of tableHeaderId and previousTableHeaderId to start DESC sorting logic
            staging: 'stagingOff',
            tableHeaderId: '0',
            toNotified: '',
            toReviewed: '',
            toScheduled: '',
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
        });
        
    }

    async componentDidUpdate() { // when the user messes with values, change the state
        if (!this.state.loaded) {
            this.setState({
                loaded: true
            });
            this.handlePageClick({ selected: this.props.currentPage });
        }
    }

    handlePageClick = (data) => { // runs when the page is clicked, change values displayed to what's in the state
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
        if (event.currentTarget.id === previousTableHeaderId) { // if click same header -> toggle ASC/DESC
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

    updateDate = (event: any) => {
        event.preventDefault()
        this.setState({
        ...this.state,
        [event.target.name]: event.target.value
        })
    }

    renderDate = (date: number) => { // renders a data if one is returned, otherwise just a dash
        // end jons group
        if (date > 0) {
            return moment(date).format('lll');
        } else {
            return '-';
        }
    }

    getAssocInput = (entry: any) => { // open component to associate input component
        const url = (entry.associateInput ? 'viewAssocInput' : 'associateInput');
        const text = (entry.associateInput ? 'View' : 'Add');
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
        // convert interview array to place array
        const arrPlace = this.props.listOfInterviews
            .map((item) => item.place)
            .filter((item, pos) => arrPlace.indexOf(item) === pos);
        // convert interview array to client array
        const arrClientName = this.props.listOfInterviews
            .map((item) => item.client.clientName)
            .filter((item, pos) => arrClientName.indexOf(item) === pos);

        return (
            <div className='container'>
                <div className='row'>
                    <div>
                        <div className='table-responsive-xl'>
                            <table className='table table-striped mx-auto w-auto'>
                                <thead className='rev-background-color'>
                                    <tr>
                                        {isAdmin ? <th>Reviewed</th> : <></>}
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
                                <tr>
                                    {isAdmin ? <td></td> : <></>}
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                        <div>
                                            <span style={{ position: 'absolute', zIndex: 2, display: 'block' }}><FaSistrix /></span>
                                            <input name='associateEmail' type="text" placeholder="Associate Email" style={{ paddingLeft: '1rem' }} className='form-control'
                                                onChange={this.filterChange} value={this.state.associateEmail === 'associateEmail' ? '' : this.state.associateEmail}></input>
                                        </div>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                        <div>
                                            <span style={{ position: 'absolute', zIndex: 2, display: 'block' }}><FaSistrix /></span>
                                            <input name='managerEmail' type="text" placeholder="Managaer Email" style={{ paddingLeft: '1rem' }} className='form-control'
                                                onChange={this.filterChange} value={this.state.managerEmail === 'managerEmail' ? '' : this.state.managerEmail}></input>
                                        </div>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                        <select name='place' onChange={this.filterChange} value={this.state.place} className='form-control'>
                                            <option value='placeName'>Location</option>
                                            {arrPlace.map((entry, index) => {
                                                return (<option value={entry} key={index}>{entry}</option>);
                                            })}
                                        </select>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                        <select name='client' onChange={this.filterChange} value={this.state.clientName} className='form-control'>
                                            <option value='clientName'>Client</option>
                                            {arrClientName.map((entry, index) => {
                                                return (<option value={entry} key={index}>{entry}</option>);
                                            })}
                                        </select>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                            <button className="btn rev-btn-2" type="button" id="dateNotified">
                                                Notified
                                            </button> 
                                            <UncontrolledPopover trigger="legacy" placement="bottom" target="dateNotified">
                                                <PopoverBody>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">From</InputGroupAddon>
                                                        <Input type="date" name="fromNotified" onChange={this.updateDate}></Input>
                                                        </InputGroup>
                                                        <InputGroup>
                                                        <InputGroupAddon addonType="prepend">To</InputGroupAddon>
                                                        <Input type="date" name="toNotified" onChange={this.updateDate}></Input>
                                                    </InputGroup>
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                            <button className="btn rev-btn-2" type="button" id="dateScheduled">
                                                Scheduled
                                            </button> 
                                            <UncontrolledPopover trigger="legacy" placement="bottom" target="dateScheduled">
                                                <PopoverBody>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">From</InputGroupAddon>
                                                        <Input type="date" name="fromScheduled" onChange={this.updateDate}></Input>
                                                        </InputGroup>
                                                        <InputGroup>
                                                        <InputGroupAddon addonType="prepend">To</InputGroupAddon>
                                                        <Input type="date" name="toScheduled" onChange={this.updateDate}></Input>
                                                    </InputGroup>
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse'}}>
                                            <button className="btn rev-btn-2" type="button" id="dateReviewed">
                                                Reviewed
                                            </button> 
                                            <UncontrolledPopover trigger="legacy" placement="bottom" target="dateReviewed">
                                                <PopoverBody>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">From</InputGroupAddon>
                                                        <Input type="date" name="fromReviewed" onChange={this.updateDate}></Input>
                                                        </InputGroup>
                                                        <InputGroup>
                                                        <InputGroupAddon addonType="prepend">To</InputGroupAddon>
                                                        <Input type="date" name="toReviewed" onChange={this.updateDate}></Input>
                                                    </InputGroup>
                                                </PopoverBody>
                                            </UncontrolledPopover>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                        <select name='{element}' onChange={this.filterChange} className='form-control' >
                                            <option value='dateNotified'>Associate Input</option>
                                            <option value='with'>With Associate Input</option>
                                            <option value='without'>Without Associate Input</option>
                                        </select>
                                    </td>
                                    <td style={{ margin: 0, padding: 0, borderCollapse: 'collapse' }}>
                                        <select name='{element}' onChange={this.filterChange} className='form-control'>
                                            <option value='dateNotified'>Interview Feedback</option>
                                            <option value='with'>With Interview Feedback</option>
                                            <option value='without'>Without Interview Feedback</option>
                                        </select>
                                    </td>
                                </tr> 
                                <tbody>
                                    {this.state.listOfInterviews.map((entry) => {
                                        return (<tr key={entry.id}>
                                            <td><ReviewButton disabled={isAdmin} interview={entry} assocInput={entry.associateInput || 'bleh'} /></td>
                                            <td>{entry.associateEmail}</td>
                                            <td>{entry.managerEmail}</td>
                                            <td>{entry.place}</td>
                                            <td>{entry.client.clientName}</td>
                                            <td>{this.renderDate(entry.notified)}</td>
                                            <td>{this.renderDate(entry.scheduled)}</td>
                                            <td>{this.renderDate(entry.reviewed)}</td>
                                            {this.getAssocInput(entry)}
                                            <td>{
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
                                </tbody>
                                <tfoot >
                                </tfoot>
                            </table>
                            <div className='col-0.5' style={{ width: '10%' }}>
                                <select name='pageSize' onChange={this.filterChange} className='form-control'>
                                    <option value="" disabled selected hidden>Page</option>
                                    <option value={5} className={justifyCenter}>5</option>
                                    <option value={10} className={justifyCenter}>10</option>
                                    <option value={25} className={justifyCenter}>25</option>
                                    <option value={50} className={justifyCenter}>50</option>
                                </select>
                            </div>
                        </div>
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
                    pageClassName={pageItemCursorHover}
                    pageLinkClassName={'paginate-link page-link no-select justify-content-center'}
                    nextClassName={pageItemCursorHover}
                    nextLinkClassName={'paginate-next page-link no-select justify-content-center'}
                    previousClassName={pageItemCursorHover}
                    previousLinkClassName={'paginate-previous page-link no-select justify-content-center'} />
            </div >
        );
    }
}

const mapStateToProps = (state: IState) => {
    return {
        currentPage: state.interviewState.interviewList.currentPage,
        direction: state.interviewState.interviewList.direction,
        email: state.managementState.auth.currentUser.email,
        listOfInterviews: state.interviewState.interviewList.listOfInterviews,
        numberOfPages: state.interviewState.interviewList.numberOfPages,
        orderBy: state.interviewState.interviewList.orderBy,
        pageSize: state.interviewState.interviewList.pageSize,
    }
}

const mapDispatchToProps = {
    getInterviewPages,
    markAsReviewed,
    setSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);