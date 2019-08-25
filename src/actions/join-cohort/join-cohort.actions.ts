import { cohortClient } from "../../axios/sms-clients/cohort-client";
import { ICognitoUser } from "../../model/cognito-user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { IUser } from "../../model/user.model";
import { toast } from "react-toastify";
import { History } from "history";

export const joinCohortTypes = {
    FIND_COHORT_BY_TOKEN: 'FIND_COHORT_BY_TOKEN',
    FAILED_TO_FIND_COHORT_BY_TOKEN: 'FAILED_TO_FIND_COHORT_BY_TOKEN',
    JOIN_COHORT: 'JOIN_COHORT',
    FAILED_TO_JOIN_COHORT: 'FAILED_TO_JOIN_COHORT',
    CREATE_NEW_USER_FOR_COHORT: 'CREATE_NEW_USER_FOR_COHORT',
    FAILED_TO_CREATE_NEW_USER_FOR_COHORT: 'FAILED_TO_CREATE_NEW_USER_FOR_COHORT',
    FIND_LOGGED_IN_USER: 'FIND_LOGGED_IN_USER',
    FAILED_TO_FIND_LOGGED_IN_USER: 'FAILED_TO_FIND_LOGGED_IN_USER'
} 


export const findCohortByToken = (token:string) => async (dispatch) => {
    
    await cohortClient.findByToken(token)
    .then((response) => {
        if(response.data){
            dispatch({
                payload: {
                    foundCohort: response.data
                    },
                    type: joinCohortTypes.FIND_COHORT_BY_TOKEN
            })
        }
    })
     .catch((e)=> {
        dispatch({
            payload: {
                foundCohort:null
              },
              type: joinCohortTypes.FAILED_TO_FIND_COHORT_BY_TOKEN
        })
    });
}

export const findLoggedInUser = (user:ICognitoUser) => async (dispatch) => {
    try {
        const res = await userClient.findOneByEmail(user.email)
        if(res.data){
            dispatch({
                payload: {
                    newUser: res.data
                },
                type: joinCohortTypes.FIND_LOGGED_IN_USER
              }) 
        }
    } catch(e) {
        dispatch({
            payload: {
              },
              type: joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER
        })
    }
}

export const joinCohort = (user:IUser, token:string, history:History) => async (dispatch) => {
    await cohortClient.joinCohort(user, token)
    .then((response) => {
        if(response.status === 200){
            dispatch({
                payload: {
                    },
                    type: joinCohortTypes.JOIN_COHORT
                    
            })
            history.push('/dashboard');
            toast.success('Joined Cohort'); 
        }
    })
    .catch((e)=> {
    dispatch({
        payload: {
            },
            type: joinCohortTypes.FAILED_TO_JOIN_COHORT
    })
    toast.error('Failed to Join Cohort')
    });
}

export const saveUserAssociate = (newUser: IUser) => async (dispatch) => {
      await userClient.saveUser(newUser)
      .then(async resp => {
        toast.success('User Created')
        dispatch({
            payload: {
                newUser: resp.data
            },
            type: joinCohortTypes.CREATE_NEW_USER_FOR_COHORT
          })
      })
      .catch(e => {
        toast.error('Failed To Save User')
        dispatch({
            payload: {
            },
            type: joinCohortTypes.FAILED_TO_CREATE_NEW_USER_FOR_COHORT
          })
      })
   
  }