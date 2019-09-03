import { joinCohortTypes } from "../../actions/join-cohort/join-cohort.actions";
import { authTypes } from "../../actions/auth/auth.actions";
import { IJoinCohortState } from "./index";


const initialState: IJoinCohortState = {
    validToken: false,
    // tslint:disable-next-line: object-literal-sort-keys
    foundCohort:{
        cohortId:0,
        cohortName:'',
        // tslint:disable-next-line: object-literal-sort-keys
        cohortDescription:'',
        cohortToken:'',
        address:{
            addressId:0,
            street:'',
            // tslint:disable-next-line: object-literal-sort-keys
            alias:'',
            city:'',
            country:'',
            state:'',
            zip:''
        },
        startDate:'',
        endDate:'',
        users:[],
        trainer:{
            userId:0,
            // tslint:disable-next-line: object-literal-sort-keys
            email:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            trainingAddress:{
                addressId:0,
                street:'',
                // tslint:disable-next-line: object-literal-sort-keys
                alias:'',
                city:'',
                country:'',
                state:'',
                zip:''
            },
            personalAddress:{
                addressId:0,
                street:'',
                // tslint:disable-next-line: object-literal-sort-keys
                alias:'',
                city:'',
                country:'',
                state:'',
                zip:''
            },
            userStatus:{
                statusId:0,
                // tslint:disable-next-line: object-literal-sort-keys
                generalStatus:'',
                specificStatus:'',
                virtual:false
            },
            roles:[]
        }
    },
    userToJoin:{
        userId: 0,
        userStatus: {
          statusId: 2,
          // tslint:disable-next-line: object-literal-sort-keys
          generalStatus: 'Training',
          specificStatus: 'Training',
          virtual: false
        },
        // tslint:disable-next-line: object-literal-sort-keys
        roles: [],
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
        personalAddress: {
            addressId: 0,
            street: '',
            // tslint:disable-next-line: object-literal-sort-keys
            alias: '',
            city: '',
            country: '',
            state: '',
            zip: '',
          },
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '', 
    }
}


const joinCohortReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case joinCohortTypes.FIND_COHORT_BY_TOKEN:
            return {
                ...state,
                foundCohort:action.payload.foundCohort,
                validToken: true
            }
        case joinCohortTypes.FAILED_TO_FIND_COHORT_BY_TOKEN:
            return {
                ...state,
                foundCohort:action.payload.foundCohort,
                validToken: false
            }
        case joinCohortTypes.FAILED_TO_JOIN_COHORT:
            return {
                ...state,
            }
        // tslint:disable-next-line: no-duplicated-branches
        case joinCohortTypes.FAILED_TO_CREATE_NEW_USER_FOR_COHORT:
            return {
                ...state,
            }
        // tslint:disable-next-line: no-duplicated-branches
        case joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER:
            return {
                ...state,
            }
        // tslint:disable-next-line: no-duplicated-branches
        case joinCohortTypes.JOIN_COHORT:
            return {
                ...state,
            }
        case joinCohortTypes.CREATE_NEW_USER_FOR_COHORT:
            return {
                ...state,
                userToJoin: action.payload.newUser
            }
        // tslint:disable-next-line: no-duplicated-branches
        case joinCohortTypes.FIND_LOGGED_IN_USER:
            return {
                ...state,
                userToJoin: action.payload.newUser
            }

        case authTypes.LOGOUT:
            return initialState;
    }
    return state;
  }

  export default joinCohortReducer;