import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import { ICohort } from '../../../../model/cohort';
import { getCohorts } from '../../../../actions/dashboardActions/to-staging.actions'

interface IToStagingProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
    cohortList: ICohort[];
    getCohorts: (date: Date | number) => void;
}
class ToStaging extends Component<IToStagingProps,any> {

    onComponentDidUpdate = () => {
        this.props.getCohorts(new Date());
    }
    
    render() {
        return (
            <div className="ToStaging">
                To Staging
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

export default connect(mapStateToProps)(ToStaging);
