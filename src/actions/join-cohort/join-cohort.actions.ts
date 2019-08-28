import { cohortClient } from "../../axios/sms-clients/cohort-client";
import { ICognitoUser } from "../../model/cognito-user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { IUser } from "../../model/user.model";
import { toast } from "react-toastify";
import { History } from "history";

export const joinCohortTypes = {
    FIND_BY_COHORT_TOKEN: 'JOIN_FIND_BY_COHORT_TOKEN',
    FAILED_TO_FIND_COHORT_BY_TOKEN: 'FAILED_TO_FIND_COHORT_BY_TOKEN',
    JOIN_COHORT: 'JOIN_COHORT',
    FAILED_TO_JOIN_COHORT: 'FAILED_TO_JOIN_COHORT',
    CREATE_NEW_USER_FOR_COHORT: 'CREATE_NEW_USER_FOR_COHORT',
    FAILED_TO_CREATE_NEW_USER_FOR_COHORT: 'FAILED_TO_CREATE_NEW_USER_FOR_COHORT',
    FIND_LOGGED_IN_USER: 'FIND_LOGGED_IN_USER',
    FAILED_TO_FIND_LOGGED_IN_USER: 'FAILED_TO_FIND_LOGGED_IN_USER'
} 

<<<<<<< HEAD
=======

// export const findByCohortToken = (token:string) => async (dispatch) => {
//     try {
//         const res = await cohortClient.findByToken(token);
//         if(res.data){
//             dispatch({
//                 payload: {
//                     validToken: true
//                   },
//                   type: joinCohortTypes.FIND_BY_COHORT_TOKEN
//             })

//         }
//     } catch (e) {
//         dispatch({
//             payload: {
//               },
//               type: joinCohortTypes.FAILED_TO_FIND_COHORT_BY_TOKEN
//         })
//     }
// }
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
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
    try {
        
<<<<<<< HEAD
        const join = await cohortClient.joinCohort(user, token);
        if(join.status === 200){
=======
        const res = await cohortClient.joinCohort(user, token);
        if(res.status === 200){
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.JOIN_COHORT
                  
            })
            history.push('/management/login');
            toast.success('Joined Cohort')
        }
    } catch (e) {
        dispatch({
            payload: {
              },
              type: joinCohortTypes.FAILED_TO_JOIN_COHORT
        })
        toast.error('Failed to Join Cohort')
    }
}

export const saveUserAssociate = (newUser: IUser) => async (dispatch) => {
<<<<<<< HEAD
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
=======
        
    try{
        let res = await userClient.saveUser(newUser)
      
        toast.success('User Created')
        dispatch({
          payload: {
              newUser: res.data
          },
          type: joinCohortTypes.CREATE_NEW_USER_FOR_COHORT
        })
    }catch (e) {

>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
        toast.error('Failed To Save User')
        dispatch({
            payload: {
            },
            type: joinCohortTypes.FAILED_TO_CREATE_NEW_USER_FOR_COHORT
          })
<<<<<<< HEAD
      })
=======
      }
  
>>>>>>> a79a8b5ccb0eb6399b03c54354142fe83ede5f71
   
  }