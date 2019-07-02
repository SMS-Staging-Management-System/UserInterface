import React, { Component } from 'react'
import { IState } from '../../../../reducers';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { IUser } from '../../../../model/user.model';
import {getUserListStaging} from '../../../../actions/dashboardActions/byStaging.actions'


interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any,
    byStagingUserList:IUser[],
    getUserListStaging:any
}
class ByStaging extends Component<myProps,any> {
    componentDidMount(){
        if(this.props.byStagingUserList[0] == null){
            this.props.getUserListStaging();
        }
        
    }

    render() {
        return (
            <div>
                ● All associates in staging and virtual staging
            </div>
        )
    }
}
export const mapDispatchProps = {
    getUserListStaging,
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth,
    byStagingUserList : state.dashboardState.byStagingUserList
});



export default connect(mapStateToProps,mapDispatchProps)(ByStaging);
