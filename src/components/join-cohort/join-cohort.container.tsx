import { IState } from "../../reducers";
import { connect } from "react-redux";
import { JoinCohortComponent } from "./join-cohort.component";
import {joinCohort} from '../../actions/join-cohort/join-cohort.actions'


const mapStateToProps = (state:IState, ownProps) => ({
    token: ownProps.match.params.token,
    login: state.managementState.auth,
    validToken: state.managementState.joinCohort.validToken
})


const mapDispatchToProps = {
    joinCohort
}


export default connect(mapStateToProps,mapDispatchToProps)(JoinCohortComponent)