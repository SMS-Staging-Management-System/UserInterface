import { ICreateCohortState } from '.';
import { authTypes } from '../actions/auth/auth.actions';
import { createCohortTypes } from '../actions/create-cohort/create-cohort.actions';

const initialState: ICreateCohortState = {
  enabled: false,
  locationDropdownActive: false,
  newCohort: {
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
    trainer: {
      address: {
        addressId: 0,
        alias: '',
        city: '',
        country: '',
        state: '',
        zip: ''
      },
      email: '',
      firstName: '',
      lastName: '',
      mobile: '',
      userId: 0
    }
  },
}

export const createCohortReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case createCohortTypes.TOGGLE:
      return {
        ...state,
        enabled: !state.enabled
      }
    case createCohortTypes.TOGGLE_LOCATION_DROPDOWN:
      return {
        ...state,
        locationDropdownActive: !state.locationDropdownActive
      }
    case createCohortTypes.UPDATE_NEW_COHORT_LOCATION:
      return {
        ...state,
        newCohort: {
          ...state.newCohort,
          address: action.payload.location
        }
      }
    case createCohortTypes.UPDATE_NEW_COHORT:
      return {
        ...state,
        newCohort: action.payload.newUser
      }
    case createCohortTypes.COHORT_SAVED:
      return initialState;
    case authTypes.LOGOUT:
      return initialState;
  }
  return state;
}
