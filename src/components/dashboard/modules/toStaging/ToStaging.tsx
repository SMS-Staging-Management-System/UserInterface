import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import { ICohort } from '../../../../model/cohort';
import { getCohorts } from '../../../../actions/dashboardActions/to-staging.actions'
import { Table } from 'react-bootstrap';

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
                {this.props.cohortList.length >= 1 ?
                    <Table className="table table-striped mx-auto w-auto">
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
                                <tr key={cohort.cohortId} className="rev-table-row">
                                    <td>{cohort.cohortName}</td>
                                    <td>{cohort.trainer.firstName + " " + cohort.trainer.lastName}</td>
                                    <td>{cohort.address.alias}</td>
                                    <td>{cohort.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> : 
                <>
                <h1>No Data</h1>
                <p>No associates found in the last week.</p>
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
