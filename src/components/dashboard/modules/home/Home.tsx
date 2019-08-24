import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import ByStaging from '../byStaging/ByStaging';
import FiveOrMore from '../fiveOrMore/FiveOrMore';
import './Home.scss'
import NumInterviews from '../numInterviews/NumInterviews';
import Dropped from '../dropped/Dropped';
import ToStaging from '../toStaging/ToStaging';

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
class Home extends Component<myProps,any> {
    render() {
        return (
            <div className='wrapper'>
                <div className='byStaging'>
                    <ByStaging {...this.props} />
                </div>
                <div className= 'fiveOrMore'>
                <FiveOrMore {...this.props} />
                </div>
                <div className= 'numInterviews'>
                    <NumInterviews {...this.props} />
                </div>
                <div className='toStaging'>
                    <ToStaging {...this.props} />
                </div>
                <div className='dropped'>
                    <Dropped {...this.props} />
                </div>
            </div>
            
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(Home);