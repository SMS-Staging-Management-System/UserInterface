import { ICurrentUserState } from ".";


const initialState: ICurrentUserState = {
    currentUser: {
        userId: 0,
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: {
            addressId: 0,
            alias: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        }
    }
}

export const currentUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
      
    }
    return state;
  }