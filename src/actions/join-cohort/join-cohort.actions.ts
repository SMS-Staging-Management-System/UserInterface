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
    FAILED_TO_FIND_LOGGED_IN_USER: 'FAILED_TO_FIND_LOGGED_IN_USER',
    FAILED_TO_FIND_COHORT_BY_TOKEN: 'FAILED_TO_FIND_COHORT_BY_TOKEN',
    FIND_LOGGED_IN_USER: 'FIND_LOGGED_IN_USER',
    FIND_COHORT_BY_TOKEN: 'FIND_COHORT_BY_TOKEN',
    JOIN_COHORT: 'JOIN_COHORT'
}

export const findCohortByToken = (token:string, history:History) => async (dispatch) => {
    try {
    const response = await cohortClient.findByToken(token);  
    if (response.data) {
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
                history.push('/management/login');
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
            history.push('/management/login');
            toast.error('Cohort not found');
        }
    }

export const findLoggedInUser = (user:ICognitoUser, history:History) => async (dispatch) => {
    try {
        const response = await userClient.findOneByEmail(user.email);
        if (response.status === 200) {
            dispatch({
                payload: {
                    newUser: response.data
                },
                type: joinCohortTypes.FIND_LOGGED_IN_USER
              }) 
        }
        if(response.status === 404){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER
                  
            });
            history.push('/management/login');
            toast.error('User not found');
        }
    } catch(error) {
        dispatch({
            payload: {
              },
              type: joinCohortTypes.FAILED_TO_FIND_LOGGED_IN_USER
        })
        history.push('/management/login');
        toast.error('Failed to find user');
    }
}

export const joinCohort = (user:IUser, token:string, history:History) => async (dispatch) => {
    try {
        const response = await cohortClient.joinCohort(user, token);
        if (response.status === 200) {
            dispatch({
                payload: {
                    },
                    type: joinCohortTypes.JOIN_COHORT
            });
            history.push('/');
            toast.success('Joined Cohort');
        }
        if (response.status === 404) {
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.FAILED_TO_JOIN_COHORT
                  
            });
            history.push('/management/login');
            toast.error('Cohort not found');
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

export const saveUserAssociate = (newUser: IUser, token: string, history:History) => async (dispatch) => {
    try {
    const response = await userClient.saveUser(newUser);
      if (response) {
        dispatch({
            payload: {
                newUser: response.data
            },
            type: joinCohortTypes.CREATE_NEW_USER_FOR_COHORT
          })
    const userToJoin = response.data;
          toast.success('User Created');
    const joinResponse = await cohortClient.joinCohort(userToJoin, token);
      if (joinResponse.status === 200) {
                dispatch({
                    payload: {
                        },
                        type: joinCohortTypes.JOIN_COHORT
                });
                history.push('/');
                toast.success('Joined Cohort');
            }
      if (joinResponse.status === 404) {
                dispatch({
                    payload: {
                      },
                      type: joinCohortTypes.FAILED_TO_JOIN_COHORT
                      
                });
                history.push('/management/login');
                toast.error('Cohort not found');
        }         
      } else {
          history.push('/management/login');
          toast.error('Incorrect email address format');
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