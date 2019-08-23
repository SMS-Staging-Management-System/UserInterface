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
    paginateStart : number,
    paginateEnd : number
}

// More comments 
class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
    constructor(props: InterviewListProps) {
        super(props);
        this.state = {
            direction : this.props.direction,
            loaded : false,
            paginateStart: 0,
            paginateEnd: 5

        }
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

    handlePageClick = (e: any) => {//data) => {
        console.log("e is", e.selected);
        this.props.getInterviewPages(e.selected,//data.selected,
            this.props.pageSize,
            this.props.orderBy,
            this.props.direction);
        this.setState({
            paginateStart: e.selected*this.props.pageSize,
            paginateEnd: e.selected*this.props.pageSize + this.props.pageSize
        })
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

    changeOrderCriteria = (event: any) => {
        this.props.getInterviewPages(
            0,
            this.props.pageSize,
            event.currentTarget.id,
            this.state.direction);
    }

    changePageSize = (event: any) => {
        console.log("page size is",this.props.pageSize);
        console.log("page Number is",this.props.currentPage);
        console.log("page Order is",this.props.orderBy);
        console.log("page Direction is",this.props.direction);
        console.log("Number of pages is",this.props.numberOfPages);
        console.log("Page Range Displayed");
        this.setState({
            paginateEnd: this.props.pageSize,
            paginateStart: 0
        })
        this.props.getInterviewPages(
            0,//this.props.currentPage,//Dont wan't user to be on page 15 if they just changed size where there is no page 15 so start at beginning
            parseInt(event.currentTarget.value),
            this.props.orderBy,
            this.props.direction);
        /*
        * pageNumber?: number,
        * pageSize?: number,
        * ordeyBy?: string,
        * direction?: string) => void,
        */
        console.log("page size is now",this.props.pageSize);
        console.log("page Number is now",this.props.currentPage);
        console.log("page Order is now",this.props.orderBy);
        console.log("page Direction is now",this.props.direction);
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
        return ( 
            <div>
                <div className='tableholder'>
                    <table>
                        <thead>
                            <tr>
                                {isAdmin? <th>Reviewed</th> : <></>}
                                <th id='associateEmail' onClick={this.changeOrderCriteria}>Associate Email 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th id='managerEmail' onClick={this.changeOrderCriteria}>Manager Email 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th id='place' onClick={this.changeOrderCriteria}>Location 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th id='client' onClick={this.changeOrderCriteria}>Client 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th id='notified' onClick={this.changeOrderCriteria}>Date Notified 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th id='scheduled' onClick={this.changeOrderCriteria}>Date Scheduled 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th id='reviewed' onClick={this.changeOrderCriteria}>Date Reviewed 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th id='associateInput' onClick={this.changeOrderCriteria}>Associate Feedback 
                                    <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
                                    <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/>
                                </th>
                                <th>
                                    Interview Feedback
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.listOfInterviews.slice(this.state.paginateStart,this.state.paginateEnd).map((entry) => {
                                return (<tr key={entry.id}>
                                    {isAdmin? <td><input id={entry.id} type="checkbox" checked={entry.reviewed} onChange={this.markAsReviewed} /></td> : <></>}
                                    {/* <td>{entry.associateEmail}</td> */}
                                    {/* <td>{entry.managerEmail}</td> */}
                                    <td>{entry.place}</td>
                                    {/* <td>{entry.client.clientName}</td> */}
                                    {/* <td>{this.renderDate(entry.notified)}</td> */}
                                    {/* <td>{this.renderDate(entry.scheduled)}</td> */}
                                    {/* <td>{this.renderDate(entry.reviewed)}</td> */}
                                    {/* {this.getAssocInput(entry)} */}
                                    {/* <td>{ */}
                                        {/* entry.feedback ?
                                        <Link to={{ pathname: "/interview/viewFeedback", state: { interviewId: entry.id}}}>View Interview Feedback</Link>
                                        :
                                        isAdmin?   
                                        <Link to={{pathname: `/interview/${entry.id}/feedback`}}>Complete Interview Feedback</Link>
                                        :
                                        <></>
                                    }</td> */}
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    <form className='justify-content-center'>
                        <Label className={'justify-content-center'}>Page Size: </Label>
                        <select value={this.props.pageSize} onChange={this.changePageSize} className={'justify-content-center'}>
                            <option value={5} className={'justify-content-center'}>5</option>
                            <option value={10} className={'justify-content-center'}>10</option>
                            <option value={25} className={'justify-content-center'}>25</option>
                            <option value={50} className={'justify-content-center'}>50</option>
                        </select>
                    </form>
                </div>
                <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'page-item no-select justify-content-center'}
                breakLinkClassName={'break-me-link page-link'}
                pageCount={this.props.numberOfPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={(e) => this.handlePageClick(e)}
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








// - - - - - - - - - - - - - NO TOUCH - - - - - - - - - - - - - - - 

// import React from 'react';
// import { connect } from 'react-redux';
// import { getInterviewPages, markAsReviewed, setSelected } from '../../actions/interviewList/interviewList.actions';
// import ReactPaginate from 'react-paginate'
// import { IState } from '../../reducers';
// import { Link } from 'react-router-dom';
// import { IoIosArrowDown } from 'react-icons/io';
// import { IoIosArrowUp } from 'react-icons/io';
// import { Label } from 'reactstrap';
// import { store } from '../../Store';
// // import { Button } from 'react-bootstrap'; 
// import ReviewButton from './ActionButtons/ReviewButton';
// import { ConsoleLogger } from '@aws-amplify/core';
// // import { cognitoRoles } from '../../model/cognito-user.model';



// export interface InterviewListProps {
//     email: string,
//     listOfInterviews: any[],
//     numberOfPages: number,
//     pageSize: number,
//     orderBy: string,
//     direction: string,
//     getInterviewPages: (
//         pageNumber?: number,
//         pageSize?: number,
//         ordeyBy?: string,
//         direction?: string,
//         associateEmail?: string,
//         managerEmail?: string,
//         place?: string,
//         clientName?: string,
//         staging?: string) => void,
//     markAsReviewed: (interviewId: number) => void,
//     setSelected: (current: any) => void;
// }

// export interface InterviewListState {
//     direction: string,
//     pageRangeDisplayed: number,
//     mapStartingPoint: number,
//     mapEndingPoint: number,
//     currentPage: number,
//     loaded: boolean,
//     tableHeaderId: string,
//     previousTableHeaderId: string,
//     listOfInterviews: any[],
//     partialListOfInterviews: any[],
//     associateEmail: string,
//     managerEmail: string,
//     place: string,
//     clientName: string,
//     staging: string
// }

// // More comments 
// export class InterviewList extends React.Component<InterviewListProps, InterviewListState> {
//     constructor(props: InterviewListProps) {
//         super(props);

//         this.state = {
//             currentPage: 0,
//             direction: this.props.direction,
//             loaded: false,
//             tableHeaderId: '0',
//             previousTableHeaderId: '1', //init diff values of tableHeaderId and previousTableHeaderId to start DESC sorting logic
//             listOfInterviews: [],
//             mapStartingPoint: 1,
//             mapEndingPoint: 6,            
//             pageRangeDisplayed: 5,
//             partialListOfInterviews: [],
//             associateEmail: 'associateEmail',
//             managerEmail: 'managerEmail',
//             place: 'placeName',
//             clientName: 'clientName',
//             staging: 'stagingOff'
//         }
//     }

//     async componentDidMount() {
//         if(this.state.currentPage == 0) {
//             this.setState({
//                 mapStartingPoint: this.state.mapStartingPoint-1,
//                 mapEndingPoint: this.state.mapEndingPoint-1
//             })
//         } 
//         this.setState({
//             listOfInterviews: [{place: "1 One"}, {place: "2 Two"}, {place: "3 Three"},
//             {place: "4 Four"}, {place: "5 Five"}, {place: "6 Six"}, {place: "7 Seven"}, {place: "Eight"},
//             {place: "9 Nine"}, {place: "10Ten"}, {place: "11 Eleven"}, {place: "12 Twelve"},
//             {place: "13 Thirteen"}, {place: "14 Fourteen"}, {place: "15 Fifteen"}, {place: "Sixteen"}, {place: "Seventeen"},
//             {place: "18 Eightteen"}, {place: "19 Nineteen"},{place: "20 Twenty"},
//             {place: "21 Twenty-One"},{place: "22 Twenty-Two"},{place: "23 Twenty-Three"},
//             {place: "24 Twenty-Four"},{place: "25 Twenty-Five "},{place: "26 Twenty-Six"}]
//             // this.props.listOfInterviews
//         });
//     }

//     async componentWillReceiveProps(nextProps) { //Move props into state here
//         this.setState({
//             listOfInterviews: nextProps.listOfInterviews,
//             //listOfInterviewsInitial: nextProps.listOfInterviews
//         });
//     }

//     async componentDidUpdate() {

        
//         if (!this.state.loaded) {
//             this.setState({
//                 loaded: true
//             });
//             this.props.getInterviewPages(
//                 this.state.currentPage,
//                 // this.props.currentPage,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 this.state.managerEmail,
//                 this.state.place,
//                 this.state.clientName,
//                 this.state.staging);
//         }
//     }

//     handlePageClick = (e: any) => {
//         console.log(this.state.mapStartingPoint-1)
//         console.log(this.state.mapEndingPoint-1)

//         let x: number, range: number;

//         x = e.selected;
//         if(this.state.currentPage == 0) {
//             this.setState({
//                 mapStartingPoint: this.state.mapStartingPoint-1,
//                 mapEndingPoint: this.state.mapEndingPoint-1
//             })
//         } 
//         range = this.state.pageRangeDisplayed;

        
//         this.setState({
//             mapStartingPoint: x * range,
//             mapEndingPoint: (x * range) + range,
//             currentPage: x
//         })

        












//     //     this.props.getInterviewPages(data.selected,
//     //         this.props.pageSize,
//     //         this.props.orderBy,
//     //         this.props.direction,
//     //         this.state.associateEmail,
//     //         this.state.managerEmail,
//     //         this.state.place,
//     //         this.state.clientName,
//     //         this.state.staging);
//     }

//     changeOrderAsc = () => {
//         this.setState({
//             direction: 'ASC'
//         })
//     }

//     changeOrderDesc = () => {
//         this.setState({
//             direction: 'DESC'
//         })
//     }

//     changeOrderCriteria = async (event: any) => {
//         await this.setState({
//             tableHeaderId: event.currentTarget.id
//         });
//         if (this.state.tableHeaderId === this.state.previousTableHeaderId) { //if click same header -> toggle ASC/DESC
//             if (this.state.direction === 'ASC') {
//                 this.setState({
//                     direction: 'DESC'
//                 });
//             } else {
//                 this.setState({
//                     direction: 'ASC'
//                 });
//             }
//         } else { //if click diff header -> sort ASC
//             this.setState({
//                 direction: 'ASC'
//             })
//         }
//         this.setState({
//             previousTableHeaderId: this.state.tableHeaderId
//         });
//         await this.props.getInterviewPages(
//             0,
//             this.props.pageSize,
//             // event.currentTarget.id,
//             this.state.tableHeaderId,
//             this.state.direction,
//             this.state.associateEmail,
//             this.state.managerEmail,
//             this.state.place,
//             this.state.clientName,
//             this.state.staging);
//     }

//     changePageSize = (e: any) => {
//         console.log(parseInt(e.currentTarget.value))
//         // console.log(this.state.mapEndingPoint)
//         this.setState({
//             pageRangeDisplayed: parseInt(e.currentTarget.value),
//             currentPage: 0,
//             mapStartingPoint: 0,
//             mapEndingPoint: e.currentTarget.value 
//             //  this.state.mapStartingPoint * this.state.pageRangeDisplayed + this.state.pageRangeDisplayed - 1
//         })
//     //     this.props.getInterviewPages(
//     //         this.props.currentPage,
//     //         event.currentTarget.value,
//     //         this.props.orderBy,
//     //         this.props.direction,
//     //         this.state.associateEmail,
//     //         this.state.managerEmail,
//     //         this.state.place,
//     //         this.state.clientName,
//     //         this.state.staging);
//     }

//     filterByAssociateEmail = (event: any) => { //handle filter click by associate email
//         console.log(event.currentTarget.value);

//         if (event.currentTarget.value === 'associateEmail') {
//             this.setState({
//                 associateEmail: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 event.currentTarget.value,
//                 this.state.managerEmail,
//                 this.state.place,
//                 this.state.clientName,
//                 this.state.staging);

//         } else {
//             this.setState({
//                 associateEmail: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 event.currentTarget.value,
//                 this.state.managerEmail,
//                 this.state.place,
//                 this.state.clientName,
//                 this.state.staging);
//         }
//     }

//     filterByManagerEmail = (event: any) => { //handle filter click by manager email
//         if (event.currentTarget.value === 'managerEmail') {
//             this.setState({
//                 managerEmail: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 event.currentTarget.value,
//                 this.state.place,
//                 this.state.clientName,
//                 this.state.staging);
//         } else {
//             this.setState({
//                 managerEmail: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 event.currentTarget.value,
//                 this.state.place,
//                 this.state.clientName,
//                 this.state.staging);
//         }
//     }

//     filterByPlace = (event: any) => { //handle filter click by place
//         if (event.currentTarget.value === 'placeName') {
//             this.setState({
//                 place: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 this.state.managerEmail,
//                 event.currentTarget.value,
//                 this.state.clientName,
//                 this.state.staging);
//         } else {
//             this.setState({
//                 place: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 this.state.managerEmail,
//                 event.currentTarget.value,
//                 this.state.clientName,
//                 this.state.staging);
//         }
//     }

//     filterByClient = (event: any) => { //handle filter click by client
//         if (event.currentTarget.value === 'clientName') {
//             this.setState({
//                 clientName: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 this.state.managerEmail,
//                 this.state.place,
//                 event.currentTarget.value,
//                 this.state.staging);
//         } else {
//             this.setState({
//                 clientName: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 this.state.managerEmail,
//                 this.state.place,
//                 event.currentTarget.value,
//                 this.state.staging);
//         }
//     }

//     filterByStaging = (event: any) => { //handle filter click by associate email
//         console.log(event.currentTarget.value);

//         if (event.currentTarget.value === 'stagingOff') {
//             this.setState({
//                 staging: event.currentTarget.value
//             });
//             console.log("staging Off");

//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 this.state.managerEmail,
//                 this.state.place,
//                 this.state.clientName,
//                 event.currentTarget.value);

//         } else {
//             this.setState({
//                 staging: event.currentTarget.value
//             });
//             this.props.getInterviewPages(
//                 0,
//                 this.props.pageSize,
//                 this.props.orderBy,
//                 this.props.direction,
//                 this.state.associateEmail,
//                 this.state.managerEmail,
//                 this.state.place,
//                 this.state.clientName,
//                 event.currentTarget.value);
//         }
//     }

//     renderDate = (date: number) => {
//         if (date > 0) {
//             return new Date(date).toDateString()
//         } else {
//             return '-';
//         }
//     }

//     getAssocInput = (entry: any) => {
//         let url = (entry.associateInput ? 'viewAssocInput' : 'associateInput');
//         let text = (entry.associateInput ? 'View' : 'Add');
//         console.log(entry.associateInput)
//         return (
//             <td>
//                 {
//                     <Link onClick={e => {
//                         this.props.setSelected(entry.associateInput);
//                     }} to={{
//                         pathname: `/interview/${url}`,
//                         state: { interviewId: entry.id }
//                     }} >{`${text} Associate Input`}
//                     </Link>
//                 }
//             </td>
//         );
//     };

//     render() {
//         console.log(this.state.associateEmail);

//         const roles = (store.getState().managementState.auth.currentUser.roles);
//         const isAdmin = (roles.includes('admin') || roles.includes('staging-manager') || roles.includes('trainer'));
//         const arrAssociateEmail1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
//             return item.associateEmail;
//         });
//         const arrAssociateEmail2 = arrAssociateEmail1.filter((item, pos) => { //need unique places for select option
//             return arrAssociateEmail1.indexOf(item) === pos;
//         });
//         const arrManagerEmail1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
//             return item.managerEmail;
//         });
//         const arrManagerEmail2 = arrManagerEmail1.filter((item, pos) => { //need unique places for select option
//             return arrManagerEmail1.indexOf(item) === pos;
//         });
//         const arrPlace1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
//             return item.place;
//         });
//         const arrPlace2 = arrPlace1.filter((item, pos) => { //need unique places for select option
//             return arrPlace1.indexOf(item) === pos;
//         });
//         const arrClientName1 = this.props.listOfInterviews.map((item) => { //convert interview array to place array
//             return item.client.clientName;
//         });
//         const arrClientName2 = arrClientName1.filter((item, pos) => { //need unique places for select option
//             return arrClientName1.indexOf(item) === pos;
//         });

//         return (
//             <div className='container'>
//                 <div className='row'>
//                     <div>
//                         <div className='table-responsive-xl'>
//                             <table className='table table-striped mx-auto w-auto'>
//                                 <thead className='rev-background-color'>
//                                     <tr>
//                                         {isAdmin ? <th>Reviewed</th> : <></>}
//                                         <th id='associateEmail' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             {/* guard operator to toggle arrow up and down */}
//                                             Associate Email
// 					    {this.state.tableHeaderId === 'associateEmail' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'associateEmail' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>

//                                         <th id='managerEmail' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             Manager Email
// 					    {this.state.tableHeaderId === 'managerEmail' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'managerEmail' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>

//                                         <th id='place' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             Location
// 					    {this.state.tableHeaderId === 'place' && this.state.direction === 'DESC' && <IoIosArrowDown className='dropdownicon' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'place' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>

//                                         <th id='client' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             Client
// 					    {this.state.tableHeaderId === 'client' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'client' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>

//                                         <th id='notified' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             Date Notified
// 					    {this.state.tableHeaderId === 'notified' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'notified' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>

//                                         <th id='scheduled' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             Date Scheduled
// 					    {this.state.tableHeaderId === 'scheduled' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'scheduled' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>

//                                         <th id='reviewed' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             Date Reviewed
// 					    {this.state.tableHeaderId === 'reviewed' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'reviewed' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>
//                                         <th id='associateInput' className='cursor-hover' onClick={this.changeOrderCriteria}>
//                                             Associate Input
// 					    {this.state.tableHeaderId === 'associateInput' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'associateInput' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                             {/* <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc}/>
// 						<IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc}/> */}
//                                         </th>
//                                         <th id='feedback' className='cursor-hover' onClick={this.changeOrderCriteria} style={{ backgroundColor: '#f3a55d' }}>
//                                             Interview Feedback
// 					    {this.state.tableHeaderId === 'feedback' && this.state.direction === 'DESC' && <IoIosArrowDown className='cursor-hover' onClick={this.changeOrderDesc} />}
//                                             {this.state.tableHeaderId === 'feedback' && this.state.direction === 'ASC' && <IoIosArrowUp className='cursor-hover' onClick={this.changeOrderAsc} />}
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {this.state.listOfInterviews.slice(this.state.mapStartingPoint, this.state.mapEndingPoint).map((entry) => {
//                                         console.log(entry.associateInput)
//                                         return (<tr key={entry.id}>
//                                             {/* {isAdmin? <td><input id={entry.id} type="checkbox" checked={entry.reviewed} onChange={this.markAsReviewed} /></td> : <></>} */}
//                                             {/* {isAdmin? <td><ReviewButton className="text-warning" interviewId = {entry.id}/></td> : <></>} */}
//                                             {/* <td><ReviewButton disabled={isAdmin} interview={entry} assocInput={entry.associateInput || 'bleh'} /></td> */}
//                                             {/* <td>{entry.associateEmail}</td> */}
//                                             {/* <td>{entry.managerEmail}</td> */}
//                                             <td>{entry.place}</td>
//                                             {/* <td>{entry.client.clientName}</td> */}
//                                             {/* <td>{this.renderDate(entry.notified)}</td> */}
//                                             {/* <td>{this.renderDate(entry.scheduled)}</td> */}
//                                             {/* <td>{this.renderDate(entry.reviewed)}</td> */}
//                                             {/* {this.getAssocInput(entry)} */}
//                                             <td>{
//                                                 entry.feedback ?
//                                                     <Link to={{ pathname: "/interview/viewFeedback", state: { interviewId: entry.id } }}>Edit Interview Feedback</Link>
//                                                     :
//                                                     isAdmin ?
//                                                         <Link to={{ pathname: `/interview/${entry.id}/feedback` }}>Complete Interview Feedback</Link>
//                                                         :
//                                                         <></>
//                                             }</td>
//                                         </tr>)
//                                     })}
//                                 </tbody>
//                             </table>
//                             <form>
//                                 <div className='form-row'>
//                                     <div className='col-0.5'>
//                                         <select onChange={(e) => this.changePageSize(e)} className='form-control'>
//                                             <option value="" disabled selected hidden>Page</option>
//                                             <option value={5} className={'justify-content-center'}>5</option>
//                                             <option value={10} className={'justify-content-center'}>10</option>
//                                             <option value={25} className={'justify-content-center'}>25</option>
//                                             <option value={50} className={'justify-content-center'}>50</option>
//                                         </select>
//                                     </div>
//                                     <div className='col-3'>
//                                         <select onChange={this.filterByAssociateEmail} value={this.state.associateEmail} className='form-control'>
//                                             <option value='associateEmail'>Associate Email</option>
//                                             {arrAssociateEmail2.map((entry, index) => {
//                                                 return (
//                                                     <option value={entry} key={index}>{entry}</option>
//                                                 );
//                                             })}
//                                         </select>
//                                     </div>
//                                     <div className='col-3'>
//                                         <select onChange={this.filterByManagerEmail} value={this.state.managerEmail} className='form-control'>
//                                             <option value='managerEmail'>Manager Email</option>
//                                             {arrManagerEmail2.map((entry, index) => {
//                                                 return (
//                                                     <option value={entry} key={index}>{entry}</option>
//                                                 );
//                                             })}
//                                         </select>
//                                     </div>
//                                     <div className='col'>
//                                         <select onChange={this.filterByPlace} value={this.state.place} className='form-control'>
//                                             <option value='placeName'>Location</option>
//                                             {arrPlace2.map((entry, index) => {
//                                                 return (
//                                                     <option value={entry} key={index}>{entry}</option>
//                                                 );
//                                             })}
//                                         </select>
//                                     </div>
//                                     <div className='col-1'>
//                                         <select onChange={this.filterByClient} value={this.state.clientName} className='form-control'>
//                                             <option value='clientName'>Client</option>
//                                             {arrClientName2.map((entry, index) => {
//                                                 return (
//                                                     <option value={entry} key={index}>{entry}</option>
//                                                 );
//                                             })}
//                                         </select>
//                                     </div>
//                                     <div className='col-2'>
//                                         <select onChange={this.filterByStaging} value={this.state.staging} className='form-control'>
//                                             <option value='stagingOff'>Staging Off</option>
//                                             <option value='stagingOn'>Staging On</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//                 <br />
//                 <ReactPaginate
//                     previousLabel={'Prev'}
//                     nextLabel={'Next'}
//                     breakLabel={'...'}
//                     breakClassName={'page-item no-select justify-content-center'}
//                     breakLinkClassName={'break-me-link page-link'}
//                     pageCount={this.state.listOfInterviews.length/this.state.pageRangeDisplayed}

//                     // pageCount={this.props.numberOfPages}
//                     marginPagesDisplayed={2}
//                     pageRangeDisplayed={this.state.pageRangeDisplayed}
//                     forcePage={this.state.currentPage}                    
//                     // forcePage={this.props.currentPage}
//                     onPageChange={(e) => this.handlePageClick(e)}
//                     containerClassName={'pagination page-navigator justify-content-center'}
//                     activeClassName={'active'}
//                     pageClassName={'page-item cursor-hover'}
//                     pageLinkClassName={'paginate-link page-link no-select justify-content-center'}
//                     nextClassName={'page-item cursor-hover'}
//                     nextLinkClassName={'paginate-next page-link no-select justify-content-center'}
//                     previousClassName={'page-item cursor-hover'}
//                     previousLinkClassName={'paginate-previous page-link no-select justify-content-center'} />
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state: IState) => {
//     return {
//         email: state.managementState.auth.currentUser.email,
//         listOfInterviews: state.interviewState.interviewList.listOfInterviews,
//         numberOfPages: state.interviewState.interviewList.numberOfPages,
//         currentPage: state.interviewState.interviewList.currentPage,
//         pageSize: state.interviewState.interviewList.pageSize,
//         orderBy: state.interviewState.interviewList.orderBy,
//         direction: state.interviewState.interviewList.direction
//     }
// }

// const mapDispatchToProps = {
//     getInterviewPages,
//     markAsReviewed,
//     setSelected
// }

// export default connect(mapStateToProps, mapDispatchToProps)(InterviewList);
