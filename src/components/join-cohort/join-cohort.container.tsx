import { IState } from "../../reducers";
import { connect } from "react-redux";
import { JoinCohortComponent } from "./join-cohort.component";


const mapStateToProps = (state:IState) => {

}


const mapDispatchToProps = {

}


export default connect(mapStateToProps,mapDispatchToProps)(JoinCohortComponent)