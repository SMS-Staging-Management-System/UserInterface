import { ICreateUserState } from '.';
import { authTypes } from '../../actions/auth/auth.actions';
import { createUserTypes } from '../../actions/create-user/create-user.actions';

const initialState: ICreateUserState = {
  enabled: false,
  locationDropdownActive: false,
<<<<<<< HEAD
  roleDropdownActive: false,
  cohortDropdownActive: false,
  newUser: {
=======
  newUser: {
    userId: 0,
    userStatus: {
      statusId: 2,
      generalStatus: 'Training',
      specificStatus: 'Training',
      virtual: false
    },
    roles: [],
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    trainingAddress: {
      addressId: 0,
      street: '',
      alias: '',
      city: '',
      country: '',
      state: '',
      zip: ''
    },
<<<<<<< HEAD
    role: '',
    dropdownRole: '',
    cohort: {
      cohortId: 0,
      cohortName: '',
      cohortDescription: '',
      cohortToken: '',
      address: {
        addressId: 0,
        street: '',
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
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        personalAddress: {
          addressId: 0,
          street: '',
          alias: '',
          city: '',
          state: '',
          country: '',
          zip: ''
        },
        trainingAddress: {
          addressId: 0,
          street: '',
          alias: '',
          city: '',
          state: '',
          country: '',
          zip: ''
        },
        userStatus: {
          statusId: 0,
          generalStatus: '',
          specificStatus: '',
          virtual: false
        },
        roles: [],
      },
=======
    personalAddress: {
      addressId: 0,
      street: '',
      alias: '',
      city: '',
      country: '',
      state: '',
      zip: '',
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
<<<<<<< HEAD
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
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
    case createUserTypes.UPDATE_NEW_USER_LOCATION:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          trainingAddress: action.payload.location
        }
      }
<<<<<<< HEAD
    case createUserTypes.UPDATE_NEW_USER_ROLE:
      return {
        ...state,
        newUser: {
          ...state.newUser,
          role: action.payload.role,
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
=======
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
