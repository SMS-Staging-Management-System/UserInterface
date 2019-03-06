import { ICreateCohortState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';
import { createCohortTypes } from '../../actions/create-cohort/create-cohort.actions';

const initialState: ICreateCohortState = {
  enabled: false,
  locationDropdownActive: false,
  trainerDropdownActive: false,
  isSaved: false,
  newCohort: {
    cohortToken: '',
    address: {
      addressId: 0,
      alias: '',
      city: '',
      country: '',
      state: '',
      zip: ''
    },
    cohortDescription: '',
    cohortName: '',
    endDate: '2019-03-21',
    startDate: '2019-01-10',
    cohortId: 0,
 trainer: {
      address: {
        addressId: 0,
        alias: '',
        city: '',
        country: '',
        state: '',
        zip: '',
      },
      email: '',
      firstName: '',
      lastName: '',
      mobile: '',
      userId: 0,
      roles: []
    }
  },
}

export const createCohortReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case createCohortTypes.TOGGLE:
      return {
        ...state,
        enabled: !state.enabled,
        isSaved: false,
        newCohort: {
          ...state.newCohort,
          cohortToken: ''
        }
      }
    case createCohortTypes.TOGGLE_LOCATION_DROPDOWN:
      return {
        ...state,
        locationDropdownActive: !state.locationDropdownActive
      }
    case createCohortTypes.TOGGLE_TRAINER_DROPDOWN:
      return {
        ...state,
        trainerDropdownActive: !state.trainerDropdownActive
      }
    case createCohortTypes.UPDATE_NEW_COHORT_TRAINER:
      return {
        ...state,
        isSaved: false,
        newCohort: {
          ...state.newCohort,
          trainer: action.payload.trainer,
          cohortToken: ''
        }
      }
    case createCohortTypes.UPDATE_NEW_COHORT_LOCATION:
      return {
        ...state,
        isSaved: false,
        newCohort: {
          ...state.newCohort,
          address: action.payload.location,
          cohortToken: ''
        }
      }
    case createCohortTypes.UPDATE_NEW_COHORT:
      return {
        ...state,
        newCohort: action.payload.newUser,
        isSaved: false
      }
    case createCohortTypes.COHORT_SAVED:
      return {
        ...state,
        enabled:true,
        isSaved: true,
        newCohort: {
          ...state.newCohort,
          cohortToken: state.newCohort.cohortToken
        }
      };
    case authTypes.LOGOUT:
      return initialState;
  }
  return state;
}
