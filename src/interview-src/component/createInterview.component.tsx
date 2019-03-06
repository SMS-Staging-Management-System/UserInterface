import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IState, } from '../../reducers';
import { connect } from 'react-redux';
//import { toast } from 'react-toastify';
import { withRouter } from "react-router";
import { ICreateInterviewComponentState } from '../../reducers/interview';
import { setState } from '../actions/createInterview.actions';


interface ICreateInterviewComponentProps extends RouteComponentProps {
    createInterviewComponentState: ICreateInterviewComponentState;
    setState: (newCreateInterviewComponentState: ICreateInterviewComponentState) => void;
}

class CreateInterviewComponent extends React.Component<ICreateInterviewComponentProps> {

  componentDidMount() {
      
  }

  public render() {
    return (
        <>
            <h1>halloooo</h1>
            <p>this state is {}</p>
            {console.log('hello')}

        </>
    );
  }
}

const mapStateToProps = (state: IState) => ({
    createInterviewComponentState: state.interviewState.createInterviewComponentState
});
const mapDispatchToProps = {
    setState: setState
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateInterviewComponent));