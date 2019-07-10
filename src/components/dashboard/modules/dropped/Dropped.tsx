import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import { userClient } from '../../../../axios/sms-clients/user-client';
import ReactPaginate from 'react-paginate';
import { ClipLoader } from 'react-spinners';
import { IUser } from '../../../../model/user.model';

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}

interface IdroppedState {
    dropped: IUser[],
    totalassoc:number,
    totalPages: number,
    currentPage: number,
    pageSize: number
}

class Dropped extends Component<myProps, IdroppedState> {

    constructor(myProps) {
        super(myProps);
        this.state = {
            dropped: [],
            totalassoc: 0,
            totalPages: 0,
            currentPage: 0,
            pageSize: 5
        }
    }

    componentDidMount() {
        this.viewDropped(0)
        
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.viewDropped(selected);
    }

    async viewDropped(pageNumber: number) {

        try {
            const response = await userClient.findAllDroppedAssociate(pageNumber, this.state.pageSize);
            console.log(response)
            this.setState({
                dropped: response.data.content,
                totalassoc:response.data.content.length,
                totalPages: response.data.totalPages,
                currentPage: pageNumber
            });

        } catch (err) {
            console.log(err)
        }
    }

    render() {

        const droppedAssociatesRows = this.state.dropped.map((droppedAssoc) => {
            return (
                <tr key={String(droppedAssoc.userId)}>
                    <td>{droppedAssoc.firstName}</td>
                    <td>{droppedAssoc.lastName}</td>
                    <td>{droppedAssoc.email}</td>
                    <td>{droppedAssoc.phoneNumber}</td>
                </tr>
            )
            
        });

        return (
            <div>
                {this.state.totalassoc == 0 ? 
                <>
                <div className="no-data">
                        <h1 className="no-data">No data to display</h1>
                        <p id="pStyle">No associate found in the last week.</p>
                    </div>
                </>
                :<>
                <div>
                <div className="lead text-center w-100 ">
                    Total number of associates dropped last week: {this.state.totalassoc}
                </div>
                <div className='container my-3'>
                    <div className='table-responsive border border-gray'>
                        <table className='table table-striped m-auto '>
                            <thead className='rev-background-color'>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {droppedAssociatesRows[0] == null ?
                                    <ClipLoader
                                        sizeUnit={"px"}
                                        size={50}
                                        color={'#dee2e6'}
                                    /> : droppedAssociatesRows}

                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactPaginate
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'page-item no-select justify-content-center'}
                    breakLinkClassName={'break-me-link page-link'}
                    pageCount={this.state.totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination page-navigator justify-content-center'}
                    activeClassName={'active justify-content-center'}
                    pageClassName={'page-item cursor-hover justify-content-center'}
                    pageLinkClassName={'paginate-link page-link no-select'}
                    nextClassName={'page-item cursor-hover justify-content-center'}
                    nextLinkClassName={'paginate-next page-link no-select'}
                    previousClassName={'page-item cursor-hover justify-content-center'}
                    previousLinkClassName={'paginate-previous page-link no-select'}
                />
            </div>
            </>} </div>

        )

    }
}



const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(Dropped);