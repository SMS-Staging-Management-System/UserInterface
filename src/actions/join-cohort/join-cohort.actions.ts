import { cohortClient } from "../../axios/sms-clients/cohort-client";
import { ICognitoUser } from "../../model/cognito-user.model";
import { userClient } from "../../axios/sms-clients/user-client";
import { IUser } from "../../model/user.model";

export const joinCohortTypes = {
    FIND_BY_COHORT_TOKEN: 'JOIN_FIND_BY_COHORT_TOKEN',
    FAILED_TO_FIND_COHORT_BY_TOKEN: 'FAILED_TO_FIND_COHORT_BY_TOKEN',
    JOIN_COHORT: 'JOIN_COHORT',
    FAILED_TO_JOIN_COHORT: 'FAILED_TO_JOIN_COHORT',
} 


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


export const joinCohort = (user:ICognitoUser, token:string) => async (dispatch) => {
    try {
        const res1 = await userClient.findOneByEmail(user.email)
        const usersms:IUser = res1.data
        const res2 = await cohortClient.joinCohort(usersms, token);
        if(res2.status === 200){
            dispatch({
                payload: {
                  },
                  type: joinCohortTypes.JOIN_COHORT
            })

        }
    } catch (e) {
        dispatch({
            payload: {
              },
              type: joinCohortTypes.FAILED_TO_JOIN_COHORT
        })
    }
}