import { IState } from "../../reducers";
import { connect } from "react-redux";
import { JoinCohortComponent } from "./join-cohort.component";


const mapStateToProps = (state:IState, ownProps) => ({
    urlParam: ownProps.match.params,
    login: state.managementState.auth
})


const mapDispatchToProps = {

}


export default connect(mapStateToProps,mapDispatchToProps)(JoinCohortComponent)