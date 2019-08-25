import { IState } from "../../reducers";
import { connect } from "react-redux";
import { JoinCohortComponent } from "./join-cohort.component";
import { joinCohort, saveUserAssociate, findLoggedInUser, findCohortByToken } from '../../actions/join-cohort/join-cohort.actions'
import { IAuthState, ICreateUserState, IAddressState, IJoinCohortState } from "../../reducers/management";
import { ICognitoUser } from "../../model/cognito-user.model";
import { IAddress } from "../../model/address.model";
import { IUser } from "../../model/user.model";
import { updateNewUser, updateNewUserLocation, toggleLocationDropdown } from '../../actions/create-user/create-user.actions'
import { updateLocations } from '../../actions/address/address.actions';
import { History } from "history";


//This is experimental interfacing of a future design pattern for better type checking

export interface IJoinCohortStateToProps {
    token: string,
    login: IAuthState,
    joinCohortState: IJoinCohortState,
    createUser: ICreateUserState,
    addresses: IAddressState,
    history:History
}
export interface IJoinCohortDispatchToProps{
    joinCohort:(user:IUser, token:string, history:History) => void
    findCohortByToken: (token:string) => void
    updateNewUserLocation: (location: IAddress) => void,
    updateNewUser: (user: IUser) => void,
    updateLocations: () => void,
    toggleLocationDropdown: () => void,
    saveUserAssociate: (user:IUser) => void,
    findLoggedInUser: (user:ICognitoUser) => void,
}


const mapStateToProps = (state:IState, ownProps):IJoinCohortStateToProps => ({
    token: ownProps.match.params.token,
    login: state.managementState.auth,
    joinCohortState: state.managementState.joinCohort,
    createUser: state.managementState.createUser,
    addresses: state.managementState.addresses,
    history: ownProps.history
})


const mapDispatchToProps:IJoinCohortDispatchToProps = {
    joinCohort,
    updateNewUser,
    updateNewUserLocation,
    updateLocations,
    toggleLocationDropdown,
    saveUserAssociate,
    findLoggedInUser,
    findCohortByToken
}


export default connect(mapStateToProps,mapDispatchToProps)(JoinCohortComponent)