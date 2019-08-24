import { IViewUserState } from '.';
import { viewUserTypes } from '../../actions/view-user/view-user.actions';

const initialState: IViewUserState = {
  enabled: false,
    newUser:{
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
      roles: []
  }
}

export const viewUserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case viewUserTypes.TOGGLE:
      return {
        ...state,
        enabled: !state.enabled
      }
    case viewUserTypes.VIEW_USER:
      return {
        ...state,
        newUser: action.payload.newUser
      }

    case viewUserTypes.GET_USER_INFO:
       return {
         ...state,
         newUser: action.payload.newUser
       }
  }
  return state;
}
