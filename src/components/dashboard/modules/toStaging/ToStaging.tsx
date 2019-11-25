import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import { ICohort } from '../../../../model/users/ICohort';
import { getCohorts } from '../../../../actions/dashboardActions/to-staging.actions'
import { Table } from 'react-bootstrap';
import './ToStaging.scss'

interface IToStagingProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
    cohortList: ICohort[];
    getCohorts: (date: Date | number) => void;
}
class ToStaging extends Component<IToStagingProps,any> {
    constructor(props: IToStagingProps) {
        super(props);
    }

    componentDidMount() {
        this.setCohortList();
    }

    setCohortList = () => {
        this.props.getCohorts(new Date());
    }
    
    render() {
        return (
            <div className="ToStaging">
                <h1 className='lead text-center w-100'><b>Cohorts graduating in the  next 2 weeks</b></h1>
                {this.props.cohortList.length >= 1 ?
                    <div className='table-responsive border border-gray '>
                    <table className='table table-striped m-auto '>
                        <thead className="rev-background-color">
                            <tr>
                                <th>Cohort Name</th>
                                <th>Trainer</th>
                                <th>Location</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.cohortList.map(cohort => (
                                <tr key={cohort.cohortId}>
                                    <td>{cohort.cohortName}</td>
                                    <td>{cohort.trainer.firstName + " " + cohort.trainer.lastName}</td>
                                    <td>{cohort.address.alias}</td>
                                    <td>{cohort.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                    </div> : 
                <>
                <h1>No Data</h1>
                <p>No cohorts are ending in the next 2 weeks.</p>
                <p>Please check back in later.</p>
                </>} 
            </div>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth,
    cohortList: state.dashboardState.toStaging.cohortList
});

const mapDispatchToProps = {
    getCohorts
}

export default connect(mapStateToProps, mapDispatchToProps)(ToStaging);
