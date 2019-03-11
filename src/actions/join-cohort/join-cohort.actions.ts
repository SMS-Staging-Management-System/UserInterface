import { cohortClient } from "../../axios/sms-clients/cohort-client";

export const joinCohortTypes = {
    FIND_BY_COHORT_TOKEN: 'JOIN_FIND_BY_COHORT_TOKEN',
    FAILED_TO_FIND_COHORT_BY_TOKEN: 'FAILED_TO_FIND_COHORT_BY_TOKEN',
} 


export const findByCohortToken = (token:string) => async (dispatch) => {
    try {
        const res = await cohortClient.findByToken(token);
        if(res.data){
            dispatch({
                payload: {
                    validToken: true
                  },
                  type: joinCohortTypes.FIND_BY_COHORT_TOKEN
            })

        }
    } catch (e) {
        dispatch({
            payload: {
              },
              type: joinCohortTypes.FAILED_TO_FIND_COHORT_BY_TOKEN
        })
    }
}