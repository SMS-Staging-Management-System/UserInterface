import React from 'react';
import { connect } from 'react-redux';
import { getInterviewPages, markAsReviewed, setSelected } from '../../actions/interviewList/interviewList.actions';
import ReactPaginate from 'react-paginate'
import { IState } from '../../reducers';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { Label } from 'reactstrap';
import { store } from '../../Store';
// import { cognitoRoles } from '../../model/cognito-user.model';

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
        direction?: string) => void,
    markAsReviewed: (interviewId: number) => void,
    setSelected: (current: any) => void;
}

export interface InterviewListState {
    direction : string,
    loaded : boolean,
    tableHeaderId: string,
    previousTableHeaderId: string,
    listOfInterviews: any[]
}

// More comments 
export class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
        this.state = {
            direction : this.props.direction,
            loaded : false,
            tableHeaderId: '0',
            previousTableHeaderId: '1', //init diff values of tableHeaderId and previousTableHeaderId to start DESC sorting logic
            listOfInterviews: []
        }
    }

    async componentDidMount() { 
        this.setState({
            listOfInterviews: this.props.listOfInterviews
        });
    }

    async componentWillReceiveProps(nextProps) { //Move props into state here
        this.setState({
            listOfInterviews: nextProps.listOfInterviews
        });
    }

    async componentDidUpdate() {
        if(!this.state.loaded){
            this.setState ({
                loaded:true
            });
            this.props.getInterviewPages(
                this.props.currentPage, 
                this.props.pageSize, 
                this.props.orderBy, 
                this.props.direction);
        }

    }

    handlePageClick = (data) => {
        this.props.getInterviewPages(data.selected,
            this.props.pageSize,
            this.props.orderBy,
            this.props.direction);
    }

    changeOrderAsc = () => {
        this.setState({
            direction: 'ASC'
        })
    }

    changeOrderDesc = () => {
        this.setState({
            direction: 'DESC'
        })
    }

    changeOrderCriteria = async (event: any) => {
        await this.setState({
            tableHeaderId: event.currentTarget.id
        });
        console.log(`tableHeaderId=${this.state.tableHeaderId}`);
        console.log(`previousTableHeaderId=${this.state.previousTableHeaderId}`);
        if(this.state.tableHeaderId === this.state.previousTableHeaderId) { //if click same header -> toggle ASC/DESC
            if(this.state.direction === 'ASC') {
                this.setState({
                    direction: 'DESC'
                });
            } else {
                this.setState({
                    direction: 'ASC'
                });
            }
        } else { //if click diff header -> sort ASC
            this.setState({
                direction: 'ASC'
            })
        }
        this.setState({
            previousTableHeaderId: this.state.tableHeaderId
        });
        console.log(`previousTableHeaderId after setState = ${this.state.previousTableHeaderId}`);
        await this.props.getInterviewPages(
            0,
            this.props.pageSize,
            // event.currentTarget.id,
            this.state.tableHeaderId,
            this.state.direction);
    }

    changePageSize = (event: any) => {
        this.props.getInterviewPages(
            this.props.currentPage,
            event.currentTarget.value,
            this.props.orderBy,
            this.props.direction);
    }

    filterByAssociateEmail = (event: any) => { //handle filter click by associate email
        if(event.currentTarget.value === 'associateEmail') {
            this.setState({
                listOfInterviews: this.props.listOfInterviews
            });
        } else {
            const filteredList = this.props.listOfInterviews.filter((entry) => {
                return (entry.associateEmail === event.currentTarget.value);
            });
            this.setState({
                listOfInterviews: filteredList
            });
        }
    }

    filterByManagerEmail = (event: any) => { //handle filter click by manager email
        if(event.currentTarget.value === 'managerEmail') {
            this.setState({
                listOfInterviews: this.props.listOfInterviews
            });
        } else {
            const filteredList = this.props.listOfInterviews.filter((entry) => {
                return (entry.managerEmail === event.currentTarget.value);
            });
            this.setState({
                listOfInterviews: filteredList
            });
        }
    }

    filterByPlace = (event: any) => { //handle filter click by place
        if(event.currentTarget.value === 'placeName') {
            this.setState({
                listOfInterviews: this.props.listOfInterviews
            });
        } else {
            const filteredList = this.props.listOfInterviews.filter((entry) => {
                return (entry.place === event.currentTarget.value);
            });
            this.setState({
                listOfInterviews: filteredList
            });
        }
    }

    filterByClient = (event: any) => { //handle filter click by client
        if(event.currentTarget.value === 'clientName') {
            this.setState({
                listOfInterviews: this.props.listOfInterviews
            });
        } else {
            const filteredList = this.props.listOfInterviews.filter((entry) => {
                return (entry.client.clientName === event.currentTarget.value);
            });
            this.setState({
                listOfInterviews: filteredList
            });
        }
    }

    renderDate = (date: number) => {
        if (date > 0) {
            return new Date(date).toDateString()
        } else {
            return '-';
        }
    }

    markAsReviewed = (event: any) => {
        this.props.markAsReviewed(event.currentTarget.id);
    }

    getAssocInput = (entry: any) => {
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
        const arrAssociateEmail1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
            return item.associateEmail;
        });
        const arrAssociateEmail2 = arrAssociateEmail1.filter((item, pos) => { //need unique places for select option
            return arrAssociateEmail1.indexOf(item) === pos;
        });
        const arrManagerEmail1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
            return item.managerEmail;
        });
        const arrManagerEmail2 = arrManagerEmail1.filter((item, pos) => { //need unique places for select option
            return arrManagerEmail1.indexOf(item) === pos;
        });
        const arrPlace1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
            return item.place;
        });
        const arrPlace2 = arrPlace1.filter((item, pos) => { //need unique places for select option
            return arrPlace1.indexOf(item) === pos;
        });
        const arrClientName1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
            return item.client.clientName;
        });
        const arrClientName2 = arrClientName1.filter((item, pos) => { //need unique places for select option
            return arrClientName1.indexOf(item) === pos;
        });

        return ( 
            <div className='container'>
            <div className='row'>
            <div>
                <div className='table-responsive-xl'>
                    <table className='table table-striped mx-auto w-auto'>
                        <thead className='rev-background-color'>
                            <tr>
                                {isAdmin? <th>Reviewed</th> : <></>}
                                <th id='associateEmail' className='cursor-hover' onClick={this.changeOrderCriteria}>
                                {/* guard operator to toggle arrow up and down */}
        {this.state.tableHeaderId==='associateEmail' && this.state.direction==='DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>} 
                                    {this.state.tableHeaderId==='associateEmail' && this.state.direction==='ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>}
                                    Associate Email
                                </th>
                                <th id='managerEmail' className='cursor-hover' onClick={this.changeOrderCriteria}>
                                    {this.state.tableHeaderId==='managerEmail' && this.state.direction==='DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>}
                                    {this.state.tableHeaderId==='managerEmail' && this.state.direction==='ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>}
                                    Manager Email 
                                </th>
                                <th id='place' className='cursor-hover' onClick={this.changeOrderCriteria}>
                                    {this.state.tableHeaderId==='place' && this.state.direction==='DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>}
                                    {this.state.tableHeaderId==='place' && this.state.direction==='ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>}
                                    Location 
                                </th>
                                <th id='client' className='cursor-hover' onClick={this.changeOrderCriteria}>
                                    {this.state.tableHeaderId==='client' && this.state.direction==='DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>}
                                    {this.state.tableHeaderId==='client' && this.state.direction==='ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>}
                                    Client 
                                </th>
                                <th id='notified' className='cursor-hover' onClick={this.changeOrderCriteria}>
                                    {this.state.tableHeaderId==='notified' && this.state.direction==='DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>}
                                    {this.state.tableHeaderId==='notified' && this.state.direction==='ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>}
                                    Date Notified 
                                </th>
                                <th id='scheduled' className='cursor-hover' onClick={this.changeOrderCriteria}>
                                    {this.state.tableHeaderId==='scheduled' && this.state.direction==='DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>}
                                    {this.state.tableHeaderId==='scheduled' && this.state.direction==='ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>}
                                    Date Scheduled 
                                </th>
                                <th id='reviewed' className='cursor-hover' onClick={this.changeOrderCriteria}>
                                    {this.state.tableHeaderId==='reviewed' && this.state.direction==='DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>}
                                    {this.state.tableHeaderId==='reviewed' && this.state.direction==='ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>}
                                    Date Reviewed 
                                </th>
                                <th id='associateInput' onClick={this.changeOrderCriteria}>Associate Input 
                                    {/* <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/> */}
                                </th>
                                <th>
                                    Interview Feedback
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listOfInterviews.map((entry) => {
                                return (<tr key={entry.id}>
                                    {isAdmin? <td><input id={entry.id} type="checkbox" checked={entry.reviewed} onChange={this.markAsReviewed} /></td> : <></>}
                                    {/* {isAdmin? <td><input id={entry.id} type="checkbox" checked={entry.reviewed} /></td> : <></>} */}
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
                                        <Link to={{ pathname: "/interview/viewFeedback", state: { interviewId: entry.id}}}>View Interview Feedback</Link>
                                        :
                                        isAdmin?   
                                        <Link to={{pathname: `/interview/${entry.id}/feedback`}}>Complete Interview Feedback</Link>
                                        :
                                        <></>
                                    }</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    <form>
                        <div className='form-row'>
                        <div className='col'>
                        <Label>Page Size: </Label>
                        </div>
                        <div className='col'>
                        <select value={this.props.pageSize} onChange={this.changePageSize} className='form-control'>
                            <option value={5} className={'justify-content-center'}>5</option>
                            <option value={10} className={'justify-content-center'}>10</option>
                            <option value={25} className={'justify-content-center'}>25</option>
                            <option value={50} className={'justify-content-center'}>50</option>
                        </select>
                        </div>
                        <div className='col-3'>
                            <select onChange={this.filterByAssociateEmail} className='form-control'>
                                <option value='associateEmail'>Associate Email</option>
                                {arrAssociateEmail2.map((entry) => {
                                    return (
                                        <option value={entry}>{entry}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className='col-3'>
                            <select onChange={this.filterByManagerEmail} className='form-control'>
                                <option value='managerEmail'>Manager Email</option>
                                {arrManagerEmail2.map((entry) => {
                                    return (
                                        <option value={entry}>{entry}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className='col-2'>
                            <select onChange={this.filterByPlace} className='form-control'>
                                <option value='placeName'>Location</option>
                                {arrPlace2.map((entry) => {
                                    return (
                                        <option value={entry}>{entry}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className='col-2'>
                            <select onChange={this.filterByClient} className='form-control'>
                                <option value='clientName'>Client</option>
                                {arrClientName2.map((entry) => {
                                    return (
                                        <option value={entry}>{entry}</option>
                                    );
                                })}
                            </select>
                        </div>
                        </div>
                    </form>
                </div>
                </div>
                </div>
                <br/>
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
                containerClassName={'pagination page-navigator justify-content-center'}
                activeClassName={'active'}
                pageClassName={'page-item cursor-hover'}
                pageLinkClassName={'paginate-link page-link no-select justify-content-center'}
                nextClassName={'page-item cursor-hover'}
                nextLinkClassName={'paginate-next page-link no-select justify-content-center'}
                previousClassName={'page-item cursor-hover'}
                previousLinkClassName={'paginate-previous page-link no-select justify-content-center'}/>
            </div>
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