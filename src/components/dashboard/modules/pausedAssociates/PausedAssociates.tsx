import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
class PausedAssociates extends Component<myProps,any> {
    render() {
        return (
            <div>
                ●	Number of paused associates
            </div>
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(PausedAssociates);