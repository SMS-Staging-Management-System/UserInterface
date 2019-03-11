import { joinCohortTypes } from "../../actions/join-cohort/join-cohort.actions";
import { authTypes } from "../../actions/auth/auth.actions";
import { IJoinCohortState } from ".";


const initialState: IJoinCohortState = {
    validToken: false
}


export const joinCohortReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case joinCohortTypes.FAILED_TO_FIND_COHORT_BY_TOKEN:
            return {
                ...state,
            }
        case joinCohortTypes.FIND_BY_COHORT_TOKEN:
            return {
                ...state,
                validToken: action.payload.validToken
            }
        case authTypes.LOGOUT:
            return initialState;
    }
    return state;
  }