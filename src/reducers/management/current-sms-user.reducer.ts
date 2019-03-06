import { ICurrentSMSUserState } from ".";


const initialState: ICurrentSMSUserState = {
    currentSMSUser: {
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
        },
        roles: []
    }
}

export const currentSMSUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
      
    }
    return state;
  }