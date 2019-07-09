import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IState } from '../../../../reducers';
import ByStaging from '../byStaging/ByStaging';
import FiveOrMore from '../fiveOrMore/FiveOrMore';
import './Home.scss'
<<<<<<< HEAD
import NumInterviews from '../numInterviews/NumInterviews';
=======
import NumInterviewsSummary from '../numInterviews/NumInterviewsSummary';
>>>>>>> d6996faeca3b4598b440ab6c941bd75c8a192c94

interface myProps extends RouteComponentProps<{}> {
    WrappedComponent: any;
}
class Home extends Component<myProps,any> {
    render() {
        return (
<<<<<<< HEAD
            <>
                <div className='wrapper'>
                    <ByStaging {...this.props} />
                    <FiveOrMore {...this.props} />
                    
                </div>
                <div className= 'wrapper2'>
                    <NumInterviews {...this.props} />
                </div>
            </>
            
=======
            <div className='wrapper'>
                <ByStaging {...this.props} />
                <FiveOrMore {...this.props} />
                <NumInterviewsSummary {...this.props} />
            </div>
>>>>>>> d6996faeca3b4598b440ab6c941bd75c8a192c94
        )
    }
}
const mapStateToProps = (state: IState) => ({
    auth: state.managementState.auth
});

export default connect(mapStateToProps)(Home);
