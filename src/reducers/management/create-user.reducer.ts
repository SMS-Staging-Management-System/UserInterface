import { ICreateUserState } from './index';
import { authTypes } from '../../actions/auth/auth.actions';
import { createUserTypes } from '../../actions/create-user/create-user.actions';

const initialState: ICreateUserState = {
  enabled: false,
  locationDropdownActive: false,
  roleDropdownActive: false,
  // tslint:disable-next-line: object-literal-sort-keys
  cohortDropdownActive: false,
  newUser: {
    trainingAddress: {
      addressId: 0,
      street: '',
      // tslint:disable-next-line: object-literal-sort-keys
      alias: '',
      city: '',
      country: '',
      state: '',
      zip: ''
    },
    // tslint:disable-next-line: object-literal-sort-keys
    role: '',
    dropdownRole: '',
    cohort: {
      cohortId: 0,
      cohortName: '',
      // tslint:disable-next-line: object-literal-sort-keys
      cohortDescription: '',
      cohortToken: '',
      address: {
        addressId: 0,
        street: '',
        // tslint:disable-next-line: object-literal-sort-keys
        alias: '',
        city: '',
        country: '',
        state: '',
        zip: ''
      },
      startDate: '',
      endDate: '',
      users: [],
      trainer: {
        userId: 0,
        // tslint:disable-next-line: object-literal-sort-keys
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        personalAddress: {
          addressId: 0,
          street: '',
          // tslint:disable-next-line: object-literal-sort-keys
          alias: '',
          city: '',
          state: '',
          country: '',
          zip: ''
        },
        trainingAddress: {
          addressId: 0,
          street: '',
          // tslint:disable-next-line: object-literal-sort-keys
          alias: '',
          city: '',
          state: '',
          country: '',
          zip: ''
        },
        userStatus: {
          statusId: 0,
          // tslint:disable-next-line: object-literal-sort-keys
          generalStatus: '',
          specificStatus: '',
          virtual: false
        },
        roles: [],
      },
    },
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  },
}

export const createUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case createUserTypes.TOGGLE:
      return {
        ...state,
        enabled: !state.enabled
      }
    case createUserTypes.TOGGLE_LOCATION_DROPDOWN:
      return {
        ...state,
        locationDropdownActive: !state.locationDropdownActive
      }
    case createUserTypes.TOGGLE_ROLE_DROPDOWN:
      return {
        ...state,
        roleDropdownActive: !state.roleDropdownActive
      }
    case createUserTypes.TOGGLE_COHORT_DROPDOWN:
      return {
        ...state,
        cohortDropdownActive: !state.cohortDropdownActive
      }
    case createUserTypes.UPDATE_NEW_USER_LOCATION:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          trainingAddress: action.payload.location
        }
      }
    case createUserTypes.UPDATE_NEW_USER_ROLE:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          role: action.payload.role,
          // tslint:disable-next-line: object-literal-sort-keys
          dropdownRole: action.payload.dropdownRole
        }
      }
    case createUserTypes.UPDATE_NEW_USER_COHORT:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          cohort: action.payload.cohort,
        }
      }
    case createUserTypes.UPDATE_NEW_USER:
      return {
        ...state,
        newUser: action.payload.newUser
      }
    case createUserTypes.USER_SAVED:
      return initialState;

    case authTypes.LOGOUT:
      return initialState;
  }
  return state;
}
