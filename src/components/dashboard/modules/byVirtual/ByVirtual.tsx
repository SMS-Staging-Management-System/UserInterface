import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
class ByVirtual extends Component<myProps,any> {
    render() {
        return (
            <div>
                ● All associates in staging and virtual staging
            </div>
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(ByVirtual);
