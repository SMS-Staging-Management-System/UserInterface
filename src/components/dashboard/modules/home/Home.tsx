import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import ByStaging from '../byStaging/ByStaging';
import FiveOrMore from '../fiveOrMore/FiveOrMore';
import './Home.scss'
import NumInterviews from '../numInterviews/NumInterviews';

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
class Home extends Component<myProps,any> {
    render() {
        return (
            <>
                <div className='wrapper'>
                    <ByStaging {...this.props} />
                    <FiveOrMore {...this.props} />
                    
                </div>
                <div className= 'wrapper2'>
                    <NumInterviews {...this.props} />
                </div>
            </>
            
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(Home);
