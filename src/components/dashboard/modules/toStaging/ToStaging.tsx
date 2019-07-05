import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';

interface IToStagingProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
class ToStaging extends Component<IToStagingProps,any> {
    render() {
        return (
            <div className="ToStaging">
                To Staging
            </div>
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(ToStaging);
