import React from 'react';
import CreateUserComponent from '../create-user/create-user.component';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { IState } from '../../reducers';
import { joinCohort, findLoggedInUser, findCohortByToken } from '../../actions/join-cohort/join-cohort.actions';
import { IAuthState, IJoinCohortState } from "../../reducers/management";
import { ICognitoUser } from "../../model/ICognitoUser";
import { IUser } from "../../model/users/IUser";
import { updateLocations } from '../../actions/address/address.actions';
import { History } from "history";
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';

export interface IJoinCohortProps {
  token: string,
  login: IAuthState,
  joinCohortState: IJoinCohortState,
  history: History,
  findCohortByToken:(token:string, history:History) => void,
  joinCohort:(user:IUser, token:string, history:History) => void,
  updateLocations: () => void,
  findLoggedInUser: (user:ICognitoUser, history:History) => void
}

export class JoinCohortComponent extends React.Component<IJoinCohortProps, IJoinCohortState> {
  constructor(props) {
    super(props)
  }

  // assert cohort token is real
  // if not display not a valid cohort link,

  componentDidMount(){
  this.props.updateLocations();
  this.props.findCohortByToken(this.props.token, this.props.history);
  }

  componentDidUpdate() {
    if (this.props.login.currentUser.email && !this.props.joinCohortState.userToJoin.userId) {
      this.props.findLoggedInUser(this.props.login.currentUser, this.props.history);
    }
  }

  joinCohort = () => {
    if (this.props.joinCohortState.foundCohort.users.find((currentUser:IUser) => ( currentUser.userId === this.props.joinCohortState.userToJoin.userId))) {
        this.props.history.push('/');
        toast.info(`You are already in the ${this.props.joinCohortState.foundCohort.cohortName} cohort`);
    } else {
    this.props.joinCohort(this.props.joinCohortState.userToJoin, this.props.token, this.props.history);
  }
}

  // join cohort window has username and cohort name and a join button
  // after clicking join, take you to cohort page

  render() {
      const { login } = this.props;
      // If new user just filled the sign up form, will be redirected automatically to the
      // cohort login page
      return (
      <div>  
      { login.currentUser.email ? 
          <div>
            <Button color='primary' onClick={this.joinCohort}>Join Cohort</Button>
          </div>
          :
          <div>
            <CreateUserComponent />    
         </div>
      }
      </div>
      )
    }
}

const mapStateToProps = (state:IState, ownProps) => ({
  token: ownProps.match.params.token,
  login: state.managementState.auth,
  joinCohortState: state.managementState.joinCohort,
  history: ownProps.history
})


const mapDispatchToProps = {
  findCohortByToken,
  findLoggedInUser,
  joinCohort,
  updateLocations
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinCohortComponent))