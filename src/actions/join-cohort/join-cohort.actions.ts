import { cohortClient } from "../../axios/sms-clients/cohort-client";
import { ICognitoUser } from "../../model/cognito-user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { IUser } from "../../model/user.model";
import { toast } from "react-toastify";
import { History } from "history";

export const joinCohortTypes = {
    CREATE_NEW_USER_FOR_COHORT: 'CREATE_NEW_USER_FOR_COHORT',
    FAILED_TO_CREATE_NEW_USER_FOR_COHORT: 'FAILED_TO_CREATE_NEW_USER_FOR_COHORT',
    FAILED_TO_JOIN_COHORT: 'FAILED_TO_JOIN_COHORT',
    // tslint:disable-next-line: object-literal-sort-keys
    FAILED_TO_FIND_LOGGED_IN_USER: 'FAILED_TO_FIND_LOGGED_IN_USER',
    FAILED_TO_FIND_COHORT_BY_TOKEN: 'FAILED_TO_FIND_COHORT_BY_TOKEN',
    FIND_LOGGED_IN_USER: 'FIND_LOGGED_IN_USER',
    FIND_COHORT_BY_TOKEN: 'FIND_COHORT_BY_TOKEN',
    JOIN_COHORT: 'JOIN_COHORT'
} 


export const findCohortByToken = (token:string, history:History) => async (dispatch) => {
    try {
    const response = await cohortClient.findByToken(token);  
    if(response.data){
            dispatch({
                payload: {
                    foundCohort: response.data
                    },
                type: joinCohortTypes.FIND_COHORT_BY_TOKEN
            })
        } else {
            dispatch({
                payload: {
                    foundCohort: null
                  },
                type: joinCohortTypes.FAILED_TO_FIND_COHORT_BY_TOKEN
                });
                // tslint:disable-next-line: no-duplicate-string
                history.push('/management/login');
                // tslint:disable-next-line: no-duplicate-string
                toast.error('Cohort not found');
        }
    }
    catch(error) {
        dispatch({
            payload: {
                foundCohort: null
              },
              type: joinCohortTypes.FAILED_TO_FIND_COHORT_BY_TOKEN
            })
            // tslint:disable-next-line: no-duplicate-string
            history.push('/management/login');
            // tslint:disable-next-line: no-duplicate-string
            toast.error('Cohort not found');
        }
    }

export const findLoggedInUser = (user:ICognitoUser, history:History) => async (dispatch) => {
    try {
        const res = await userClient.findOneByEmail(user.email);
        if (res.status === 200) {
            dispatch({
                payload: {
                    newUser: res.data
                },
                type: joinCohortTypes.FIND_LOGGED_IN_USER
              }) 
        }
        if(res.status === 404){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER
                  
            });
            history.push('/management/login');
            toast.error('User not found');
        }
        if(res.status === 400){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER
                  
            });
            history.push('/management/login');
            // tslint:disable-next-line: no-duplicate-string
            toast.error('Failed to find user');
        }
        if(res.status === 405){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER
                  
            });
            history.push('/management/login');
            toast.error('Failed to find user');
        }
    } catch(error) {
        dispatch({
            payload: {
              },
              type: joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER
        })
        // tslint:disable-next-line: no-duplicate-string
        history.push('/management/login');
        // tslint:disable-next-line: no-duplicate-string
        toast.error('Failed to find user');
    }
}

export const joinCohort = (user:IUser, token:string, history:History) => async (dispatch) => {
    try {
        const join = await cohortClient.joinCohort(user, token);
        if(join.status === 200){
            dispatch({
                payload: {
                    },
                    type: joinCohortTypes.JOIN_COHORT
            });
            history.push('/');
            toast.success('Joined Cohort');
        }
        if(join.status === 404){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_JOIN_COHORT
                  
            });
            history.push('/management/login');
            toast.error('Cohort not found');
        }
        if(join.status === 400){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_JOIN_COHORT
                  
            });
            history.push('/management/login');
            // tslint:disable-next-line: no-duplicate-string
            toast.error('Failed to Join Cohort');
        }
        if(join.status === 405){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_JOIN_COHORT
                  
            });
            history.push('/management/login');
            toast.error('Failed to Join Cohort');
        }
    } catch (error) {
        dispatch({
            payload: {
              },
              type: joinCohortTypes.FAILED_TO_JOIN_COHORT
        });
        history.push('/management/login');
        toast.error('Failed to Join Cohort');
    }
}

export const saveUserAssociate = (newUser: IUser, history:History) => async (dispatch) => {
    try {
    const resp = await userClient.saveUser(newUser);
      if (resp) {
        dispatch({
            payload: {
                newUser: resp.data
            },
            type: joinCohortTypes.CREATE_NEW_USER_FOR_COHORT
          })
          toast.success('User Created');
      } else {
          history.push('/management/login');
          toast.error('Failed To Save User');
        }    
    } catch(error){
        dispatch({
            payload: {
            },
            type: joinCohortTypes.FAILED_TO_CREATE_NEW_USER_FOR_COHORT
          })
          history.push('/management/login');
          toast.error('Failed To Save User');
      }
  }