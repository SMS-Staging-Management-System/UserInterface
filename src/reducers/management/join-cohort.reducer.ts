import { joinCohortTypes } from "../../actions/join-cohort/join-cohort.actions";
import { authTypes } from "../../actions/auth/auth.actions";
import { IJoinCohortState } from ".";


const initialState: IJoinCohortState = {
    validToken: true
}


export const joinCohortReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case joinCohortTypes.FAILED_TO_JOIN_COHORT:
            return {
                ...state,
            }
        case joinCohortTypes.JOIN_COHORT:
            return {
                ...state,
            }
        case authTypes.LOGOUT:
            return initialState;
    }
    return state;
  }