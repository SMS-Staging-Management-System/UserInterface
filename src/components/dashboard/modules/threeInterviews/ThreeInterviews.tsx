import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
class ThreeInterviews extends Component<myProps,any> {
    render() {
        return (
            <div>
                ●	Number of associates with 3 interviews that have yet to be paused
            </div>
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(ThreeInterviews);